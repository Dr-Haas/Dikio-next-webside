'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ArrowRight, Loader2 } from 'lucide-react';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SecurityGateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVerified: (data: { fullName: string; email: string; phone?: string }) => void;
}

const emailSchema = z.string().trim().email();

const SecurityGateDialog = ({ open, onOpenChange, onVerified }: SecurityGateDialogProps) => {
  const { t } = useTranslation();
  const [step, setStep] = useState<1 | 2>(1);
  const [formLoadTime, setFormLoadTime] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    website: '', // Honeypot field
  });
  
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    general?: string;
  }>({});

  // Reset state when dialog opens
  useEffect(() => {
    if (open) {
      setStep(1);
      setFormData({ fullName: '', email: '', phone: '', website: '' });
      setErrors({});
    }
  }, [open]);

  // Record form load time when moving to step 2
  useEffect(() => {
    if (step === 2) {
      setFormLoadTime(Date.now());
    }
  }, [step]);

  const handleContinue = () => {
    setStep(2);
  };

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = t('securityGate.errors.nameRequired');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('securityGate.errors.emailRequired');
    } else {
      try {
        emailSchema.parse(formData.email);
      } catch {
        newErrors.email = t('securityGate.errors.emailInvalid');
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Anti-bot: Check honeypot - silently ignore, don't block real users
    // Some password managers may fill hidden fields, so we just log it
    if (formData.website) {
      console.warn('Honeypot field filled - possible bot or password manager');
      // Don't block, just proceed - real bots will be caught by rate limiting
    }
    
    // Anti-bot: Check timing (must be at least 1.5 seconds) - reduced for better UX
    const timeSinceLoad = Date.now() - formLoadTime;
    if (formLoadTime > 0 && timeSinceLoad < 1500) {
      setErrors({ general: t('securityGate.errors.tooFast') });
      return;
    }

    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate a small delay for UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    onVerified({
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim() || undefined,
    });
    
    setIsSubmitting(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <DialogHeader className="text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <DialogTitle className="text-xl">
                  {t('securityGate.step1.title')}
                </DialogTitle>
                <DialogDescription className="text-base mt-2">
                  {t('securityGate.step1.description')}
                </DialogDescription>
              </DialogHeader>
              
              <p className="text-sm text-muted-foreground text-center mt-4 mb-6">
                {t('securityGate.step1.reassurance')}
              </p>
              
              <Button onClick={handleContinue} className="w-full" size="lg">
                {t('securityGate.step1.button')}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <DialogHeader>
                <DialogTitle>{t('securityGate.step2.title')}</DialogTitle>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                {/* Honeypot field - invisible to humans */}
                <div className="absolute -left-[9999px] opacity-0 pointer-events-none" aria-hidden="true">
                  <Input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullName">{t('securityGate.step2.fullName')} *</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder={t('securityGate.step2.fullNamePlaceholder')}
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={errors.fullName ? 'border-destructive' : ''}
                    disabled={isSubmitting}
                    maxLength={100}
                  />
                  {errors.fullName && (
                    <p className="text-sm text-destructive">{errors.fullName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t('securityGate.step2.email')} *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('securityGate.step2.emailPlaceholder')}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={errors.email ? 'border-destructive' : ''}
                    disabled={isSubmitting}
                    maxLength={255}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">{t('securityGate.step2.phone')}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder={t('securityGate.step2.phonePlaceholder')}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={isSubmitting}
                    maxLength={20}
                  />
                </div>

                {errors.general && (
                  <p className="text-sm text-destructive text-center">{errors.general}</p>
                )}

                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                      {t('securityGate.step2.loading')}
                    </>
                  ) : (
                    t('securityGate.step2.button')
                  )}
                </Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default SecurityGateDialog;
