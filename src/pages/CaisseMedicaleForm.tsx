import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import {
  Sparkles, Building2, BedDouble, AlertTriangle, ListOrdered,
  Clock, User, ArrowLeft, ArrowRight, Check, Shield, Mail,
  Phone, MessageSquare, ChevronRight, Stethoscope, Activity,
  HeartPulse, FlaskConical, Building, HelpCircle,
  CalendarClock, FileText, Users, Scale, Wallet, Radio
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import SEO from '@/components/SEO';

// ─── Types ───────────────────────────────────────────────────────
interface FormData {
  establishmentType: string;
  size: string;
  challenges: string[];
  priorities: string[];
  timeline: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  establishment: string;
  role: string;
  message: string;
}

// ─── Step definitions ────────────────────────────────────────────
const stepsMeta = [
  { icon: Building2, label: 'Établissement' },
  { icon: BedDouble, label: 'Taille' },
  { icon: AlertTriangle, label: 'Défis' },
  { icon: ListOrdered, label: 'Priorités' },
  { icon: Clock, label: 'Timeline' },
  { icon: User, label: 'Contact' },
];

const establishmentTypes = [
  { id: 'clinique', label: 'Clinique privée', emoji: '🏥', icon: Stethoscope },
  { id: 'cabinet', label: 'Cabinet médical / dentaire', emoji: '🦷', icon: Activity },
  { id: 'centre', label: 'Centre de santé', emoji: '🏢', icon: Building },
  { id: 'hopital', label: 'Hôpital / CHU', emoji: '🏨', icon: HeartPulse },
  { id: 'labo', label: 'Laboratoire', emoji: '🔬', icon: FlaskConical },
  { id: 'autre', label: 'Autre', emoji: '📋', icon: HelpCircle },
];

const sizeOptions = [
  { id: '1-5', label: '1 – 5', desc: 'Cabinet individuel ou petit groupe' },
  { id: '6-20', label: '6 – 20', desc: 'Cabinet de groupe / petite clinique' },
  { id: '21-50', label: '21 – 50', desc: 'Clinique moyenne' },
  { id: '50+', label: '50+', desc: 'Grand établissement / groupe' },
];

const challengeOptions = [
  { id: 'planning', label: 'Gestion du planning', icon: CalendarClock },
  { id: 'communication', label: 'Communication patients', icon: MessageSquare },
  { id: 'suivi', label: 'Suivi patient', icon: FileText },
  { id: 'facturation', label: 'Facturation & encaissements', icon: Wallet },
  { id: 'rh', label: 'Gestion RH', icon: Users },
  { id: 'conformite', label: 'Conformité & réglementaire', icon: Scale },
];

const priorityOptions = [
  { id: 'tresorerie', label: 'Optimiser la trésorerie', desc: 'Récupérer chaque euro perdu' },
  { id: 'temps', label: 'Gagner du temps', desc: 'Réduire les tâches manuelles' },
  { id: 'visibilite', label: 'Visibilité financière', desc: 'Dashboard temps réel' },
  { id: 'conformite', label: 'Conformité réglementaire', desc: 'Être aux normes sans effort' },
  { id: 'patients', label: 'Expérience patients', desc: 'Moderniser le parcours' },
  { id: 'croissance', label: 'Croissance', desc: 'Structurer pour scaler' },
];

const timelineOptions = [
  { id: 'urgent', label: 'Dès que possible', emoji: '🚀', desc: 'On a besoin d\'agir vite' },
  { id: '1-mois', label: 'Dans le mois', emoji: '📅', desc: 'Prêt à démarrer bientôt' },
  { id: '3-mois', label: 'Dans 3 mois', emoji: '🗓️', desc: 'On planifie sereinement' },
  { id: 'exploration', label: 'En exploration', emoji: '🔍', desc: 'Je me renseigne d\'abord' },
];

const botMessages = [
  "Bienvenue ! 👋 Je suis là pour comprendre vos besoins. Commençons par votre type d'établissement.",
  "Parfait ! Quelle est la taille de votre structure ?",
  "Très bien. Quels sont vos principaux défis au quotidien ? (Plusieurs choix possibles)",
  "Merci ! Maintenant, classez vos 3 priorités principales.",
  "Presque fini ! Quand souhaitez-vous démarrer ?",
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
    <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
      <Sparkles className="h-4 w-4 text-emerald-400" />
    </div>
    <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl rounded-tl-sm px-5 py-3 max-w-md">
      <p className="text-gray-200 text-sm leading-relaxed">{message}</p>
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
              isDone ? 'bg-emerald-500 text-white' :
              isActive ? 'bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400' :
              'bg-white/5 border border-white/10 text-gray-500'
            }`}>
              {isDone ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
            </div>
            <span className={`text-[10px] hidden md:block ${isActive ? 'text-emerald-400' : 'text-gray-500'}`}>
              {step.label}
            </span>
          </div>
          {i < stepsMeta.length - 1 && (
            <div className={`w-6 md:w-10 h-px mt-[-12px] md:mt-0 transition-colors duration-300 ${
              i < currentStep ? 'bg-emerald-500' : 'bg-white/10'
            }`} />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

// ─── Main component ──────────────────────────────────────────────
const CaisseMedicaleForm = () => {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FormData>({
    establishmentType: '',
    size: '',
    challenges: [],
    priorities: [],
    timeline: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    establishment: '',
    role: '',
    message: '',
  });

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [step]);

  const canContinue = () => {
    switch (step) {
      case 0: return !!formData.establishmentType;
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
      const establishmentLabel = establishmentTypes.find(e => e.id === formData.establishmentType)?.label ?? formData.establishmentType;
      const timelineLabel = timelineOptions.find(t => t.id === formData.timeline)?.label ?? formData.timeline;
      const challengeLabels = formData.challenges.map(c => challengeOptions.find(o => o.id === c)?.label ?? c).join(', ');
      const priorityLabels = formData.priorities.map(p => priorityOptions.find(o => o.id === p)?.label ?? p).join(', ');

      const description = [
        `Type d'établissement : ${establishmentLabel}`,
        `Taille : ${formData.size} praticiens`,
        `Établissement : ${formData.establishment || 'N/A'}`,
        `Fonction : ${formData.role || 'N/A'}`,
        `Défis : ${challengeLabels}`,
        `Priorités : ${priorityLabels}`,
        `Timeline : ${timelineLabel}`,
        formData.message ? `Message : ${formData.message}` : null,
      ].filter(Boolean).join('\n');

      const { error } = await supabase.from('leads').insert({
        title: `Demande Caisse Médicale | ${formData.firstName} ${formData.lastName}`,
        full_name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        company_name: formData.establishment || undefined,
        description,
        source: 'caisse-medicale-form',
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
      <div className="min-h-screen bg-gradient-to-b from-[#0a0f1a] to-[#141922] flex items-center justify-center px-4">
        <SEO title="Demande envoyée" url="https://dikio.fr/caisse-medicale/demande" />
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
            className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto mb-6"
          >
            <Check className="h-10 w-10 text-emerald-400" />
          </motion.div>
          <h2 className="font-fraunces text-3xl text-white mb-4">Demande envoyée !</h2>
          <p className="text-gray-400 mb-8">
            Merci {formData.firstName}. Notre équipe analyse votre profil et vous recontacte sous 24h avec une première estimation.
          </p>

          {/* Summary */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left space-y-3 mb-8">
            <h3 className="text-emerald-400 font-mono text-xs uppercase tracking-wider mb-4">Récapitulatif</h3>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Établissement</span>
              <span className="text-gray-200">{establishmentTypes.find(e => e.id === formData.establishmentType)?.label}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Taille</span>
              <span className="text-gray-200">{formData.size} praticiens</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Timeline</span>
              <span className="text-gray-200">{timelineOptions.find(t => t.id === formData.timeline)?.label}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Défis</span>
              <span className="text-gray-200 text-right">{formData.challenges.map(c => challengeOptions.find(o => o.id === c)?.label).join(', ')}</span>
            </div>
          </div>

          <Button asChild className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-5 rounded-xl">
            <a href="/caisse-medicale">Retour à la page</a>
          </Button>
        </motion.div>
      </div>
    );
  }

  // ─── Step content renderers ─────────────────────
  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {establishmentTypes.map(type => {
              const Icon = type.icon;
              const selected = formData.establishmentType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setFormData(prev => ({ ...prev, establishmentType: type.id }))}
                  className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                    selected
                      ? 'bg-emerald-500/10 border-emerald-500/50 ring-1 ring-emerald-500/30'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <span className="text-2xl mb-2 block">{type.emoji}</span>
                  <span className={`text-sm font-medium ${selected ? 'text-emerald-300' : 'text-gray-300'}`}>{type.label}</span>
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
                  className={`p-5 rounded-xl border text-left transition-all duration-200 ${
                    selected
                      ? 'bg-emerald-500/10 border-emerald-500/50 ring-1 ring-emerald-500/30'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <span className={`text-xl font-fraunces font-semibold ${selected ? 'text-emerald-300' : 'text-white'}`}>{size.label}</span>
                  <p className="text-xs text-gray-500 mt-1">{size.desc}</p>
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
                  className={`p-4 rounded-xl border text-left transition-all duration-200 flex items-start gap-3 ${
                    selected
                      ? 'bg-emerald-500/10 border-emerald-500/50 ring-1 ring-emerald-500/30'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${selected ? 'text-emerald-400' : 'text-gray-500'}`} />
                  <span className={`text-sm font-medium ${selected ? 'text-emerald-300' : 'text-gray-300'}`}>{ch.label}</span>
                </button>
              );
            })}
          </motion.div>
        );

      case 3:
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <p className="text-xs text-gray-500 mb-2">Sélectionnez jusqu'à 3 priorités</p>
            {priorityOptions.map(p => {
              const selected = formData.priorities.includes(p.id);
              const index = formData.priorities.indexOf(p.id);
              return (
                <button
                  key={p.id}
                  onClick={() => togglePriority(p.id)}
                  className={`w-full p-4 rounded-xl border text-left transition-all duration-200 flex items-center gap-4 ${
                    selected
                      ? 'bg-emerald-500/10 border-emerald-500/50 ring-1 ring-emerald-500/30'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${
                    selected ? 'bg-emerald-500 text-white' : 'bg-white/10 text-gray-500'
                  }`}>
                    {selected ? index + 1 : ''}
                  </div>
                  <div>
                    <span className={`text-sm font-medium block ${selected ? 'text-emerald-300' : 'text-gray-300'}`}>{p.label}</span>
                    <span className="text-xs text-gray-500">{p.desc}</span>
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
                  className={`p-5 rounded-xl border text-left transition-all duration-200 ${
                    selected
                      ? 'bg-emerald-500/10 border-emerald-500/50 ring-1 ring-emerald-500/30'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <span className="text-2xl mb-2 block">{t.emoji}</span>
                  <span className={`text-sm font-medium block ${selected ? 'text-emerald-300' : 'text-gray-300'}`}>{t.label}</span>
                  <span className="text-xs text-gray-500">{t.desc}</span>
                </button>
              );
            })}
          </motion.div>
        );

      case 5:
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <p className="text-xs text-gray-500 mb-1">Les champs marqués <span className="text-emerald-400">*</span> sont obligatoires</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-gray-400">Prénom <span className="text-emerald-400">*</span></label>
                <input
                  type="text"
                  placeholder="Votre prénom"
                  value={formData.firstName}
                  onChange={e => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-400">Nom <span className="text-emerald-400">*</span></label>
                <input
                  type="text"
                  placeholder="Votre nom"
                  value={formData.lastName}
                  onChange={e => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Email professionnel <span className="text-emerald-400">*</span></label>
              <input
                type="email"
                placeholder="exemple@clinique.fr"
                value={formData.email}
                onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Téléphone <span className="text-emerald-400">*</span></label>
              <input
                type="tel"
                placeholder="06 00 00 00 00"
                value={formData.phone}
                onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-gray-400">Établissement <span className="text-gray-600 text-[10px]">(optionnel)</span></label>
                <input
                  type="text"
                  placeholder="Nom de l'établissement"
                  value={formData.establishment}
                  onChange={e => setFormData(prev => ({ ...prev, establishment: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-400">Fonction <span className="text-gray-600 text-[10px]">(optionnel)</span></label>
                <input
                  type="text"
                  placeholder="Votre fonction"
                  value={formData.role}
                  onChange={e => setFormData(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Message <span className="text-gray-600 text-[10px]">(optionnel)</span></label>
              <textarea
                placeholder="Décrivez brièvement votre besoin..."
                value={formData.message}
                onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 resize-none"
              />
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0f1a] to-[#141922] relative overflow-hidden">
      <SEO
        title="Pré-qualification | Caisse Médicale"
        description="Répondez à quelques questions pour recevoir une analyse personnalisée de votre gestion de caisse."
        url="https://dikio.fr/caisse-medicale/demande"
      />

      {/* Subtle grid bg */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-16 md:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="font-fraunces text-2xl md:text-3xl text-white mb-2">
            Optimisez votre <span className="text-emerald-400 italic">trésorerie</span>
          </h1>
          <p className="text-gray-400 text-sm">Répondez à quelques questions, c'est rapide et sans engagement.</p>
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
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/10">
          <Button
            variant="ghost"
            onClick={() => setStep(s => s - 1)}
            disabled={step === 0}
            className="text-gray-400 hover:text-white hover:bg-white/5 disabled:opacity-30"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Retour
          </Button>

          {step < 5 ? (
            <Button
              onClick={() => setStep(s => s + 1)}
              disabled={!canContinue()}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Continuer <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!canContinue() || isSubmitting}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 rounded-xl disabled:opacity-30"
            >
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
              {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          )}
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center gap-6 mt-10 pt-6 border-t border-white/5">
          {[
            { icon: Shield, label: 'Sans engagement' },
            { icon: Clock, label: 'Réponse sous 24h' },
            { icon: Radio, label: 'Données sécurisées' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-gray-500 text-xs">
              <item.icon className="h-3.5 w-3.5" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CaisseMedicaleForm;
