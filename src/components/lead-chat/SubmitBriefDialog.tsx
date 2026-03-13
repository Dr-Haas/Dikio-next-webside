import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, CheckCircle2, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SubmitBriefDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  brief: any;
  conversationHistory: { role: string; content: string }[];
}

const SubmitBriefDialog = ({ open, onOpenChange, brief, conversationHistory }: SubmitBriefDialogProps) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    contactPreference: 'email',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.fullName) {
      toast.error('Veuillez renseigner votre nom et email');
      return;
    }

    setIsSubmitting(true);

    try {
      const submission = {
        // Contact info
        email: formData.email,
        full_name: formData.fullName,
        company: formData.company || null,
        phone: formData.phone || null,
        contact_preference: formData.contactPreference,
        
        // Brief data
        project_title: brief?.project_title || 'Nouveau projet',
        description: brief?.description || null,
        problem_solved: brief?.problem_solved || null,
        target_audience: brief?.target_audience || null,
        features: brief?.features || [],
        timeline: brief?.timeline || null,
        labels: brief?.labels || [],
        complexity: brief?.complexity || null,
        benchmark_suggestions: brief?.benchmark_suggestions || [],
        budget_indication: brief?.budget_indication || null,
        deadline: brief?.deadline || null,
        notes: brief?.notes || null,
        
        // Conversation
        conversation_history: conversationHistory,
        
        // Metadata
        source: 'chatbot',
        status: 'new',
      };

      const { error } = await supabase.from('lead_ideas' as any).insert([submission]);

      if (error) throw error;

      setIsSuccess(true);
      toast.success('Brief soumis avec succès !');
      
      // Redirect after 2 seconds
      setTimeout(() => {
        onOpenChange(false);
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Submit error:', error);
      toast.error('Erreur lors de la soumission. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Brief envoyé ! 🎉</h3>
            <p className="text-muted-foreground">
              Notre équipe vous contactera sous 48h pour discuter de votre projet.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="w-5 h-5 text-primary" />
            Soumettre votre brief
          </DialogTitle>
          <DialogDescription>
            Plus qu'une étape ! Renseignez vos coordonnées pour recevoir notre proposition.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Nom complet *</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
              placeholder="Jean Dupont"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Entreprise (optionnel)</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
              placeholder="Dikio Studio"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="jean@exemple.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone (optionnel)</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="+33 6 12 34 56 78"
            />
          </div>

          <div className="space-y-2">
            <Label>Préférence de contact</Label>
            <RadioGroup
              value={formData.contactPreference}
              onValueChange={(value) => setFormData(prev => ({ ...prev, contactPreference: value }))}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="email" id="pref-email" />
                <Label htmlFor="pref-email" className="font-normal">Email</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="phone" id="pref-phone" />
                <Label htmlFor="pref-phone" className="font-normal">Téléphone</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="visio" id="pref-visio" />
                <Label htmlFor="pref-visio" className="font-normal">Visio</Label>
              </div>
            </RadioGroup>
          </div>

          {brief && (
            <div className="bg-muted rounded-lg p-3 text-sm">
              <p className="font-medium text-foreground">{brief.project_title}</p>
              {brief.complexity && (
                <p className="text-muted-foreground text-xs mt-1">
                  Complexité : {brief.complexity === 'simple' ? 'Simple' : brief.complexity === 'moderate' ? 'Modéré' : 'Complexe'}
                </p>
              )}
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Envoyer mon brief
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SubmitBriefDialog;
