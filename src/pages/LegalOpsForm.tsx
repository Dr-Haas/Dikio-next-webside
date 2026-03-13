import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import {
  Sparkles, Building2, Users, AlertTriangle, ListOrdered,
  Clock, User, ArrowLeft, ArrowRight, Check, Shield,
  ChevronRight, Scale, FileText, FolderSearch, Lock,
  Landmark, Briefcase, HelpCircle, Radio, Workflow,
  Database, BookOpen, Cpu, Globe, UserCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import SEO from '@/components/SEO';

// ─── Types ───────────────────────────────────────────────────────
interface FormData {
  cabinetType: string;
  size: string;
  challenges: string[];
  priorities: string[];
  timeline: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cabinetName: string;
  role: string;
  message: string;
}

// ─── Step definitions ────────────────────────────────────────────
const stepsMeta = [
  { icon: Landmark, label: 'Cabinet' },
  { icon: Users, label: 'Taille' },
  { icon: AlertTriangle, label: 'Défis' },
  { icon: ListOrdered, label: 'Priorités' },
  { icon: Clock, label: 'Timeline' },
  { icon: User, label: 'Contact' },
];

const cabinetTypes = [
  { id: 'generaliste', label: 'Cabinet généraliste', emoji: '⚖️', icon: Scale },
  { id: 'affaires', label: 'Droit des affaires', emoji: '🏢', icon: Briefcase },
  { id: 'numerique', label: 'Droit du numérique / IP', emoji: '💻', icon: Globe },
  { id: 'social', label: 'Droit social', emoji: '👥', icon: UserCheck },
  { id: 'penal', label: 'Droit pénal', emoji: '🔒', icon: Lock },
  { id: 'autre', label: 'Autre spécialité', emoji: '📋', icon: HelpCircle },
];

const sizeOptions = [
  { id: '1-3', label: '1 – 3', desc: 'Avocat seul ou petit cabinet' },
  { id: '4-10', label: '4 – 10', desc: 'Cabinet de taille moyenne' },
  { id: '11-30', label: '11 – 30', desc: 'Cabinet structuré' },
  { id: '30+', label: '30+', desc: 'Grand cabinet / réseau' },
];

const challengeOptions = [
  { id: 'dossiers', label: 'Gestion des dossiers', icon: FolderSearch },
  { id: 'facturation', label: 'Facturation & temps passé', icon: Clock },
  { id: 'outils', label: 'Outils incompatibles / silos', icon: Database },
  { id: 'conformite', label: 'Conformité RGPD / déontologie', icon: Lock },
  { id: 'collaboration', label: 'Collaboration interne', icon: Users },
  { id: 'processus', label: 'Process manuels & répétitifs', icon: Workflow },
];

const priorityOptions = [
  { id: 'temps-facturable', label: 'Récupérer du temps facturable', desc: 'Réduire les tâches non-juridiques' },
  { id: 'outils', label: 'Rationaliser les outils', desc: 'Sortir du mille-feuille numérique' },
  { id: 'securite', label: 'Sécuriser les données', desc: 'Secret professionnel et RGPD' },
  { id: 'pilotage', label: 'Piloter l\'activité', desc: 'Visibilité sur la rentabilité' },
  { id: 'onboarding', label: 'Onboarding collaborateurs', desc: 'Structurer l\'intégration' },
  { id: 'croissance', label: 'Préparer la croissance', desc: 'Scaler sans tout casser' },
];

const timelineOptions = [
  { id: 'urgent', label: 'Dès que possible', emoji: '🚀', desc: 'Le sujet est prioritaire' },
  { id: '1-mois', label: 'Dans le mois', emoji: '📅', desc: 'Prêt à lancer bientôt' },
  { id: '3-mois', label: 'Dans 3 mois', emoji: '🗓️', desc: 'On planifie sereinement' },
  { id: 'exploration', label: 'En exploration', emoji: '🔍', desc: 'Je me renseigne d\'abord' },
];

const botMessages = [
  "Bienvenue. Quelques questions pour comprendre votre cabinet et calibrer l'audit. Quel type de cabinet êtes-vous ?",
  "Bien noté. Combien d'avocats exercent dans votre structure ?",
  "Quels sont vos principaux irritants au quotidien ? (Plusieurs choix possibles)",
  "Merci. Quelles sont vos 3 priorités pour les prochains mois ?",
  "Presque terminé. Quand souhaitez-vous lancer l'audit ?",
  "Dernière étape : vos coordonnées pour qu'on puisse vous recontacter.",
];

// ─── Chat bubble ─────────────────────────────────────────────────
const ChatBubble = ({ message, delay = 0 }: { message: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 12, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.4, delay }}
    className="flex items-start gap-3 mb-6"
  >
    <div className="w-9 h-9 rounded-full bg-dikio-title/20 border border-dikio-title/30 flex items-center justify-center flex-shrink-0">
      <Sparkles className="h-4 w-4 text-dikio-title" />
    </div>
    <div className="bg-white/60 border border-dikio-title/10 backdrop-blur-sm rounded-2xl rounded-tl-sm px-5 py-3 max-w-md">
      <p className="text-dikio-paragraph/80 text-sm leading-relaxed">{message}</p>
    </div>
  </motion.div>
);

// ─── Progress bar ────────────────────────────────────────────────
const ProgressBar = ({ currentStep }: { currentStep: number }) => (
  <div className="flex items-center justify-center gap-1 mb-10">
    {stepsMeta.map((step, i) => {
      const Icon = step.icon;
      const isActive = i === currentStep;
      const isDone = i < currentStep;
      return (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center gap-1">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
              isDone ? 'bg-dikio-title text-white' :
              isActive ? 'bg-dikio-title/15 border-2 border-dikio-title text-dikio-title' :
              'bg-dikio-title/5 border border-dikio-title/15 text-dikio-paragraph/30'
            }`}>
              {isDone ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
            </div>
            <span className={`text-[10px] hidden md:block ${isActive ? 'text-dikio-title' : 'text-dikio-paragraph/30'}`}>
              {step.label}
            </span>
          </div>
          {i < stepsMeta.length - 1 && (
            <div className={`w-6 md:w-10 h-px mt-[-12px] md:mt-0 transition-colors duration-300 ${
              i < currentStep ? 'bg-dikio-title' : 'bg-dikio-title/10'
            }`} />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

// ─── Main component ──────────────────────────────────────────────
const LegalOpsForm = () => {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FormData>({
    cabinetType: '',
    size: '',
    challenges: [],
    priorities: [],
    timeline: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    cabinetName: '',
    role: '',
    message: '',
  });

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [step]);

  const canContinue = () => {
    switch (step) {
      case 0: return !!formData.cabinetType;
      case 1: return !!formData.size;
      case 2: return formData.challenges.length > 0;
      case 3: return formData.priorities.length >= 1;
      case 4: return !!formData.timeline;
      case 5: return !!formData.firstName && !!formData.lastName && !!formData.email && !!formData.phone;
      default: return false;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const cabinetLabel = cabinetTypes.find(e => e.id === formData.cabinetType)?.label ?? formData.cabinetType;
      const timelineLabel = timelineOptions.find(t => t.id === formData.timeline)?.label ?? formData.timeline;
      const challengeLabels = formData.challenges.map(c => challengeOptions.find(o => o.id === c)?.label ?? c).join(', ');
      const priorityLabels = formData.priorities.map(p => priorityOptions.find(o => o.id === p)?.label ?? p).join(', ');

      const description = [
        `Type de cabinet : ${cabinetLabel}`,
        `Taille : ${formData.size} avocats`,
        `Cabinet : ${formData.cabinetName || 'N/A'}`,
        `Fonction : ${formData.role || 'N/A'}`,
        `Défis : ${challengeLabels}`,
        `Priorités : ${priorityLabels}`,
        `Timeline : ${timelineLabel}`,
        formData.message ? `Message : ${formData.message}` : null,
      ].filter(Boolean).join('\n');

      const { error } = await supabase.from('leads').insert({
        title: `Demande Audit LegalOps | ${formData.firstName} ${formData.lastName}`,
        full_name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        company_name: formData.cabinetName || undefined,
        description,
        source: 'legalops-form',
        status: 'new',
      });

      if (error) throw error;

      setSubmitted(true);
      toast({ title: 'Demande envoyée !', description: 'Nous vous recontactons sous 24h.' });
    } catch (err) {
      console.error('Erreur soumission:', err);
      toast({ title: 'Erreur', description: 'Une erreur est survenue. Réessayez.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleChallenge = (id: string) => {
    setFormData(prev => ({
      ...prev,
      challenges: prev.challenges.includes(id)
        ? prev.challenges.filter(c => c !== id)
        : [...prev.challenges, id]
    }));
  };

  const togglePriority = (id: string) => {
    setFormData(prev => ({
      ...prev,
      priorities: prev.priorities.includes(id)
        ? prev.priorities.filter(p => p !== id)
        : prev.priorities.length < 3 ? [...prev.priorities, id] : prev.priorities
    }));
  };

  // ─── Success screen ─────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-dikio-background flex items-center justify-center px-4">
        <SEO title="Demande envoyée | Audit LegalOps" url="https://dikio.fr/legalops/demande" />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="text-center max-w-lg"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-dikio-title/15 border-2 border-dikio-title flex items-center justify-center mx-auto mb-6"
          >
            <Check className="h-10 w-10 text-dikio-title" />
          </motion.div>
          <h2 className="font-['Fraunces'] text-3xl text-dikio-paragraph mb-4">Demande envoyée !</h2>
          <p className="text-dikio-paragraph/50 mb-8">
            Merci {formData.firstName}. Notre équipe analyse votre profil et vous recontacte sous 24h pour planifier votre audit.
          </p>

          <div className="bg-white/60 border border-dikio-title/10 backdrop-blur-sm rounded-2xl p-6 text-left space-y-3 mb-8">
            <h3 className="text-dikio-title font-['JetBrains_Mono'] text-xs uppercase tracking-wider mb-4">Récapitulatif</h3>
            <div className="flex justify-between text-sm">
              <span className="text-dikio-paragraph/40">Cabinet</span>
              <span className="text-dikio-paragraph">{cabinetTypes.find(e => e.id === formData.cabinetType)?.label}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-dikio-paragraph/40">Taille</span>
              <span className="text-dikio-paragraph">{formData.size} avocats</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-dikio-paragraph/40">Timeline</span>
              <span className="text-dikio-paragraph">{timelineOptions.find(t => t.id === formData.timeline)?.label}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-dikio-paragraph/40">Défis</span>
              <span className="text-dikio-paragraph text-right">{formData.challenges.map(c => challengeOptions.find(o => o.id === c)?.label).join(', ')}</span>
            </div>
          </div>

          <Button asChild className="bg-dikio-title hover:bg-dikio-title/90 text-white px-8 py-5 rounded-xl">
            <a href="/legalops">Retour à la page</a>
          </Button>
        </motion.div>
      </div>
    );
  }

  // ─── Step content renderers ─────────────────────
  const selectedClass = 'bg-dikio-title/10 border-dikio-title/40 ring-1 ring-dikio-title/20';
  const defaultClass = 'bg-white/50 border-dikio-title/10 hover:bg-white/70 hover:border-dikio-title/20';

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {cabinetTypes.map(type => {
              const Icon = type.icon;
              const selected = formData.cabinetType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setFormData(prev => ({ ...prev, cabinetType: type.id }))}
                  className={`p-4 rounded-xl border text-left transition-all duration-200 ${selected ? selectedClass : defaultClass}`}
                >
                  <span className="text-2xl mb-2 block">{type.emoji}</span>
                  <span className={`text-sm font-medium ${selected ? 'text-dikio-title' : 'text-dikio-paragraph/70'}`}>{type.label}</span>
                </button>
              );
            })}
          </motion.div>
        );

      case 1:
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 gap-3">
            {sizeOptions.map(size => {
              const selected = formData.size === size.id;
              return (
                <button
                  key={size.id}
                  onClick={() => setFormData(prev => ({ ...prev, size: size.id }))}
                  className={`p-5 rounded-xl border text-left transition-all duration-200 ${selected ? selectedClass : defaultClass}`}
                >
                  <span className={`text-xl font-['Fraunces'] font-semibold ${selected ? 'text-dikio-title' : 'text-dikio-paragraph'}`}>{size.label}</span>
                  <p className="text-xs text-dikio-paragraph/40 mt-1">{size.desc}</p>
                </button>
              );
            })}
          </motion.div>
        );

      case 2:
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {challengeOptions.map(ch => {
              const Icon = ch.icon;
              const selected = formData.challenges.includes(ch.id);
              return (
                <button
                  key={ch.id}
                  onClick={() => toggleChallenge(ch.id)}
                  className={`p-4 rounded-xl border text-left transition-all duration-200 flex items-start gap-3 ${selected ? selectedClass : defaultClass}`}
                >
                  <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${selected ? 'text-dikio-title' : 'text-dikio-paragraph/30'}`} />
                  <span className={`text-sm font-medium ${selected ? 'text-dikio-title' : 'text-dikio-paragraph/70'}`}>{ch.label}</span>
                </button>
              );
            })}
          </motion.div>
        );

      case 3:
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <p className="text-xs text-dikio-paragraph/40 mb-2">Sélectionnez jusqu'à 3 priorités</p>
            {priorityOptions.map(p => {
              const selected = formData.priorities.includes(p.id);
              const index = formData.priorities.indexOf(p.id);
              return (
                <button
                  key={p.id}
                  onClick={() => togglePriority(p.id)}
                  className={`w-full p-4 rounded-xl border text-left transition-all duration-200 flex items-center gap-4 ${selected ? selectedClass : defaultClass}`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${
                    selected ? 'bg-dikio-title text-white' : 'bg-dikio-title/10 text-dikio-paragraph/30'
                  }`}>
                    {selected ? index + 1 : ''}
                  </div>
                  <div>
                    <span className={`text-sm font-medium block ${selected ? 'text-dikio-title' : 'text-dikio-paragraph/70'}`}>{p.label}</span>
                    <span className="text-xs text-dikio-paragraph/40">{p.desc}</span>
                  </div>
                </button>
              );
            })}
          </motion.div>
        );

      case 4:
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 gap-3">
            {timelineOptions.map(t => {
              const selected = formData.timeline === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setFormData(prev => ({ ...prev, timeline: t.id }))}
                  className={`p-5 rounded-xl border text-left transition-all duration-200 ${selected ? selectedClass : defaultClass}`}
                >
                  <span className="text-2xl mb-2 block">{t.emoji}</span>
                  <span className={`text-sm font-medium block ${selected ? 'text-dikio-title' : 'text-dikio-paragraph/70'}`}>{t.label}</span>
                  <span className="text-xs text-dikio-paragraph/40">{t.desc}</span>
                </button>
              );
            })}
          </motion.div>
        );

      case 5:
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <p className="text-xs text-dikio-paragraph/40 mb-1">Les champs marqués <span className="text-dikio-title">*</span> sont obligatoires</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-dikio-paragraph/60">Prénom <span className="text-dikio-title">*</span></label>
                <input
                  type="text"
                  placeholder="Votre prénom"
                  value={formData.firstName}
                  onChange={e => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full bg-white/60 border border-dikio-title/10 rounded-xl px-4 py-3 text-sm text-dikio-paragraph placeholder:text-dikio-paragraph/30 focus:outline-none focus:border-dikio-title/40 focus:ring-1 focus:ring-dikio-title/20"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-dikio-paragraph/60">Nom <span className="text-dikio-title">*</span></label>
                <input
                  type="text"
                  placeholder="Votre nom"
                  value={formData.lastName}
                  onChange={e => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  className="w-full bg-white/60 border border-dikio-title/10 rounded-xl px-4 py-3 text-sm text-dikio-paragraph placeholder:text-dikio-paragraph/30 focus:outline-none focus:border-dikio-title/40 focus:ring-1 focus:ring-dikio-title/20"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-dikio-paragraph/60">Email professionnel <span className="text-dikio-title">*</span></label>
              <input
                type="email"
                placeholder="exemple@cabinet.fr"
                value={formData.email}
                onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full bg-white/60 border border-dikio-title/10 rounded-xl px-4 py-3 text-sm text-dikio-paragraph placeholder:text-dikio-paragraph/30 focus:outline-none focus:border-dikio-title/40 focus:ring-1 focus:ring-dikio-title/20"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-dikio-paragraph/60">Téléphone <span className="text-dikio-title">*</span></label>
              <input
                type="tel"
                placeholder="06 00 00 00 00"
                value={formData.phone}
                onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full bg-white/60 border border-dikio-title/10 rounded-xl px-4 py-3 text-sm text-dikio-paragraph placeholder:text-dikio-paragraph/30 focus:outline-none focus:border-dikio-title/40 focus:ring-1 focus:ring-dikio-title/20"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-dikio-paragraph/60">Cabinet <span className="text-dikio-paragraph/20 text-[10px]">(optionnel)</span></label>
                <input
                  type="text"
                  placeholder="Nom du cabinet"
                  value={formData.cabinetName}
                  onChange={e => setFormData(prev => ({ ...prev, cabinetName: e.target.value }))}
                  className="w-full bg-white/60 border border-dikio-title/10 rounded-xl px-4 py-3 text-sm text-dikio-paragraph placeholder:text-dikio-paragraph/30 focus:outline-none focus:border-dikio-title/40 focus:ring-1 focus:ring-dikio-title/20"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-dikio-paragraph/60">Fonction <span className="text-dikio-paragraph/20 text-[10px]">(optionnel)</span></label>
                <input
                  type="text"
                  placeholder="Associé, Office Manager..."
                  value={formData.role}
                  onChange={e => setFormData(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full bg-white/60 border border-dikio-title/10 rounded-xl px-4 py-3 text-sm text-dikio-paragraph placeholder:text-dikio-paragraph/30 focus:outline-none focus:border-dikio-title/40 focus:ring-1 focus:ring-dikio-title/20"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-dikio-paragraph/60">Message <span className="text-dikio-paragraph/20 text-[10px]">(optionnel)</span></label>
              <textarea
                placeholder="Décrivez brièvement votre situation..."
                value={formData.message}
                onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                rows={3}
                className="w-full bg-white/60 border border-dikio-title/10 rounded-xl px-4 py-3 text-sm text-dikio-paragraph placeholder:text-dikio-paragraph/30 focus:outline-none focus:border-dikio-title/40 focus:ring-1 focus:ring-dikio-title/20 resize-none"
              />
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-dikio-background relative overflow-hidden">
      <SEO
        title="Demander un audit LegalOps | Dikio"
        description="Répondez à quelques questions pour recevoir un diagnostic personnalisé de vos opérations."
        url="https://dikio.fr/legalops/demande"
      />

      {/* Subtle glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-dikio-title/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-16 md:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="font-['Fraunces'] text-2xl md:text-3xl text-dikio-paragraph mb-2">
            Demander un <span className="text-dikio-title italic">audit LegalOps</span>
          </h1>
          <p className="text-dikio-paragraph/50 text-sm font-['DM_Sans']">Quelques questions pour calibrer votre diagnostic. Sans engagement.</p>
        </motion.div>

        <ProgressBar currentStep={step} />

        {/* Chat area */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <ChatBubble message={botMessages[step]} />
              <div className="ml-12">
                {renderStep()}
              </div>
            </motion.div>
          </AnimatePresence>
          <div ref={scrollRef} />
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-dikio-title/10">
          <Button
            variant="ghost"
            onClick={() => setStep(s => s - 1)}
            disabled={step === 0}
            className="text-dikio-paragraph/50 hover:text-dikio-paragraph hover:bg-dikio-title/5 disabled:opacity-30"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Retour
          </Button>

          {step < 5 ? (
            <Button
              onClick={() => setStep(s => s + 1)}
              disabled={!canContinue()}
              className="bg-dikio-title hover:bg-dikio-title/90 text-white px-6 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Continuer <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!canContinue() || isSubmitting}
              className="bg-dikio-title hover:bg-dikio-title/90 text-white px-6 rounded-xl disabled:opacity-30"
            >
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
              {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          )}
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center gap-6 mt-10 pt-6 border-t border-dikio-title/5">
          {[
            { icon: Shield, label: 'Sans engagement' },
            { icon: Clock, label: 'Réponse sous 24h' },
            { icon: Lock, label: 'Données sécurisées' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-dikio-paragraph/30 text-xs">
              <item.icon className="h-3.5 w-3.5" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LegalOpsForm;
