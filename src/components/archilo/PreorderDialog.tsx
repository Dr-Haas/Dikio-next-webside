'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface PreorderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PreorderDialog = ({ open, onOpenChange }: PreorderDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    cabinetName: '',
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Insert into lead_ideas table
      const { error } = await supabase
        .from('lead_ideas')
        .insert({
          project_title: `Précommande Archilo - ${formData.cabinetName}`,
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company: formData.cabinetName,
          description: formData.message,
          source: 'archilo-preorder',
          status: 'new',
          labels: ['archilo', 'preorder']
        });

      if (error) throw error;

      // Send notification email
      await supabase.functions.invoke('send-notification', {
        body: {
          type: 'archilo-preorder',
          data: {
            cabinetName: formData.cabinetName,
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            message: formData.message
          }
        }
      });

      setIsSuccess(true);
      toast({
        title: "Précommande enregistrée !",
        description: "Nous vous contacterons sous 24h pour finaliser votre commande.",
      });
    } catch (error) {
      console.error('Error submitting preorder:', error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset form after closing
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({
        cabinetName: '',
        fullName: '',
        email: '',
        phone: '',
        message: ''
      });
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-slate-900 border-slate-700 text-white">
        {isSuccess ? (
          <div className="py-8 text-center">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-8 w-8 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Précommande confirmée !</h3>
            <p className="text-slate-400 mb-6">
              Merci pour votre confiance. Notre équipe vous contactera sous 24h pour finaliser les détails de votre installation.
            </p>
            <Button onClick={handleClose} className="bg-blue-600 hover:bg-blue-700">
              Fermer
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">Précommander votre Box Archilo</DialogTitle>
              <DialogDescription className="text-slate-400">
                Remplissez ce formulaire et nous vous contacterons sous 24h.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="cabinetName" className="text-slate-300">Nom du cabinet</Label>
                <Input
                  id="cabinetName"
                  name="cabinetName"
                  value={formData.cabinetName}
                  onChange={handleChange}
                  placeholder="Cabinet Dupont & Associés"
                  required
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-slate-300">Votre nom complet</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Jean Dupont"
                  required
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-300">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jean@cabinet.fr"
                    required
                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-slate-300">Téléphone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="06 12 34 56 78"
                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-slate-300">Message (optionnel)</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Précisez vos besoins ou questions..."
                  rows={3}
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 resize-none"
                />
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-6"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  "Confirmer la précommande"
                )}
              </Button>

              <p className="text-xs text-slate-500 text-center">
                Aucun paiement requis. Nous vous contacterons pour finaliser votre commande.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PreorderDialog;
