'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Phone, Mail, MapPin, Eye } from 'lucide-react';
import { supabaseUntyped } from '@/lib/supabaseClient';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [revealPhone, setRevealPhone] = useState(false);
  const [revealEmail, setRevealEmail] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: t('contact.error.title'),
        description: t('contact.error.validation'),
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabaseUntyped
        .from('contacts')
        .insert([
          { name: formData.name, email: formData.email, message: formData.message }
        ]);
        
      if (error) {
        console.error("Erreur lors de l'enregistrement du message:", error);
        throw error;
      }
      
      toast({
        title: t('contact.success.title'),
        description: t('contact.success.description')
      });

      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      console.error("Erreur:", error);
      toast({
        title: t('contact.error.title'),
        description: t('contact.error.submit'),
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 data-gsap="text-reveal" className="text-3xl md:text-4xl font-bold mb-4">{t('contact.title')}</h2>
          <p data-gsap="fade-up" className="text-lg text-gray-500">
            {t('contact.description')}
          </p>
        </div>
        
        <div className="grid gap-10 lg:grid-cols-2">
          <div data-gsap="fade-left" className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold mb-6">{t('contact.formTitle')}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input 
                  name="name" 
                  placeholder={t('contact.namePlaceholder')} 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  className="focus-within:ring-dikio-accent" 
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <Input 
                  name="email" 
                  type="email" 
                  placeholder={t('contact.emailPlaceholder')} 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  className="focus-within:ring-dikio-accent"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <Textarea 
                  name="message" 
                  placeholder={t('contact.messagePlaceholder')} 
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                  className="h-32 focus-within:ring-dikio-accent"
                  disabled={isSubmitting}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-dikio-accent hover:bg-dikio-accent-light"
                disabled={isSubmitting}
              >
                {isSubmitting ? t('contact.submitting') : t('contact.submit')}
              </Button>
            </form>
          </div>
          
          <div data-gsap="fade-right" className="space-y-8 lg:pl-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">{t('contact.findUs')}</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-dikio-accent mt-1 mr-3" />
                  <div>
                    <p className="font-medium">{t('contact.phone')}</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-2 bg-white border-gray-200 hover:bg-gray-50"
                      onClick={() => setRevealPhone(true)}
                    >
                      <span className={`${revealPhone ? "" : "blur-sm select-none"}`}>+33 6 99 00 87 02</span>
                      <Eye className="h-4 w-4 text-gray-500" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-dikio-accent mt-1 mr-3" />
                  <div>
                    <p className="font-medium">{t('contact.email')}</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-2 bg-white border-gray-200 hover:bg-gray-50"
                      onClick={() => setRevealEmail(true)}
                    >
                      <span className={`${revealEmail ? "" : "blur-sm select-none"}`}>gary.h@dikio.fr</span>
                      <Eye className="h-4 w-4 text-gray-500" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-dikio-accent mt-1 mr-3" />
                  <div>
                    <p className="font-medium">{t('contact.address')}</p>
                    <p className="text-gray-600">
                      6 Rue de Saint-Pétersbourg<br />
                      75008 Paris, France
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
