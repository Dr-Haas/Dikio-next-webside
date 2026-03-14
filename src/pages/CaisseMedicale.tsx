'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CreditCard, User, FileWarning, Check, X, ExternalLink } from 'lucide-react';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import WorkflowsSection from '@/components/caisse-medicale/WorkflowDiagram';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

// Hero Section
const HeroSection = () => (
  <section className="bg-caisse-cream py-20 lg:py-28 overflow-hidden">
    <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left - Text */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-xl"
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 bg-caisse-red" />
            <span className="font-mono text-xs uppercase tracking-widest text-caisse-textSecondary">
              Trésorerie · Cabinets Médicaux
            </span>
          </motion.div>
          
          <motion.h1 variants={fadeInUp} className="font-fraunces text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
            <span className="text-caisse-text">Vous perdez de l'argent</span>
            <br />
            <span className="text-caisse-red italic font-light">sans le savoir.</span>
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-lg text-caisse-textSecondary mb-8 leading-relaxed">
            Chaque mois, des dizaines de milliers d'euros ne sont jamais encaissés dans les cabinets médicaux et dentaires. Des paiements oubliés, des débiteurs perdus, des écarts invisibles. On les retrouve pour vous.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              className="bg-caisse-dark hover:bg-caisse-dark/90 text-white px-6 py-6 rounded-lg font-medium transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <a href="#offers">
                Découvrir combien vous perdez
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-caisse-dark/20 hover:bg-caisse-dark/5 px-6 py-6 rounded-lg font-medium"
            >
              <a href="https://archimed.dikio.fr" target="_blank" rel="noopener noreferrer">
                Voir le projet Archimed
              </a>
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Right - Financial Card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden relative">
            {/* Gradient Bar */}
            <div className="h-1 bg-gradient-to-r from-caisse-red via-caisse-gold to-caisse-green" />
            
            <div className="p-8">
              <span className="font-mono text-xs uppercase tracking-widest text-caisse-textTertiary">
                Pertes non détectées · Moyenne mensuelle
              </span>
              
              <p className="font-fraunces text-5xl md:text-6xl text-caisse-red font-semibold mt-4 mb-2">
                47 200 €
              </p>
              <p className="text-caisse-textSecondary mb-6">non encaissés chaque mois en moyenne</p>
              
              <div className="bg-caisse-creamAlt rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-caisse-textSecondary">CB non rapprochées</span>
                  <span className="font-mono text-caisse-red font-medium">- 18 400 €</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-caisse-textSecondary">Débiteurs oubliés</span>
                  <span className="font-mono text-caisse-red font-medium">- 22 100 €</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-caisse-textSecondary">Actes non réglés</span>
                  <span className="font-mono text-caisse-red font-medium">- 6 700 €</span>
                </div>
                <div className="border-t border-caisse-dark/10 pt-3 flex justify-between items-center">
                  <span className="text-caisse-textSecondary">Récupéré après automatisation</span>
                  <span className="font-mono text-caisse-green font-medium">+ 45 800 €</span>
                </div>
              </div>
              
              <div className="mt-6 flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-caisse-green opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-caisse-green"></span>
                </span>
                <span className="text-caisse-green font-medium text-sm">Détection automatique activée</span>
              </div>
            </div>
          </div>
          
          {/* Floating Stats */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-4 -right-4 lg:right-8 bg-white rounded-xl shadow-lg p-4 hidden md:block"
          >
            <span className="text-2xl font-fraunces text-caisse-red font-semibold">×12</span>
            <p className="text-xs text-caisse-textSecondary mt-1">mois = centaines de K€</p>
          </motion.div>
          
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-4 -left-4 lg:left-0 bg-white rounded-xl shadow-lg p-4 hidden md:block"
          >
            <span className="text-2xl font-fraunces text-caisse-green font-semibold">97%</span>
            <p className="text-xs text-caisse-textSecondary mt-1">taux de récupération</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </section>
);

// Problem Section
const ProblemSection = () => {
  const problems = [
    {
      icon: CreditCard,
      title: "Paiements CB non rapprochés",
      description: "Le terminal encaisse, le logiciel enregistre, mais personne ne vérifie que les deux correspondent. Les écarts s'accumulent silencieusement."
    },
    {
      icon: User,
      title: "Débiteurs oubliés",
      description: "Des patient·e·s repartent avec un solde dû. Le fichier Excel de suivi est incomplet, jamais à jour. L'argent ne revient jamais."
    },
    {
      icon: FileWarning,
      title: "Anomalies découvertes trop tard",
      description: "Les écarts ne sont repérés qu'en fin de mois, ou pire, lors du bilan annuel. À ce stade, il est trop tard pour agir."
    }
  ];

  return (
    <section className="bg-caisse-creamAlt py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} className="font-mono text-xs uppercase tracking-widest text-caisse-red">
            Le Problème Silencieux
          </motion.span>
          <motion.h2 variants={fadeInUp} className="font-fraunces text-3xl md:text-4xl lg:text-5xl mt-4">
            <span className="text-caisse-text">Chaque soir, de l'argent</span>
            <br />
            <span className="text-caisse-red italic">disparaît.</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-caisse-textSecondary mt-4 max-w-2xl mx-auto">
            Pas un vol. Pas une fraude. Juste un système manuel qui ne peut pas tout suivre. Et à la fin de l'année, l'addition est brutale.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-white rounded-2xl p-8 transition-all hover:-translate-y-1 hover:shadow-xl border border-transparent hover:border-caisse-dark/5"
            >
              <div className="w-12 h-12 rounded-xl bg-caisse-red/10 flex items-center justify-center mb-6">
                <problem.icon className="h-6 w-6 text-caisse-red" />
              </div>
              <h3 className="font-fraunces text-xl font-medium text-caisse-text mb-3">
                {problem.title}
              </h3>
              <p className="text-caisse-textSecondary leading-relaxed">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Archimed Section
const ArchimedSection = () => {
  const stats = [
    { value: "5", label: "Workflows orchestrés" },
    { value: "0 min", label: "De clôture manuelle" },
    { value: "100%", label: "Transactions vérifiées" },
    { value: "J+0", label: "Détection anomalies" }
  ];

  return (
    <section className="bg-caisse-cream py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Dark Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-caisse-dark rounded-3xl p-8 lg:p-10 relative overflow-hidden"
          >
            {/* Grid Pattern */}
            <div 
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }}
            />
            
            <div className="relative z-10">
              <span className="font-mono text-xs uppercase tracking-widest text-caisse-textTertiary">
                Cas Client · Déploiement Groupe
              </span>
              
              <h3 className="font-fraunces text-3xl md:text-4xl text-white mt-4 mb-6">
                Projet <span className="text-caisse-green italic">Archimed</span>
              </h3>
              
              <p className="text-gray-400 leading-relaxed mb-8">
                Déployé pour un groupe de cliniques, Archimed automatise l'intégralité de la gestion de caisse sur l'ensemble des établissements. Rapprochement CB/TPE, gestion des débiteurs, clôture journalière : chaque praticien·ne est couvert·e.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-black/30 border border-white/10 rounded-xl p-4">
                    <p className="font-fraunces text-2xl text-white">{stat.value}</p>
                    <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Right - Text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.span variants={fadeInUp} className="font-mono text-xs uppercase tracking-widest text-caisse-green">
              De la grosse machine au framework
            </motion.span>
            
            <motion.h2 variants={fadeInUp} className="font-fraunces text-3xl md:text-4xl mt-4 mb-6">
              <span className="text-caisse-text">Prouvé à grande échelle.</span>
              <br />
              <span className="text-caisse-green italic">Accessible à tous.</span>
            </motion.h2>
            
            <motion.p variants={fadeInUp} className="text-caisse-textSecondary leading-relaxed mb-4">
              Archimed est une infrastructure lourde, conçue pour un déploiement multi-sites et multi-praticiens. Ça fonctionne. Les résultats sont spectaculaires.
            </motion.p>
            
            <motion.p variants={fadeInUp} className="text-caisse-textSecondary leading-relaxed mb-6">
              Mais tout le monde n'a pas besoin d'une fusée pour traverser la rue. C'est pourquoi on a extrait l'intelligence d'Archimed dans un framework opérationnel plus léger, plus rapide à déployer, avec la même rigueur.
            </motion.p>
            
            <motion.a
              variants={fadeInUp}
              href="https://archimed.dikio.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-caisse-green font-medium group"
            >
              Découvrir le projet Archimed
              <ExternalLink className="ml-2 h-4 w-4 transition-all group-hover:ml-3" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Framework Section
const FrameworkSection = () => {
  const steps = [
    { number: "01", color: "bg-caisse-gold", title: "Collecte automatique", description: "Recettes, actes et débiteurs récupérés depuis votre drive, triés par praticien·ne et par date." },
    { number: "02", color: "bg-caisse-blue", title: "Rapprochement CB / TPE", description: "Chaque paiement est comparé avec la télécollecte. Les écarts sont détectés au centime près." },
    { number: "03", color: "bg-caisse-red", title: "Gestion des débiteurs", description: "Soldes mis à jour, trop-perçus détectés, paiements réglés supprimés automatiquement." },
    { number: "04", color: "bg-caisse-green", title: "Clôture & alertes", description: "Totaux consolidés envoyés à votre comptable. Alerte email immédiate en cas d'anomalie." }
  ];

  return (
    <section className="bg-caisse-creamAlt py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} className="font-mono text-xs uppercase tracking-widest text-caisse-gold">
            Notre Framework
          </motion.span>
          <motion.h2 variants={fadeInUp} className="font-fraunces text-3xl md:text-4xl lg:text-5xl mt-4">
            <span className="text-caisse-text">Automatisé de bout en bout.</span>
            <br />
            <span className="text-caisse-green italic">Déployé en 2 semaines.</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-caisse-textSecondary mt-4 max-w-xl mx-auto">
            Chaque jour, le système travaille pour vous. Vous ne touchez à rien.
          </motion.p>
        </motion.div>

        {/* Timeline - Desktop Horizontal */}
        <div className="hidden md:block relative">
          {/* Gradient Line */}
          <div className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-caisse-gold via-caisse-blue via-caisse-red to-caisse-green rounded-full mx-[calc(12.5%-12px)]" />
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-4 gap-6"
          >
            {steps.map((step, index) => (
              <motion.div key={index} variants={fadeInUp} className="text-center">
                <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 relative z-10`}>
                  <span className="font-mono text-white font-semibold">{step.number}</span>
                </div>
                <h3 className="font-fraunces text-xl text-caisse-text mb-3">{step.title}</h3>
                <p className="text-caisse-textSecondary text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Timeline - Mobile Vertical */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="md:hidden relative"
        >
          {/* Vertical Line */}
          <div className="absolute left-8 top-8 bottom-8 w-1 bg-gradient-to-b from-caisse-gold via-caisse-blue via-caisse-red to-caisse-green rounded-full" />
          
          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div key={index} variants={fadeInUp} className="flex gap-6">
                <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center flex-shrink-0 relative z-10`}>
                  <span className="font-mono text-white font-semibold">{step.number}</span>
                </div>
                <div>
                  <h3 className="font-fraunces text-xl text-caisse-text mb-2">{step.title}</h3>
                  <p className="text-caisse-textSecondary text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Before/After Section
const BeforeAfterSection = () => {
  const beforeItems = [
    "30 à 45 min de clôture chaque soir",
    "Rapprochement CB/TPE à la main",
    "Des milliers d'euros non encaissés chaque mois",
    "Anomalies découvertes en fin de mois",
    "Suivi débiteurs approximatif"
  ];

  const afterItems = [
    "Clôture automatique, 0 minute",
    "Rapprochement exhaustif au centime près",
    "Chaque euro non encaissé est identifié en J+0",
    "Alerte email immédiate sur les écarts",
    "Gestion débiteurs structurée et à jour"
  ];

  return (
    <section className="bg-caisse-cream py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} className="font-mono text-xs uppercase tracking-widest text-caisse-gold">
            Transformation
          </motion.span>
          <motion.h2 variants={fadeInUp} className="font-fraunces text-3xl md:text-4xl lg:text-5xl mt-4">
            <span className="text-caisse-text">Avant </span>
            <span className="text-caisse-red italic">vs</span>
            <span className="text-caisse-text"> après.</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-caisse-textSecondary mt-4">
            Le même cabinet. Deux réalités.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid lg:grid-cols-[1fr,auto,1fr] gap-6 lg:gap-8 max-w-5xl mx-auto items-start"
        >
          {/* Before Column */}
          <motion.div
            variants={fadeInUp}
            className="bg-red-50 border border-caisse-red/20 rounded-2xl p-8"
          >
            <h3 className="text-caisse-red uppercase font-mono text-sm tracking-wider mb-6 flex items-center gap-2">
              <X className="h-5 w-5" />
              Gestion Manuelle
            </h3>
            <ul className="space-y-4">
              {beforeItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <X className="h-5 w-5 text-caisse-red flex-shrink-0 mt-0.5" />
                  <span className="text-caisse-textSecondary">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Arrow */}
          <motion.div
            variants={fadeInUp}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="w-16 h-16 rounded-full bg-caisse-dark flex items-center justify-center">
              <ArrowRight className="h-6 w-6 text-white" />
            </div>
          </motion.div>
          
          {/* Mobile Arrow */}
          <motion.div
            variants={fadeInUp}
            className="lg:hidden flex justify-center"
          >
            <div className="w-12 h-12 rounded-full bg-caisse-dark flex items-center justify-center rotate-90">
              <ArrowRight className="h-5 w-5 text-white" />
            </div>
          </motion.div>

          {/* After Column */}
          <motion.div
            variants={fadeInUp}
            className="bg-green-50 border border-caisse-green/20 rounded-2xl p-8"
          >
            <h3 className="text-caisse-green uppercase font-mono text-sm tracking-wider mb-6 flex items-center gap-2">
              <Check className="h-5 w-5" />
              Automatisation Dikio
            </h3>
            <ul className="space-y-4">
              {afterItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-caisse-green flex-shrink-0 mt-0.5" />
                  <span className="text-caisse-textSecondary">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Offers Section
const OffersSection = () => {
  const bigCompanyFeatures = [
    "Orchestration multi-sites",
    "Intégration sur-mesure logiciel métier",
    "Dashboard supervision centralisé",
    "Support dédié & maintenance",
    "Conformité RGPD accompagnée"
  ];

  const practitionerFeatures = [
    "Clôture de caisse 100% automatisée",
    "Rapprochement CB/TPE quotidien",
    "Détection pertes non encaissées",
    "Gestion débiteurs automatique",
    "Déployé en moins de 2 semaines"
  ];

  return (
    <section id="offers" className="bg-caisse-creamAlt py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} className="font-mono text-xs uppercase tracking-widest text-caisse-green">
            Nos Offres
          </motion.span>
          <motion.h2 variants={fadeInUp} className="font-fraunces text-3xl md:text-4xl lg:text-5xl mt-4">
            <span className="text-caisse-text">Pensé pour les groupes.</span>
            <br />
            <span className="text-caisse-green italic">Accessible aux indépendants.</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-caisse-textSecondary mt-4">
            Que vous gériez un groupe de cliniques ou un cabinet individuel, on a la solution.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {/* Big Companies Card */}
          <motion.div
            variants={fadeInUp}
            className="bg-white rounded-2xl p-8 border border-caisse-dark/5"
          >
            <span className="inline-block px-3 py-1 bg-caisse-blue/10 text-caisse-blue font-mono text-xs uppercase tracking-wider rounded-full mb-4">
              Grands Comptes
            </span>
            <h3 className="font-fraunces text-2xl text-caisse-text mb-3">
              Déploiement multi-établissements
            </h3>
            <p className="text-caisse-textSecondary mb-6">
              Infrastructure type Archimed : automatisation complète déployée sur l'ensemble de vos sites et praticien·ne·s.
            </p>
            <ul className="space-y-3 mb-8">
              {bigCompanyFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-caisse-blue" />
                  <span className="text-caisse-textSecondary text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <Button
              asChild
              variant="outline"
              className="w-full border-caisse-dark/20 hover:bg-caisse-dark/5 py-5 rounded-xl"
            >
              <a href="/caisse-medicale/demande">
                Prendre rendez-vous
              </a>
            </Button>
          </motion.div>

          {/* Practitioners Card - Highlighted */}
          <motion.div
            variants={fadeInUp}
            className="bg-white rounded-2xl p-8 border-2 border-caisse-green relative overflow-hidden"
          >
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-caisse-green" />
            
            <span className="inline-block px-3 py-1 bg-caisse-green/10 text-caisse-green font-mono text-xs uppercase tracking-wider rounded-full mb-4">
              Praticien·ne·s
            </span>
            <h3 className="font-fraunces text-2xl text-caisse-text mb-3">
              Optimisation cabinet individuel
            </h3>
            <p className="text-caisse-textSecondary mb-6">
              La puissance du framework Archimed, adaptée à votre cabinet. Mise en place rapide, résultats dès le premier mois.
            </p>
            <ul className="space-y-3 mb-8">
              {practitionerFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-caisse-green" />
                  <span className="text-caisse-textSecondary text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <Button
              asChild
              className="w-full bg-caisse-dark hover:bg-caisse-dark/90 text-white py-5 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <a href="/caisse-medicale/demande">
                Demander une démo
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Final CTA Section
const FinalCTASection = () => (
  <section className="bg-caisse-cream py-20 lg:py-28">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="bg-caisse-dark rounded-[32px] p-10 md:p-16 relative overflow-hidden max-w-4xl mx-auto text-center"
      >
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Green Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-caisse-green/10 blur-[100px] rounded-full" />
        
        <div className="relative z-10">
          <h2 className="font-fraunces text-3xl md:text-4xl lg:text-5xl text-white mb-6">
            Combien laissez-vous
            <br />
            <span className="text-caisse-green italic">filer</span> chaque mois ?
          </h2>
          
          <p className="text-gray-400 max-w-lg mx-auto mb-8">
            On analyse votre gestion de caisse et on vous montre exactement où passe l'argent. Sans engagement, sans surprises. Enfin, si, une : le montant.
          </p>
          
           <Button
              asChild
              className="bg-caisse-green hover:bg-caisse-green/90 text-white px-8 py-6 rounded-xl font-medium transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <a href="/caisse-medicale/demande">
                Découvrir mes pertes
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
        </div>
      </motion.div>
    </div>
  </section>
);

// Main Page Component
const CaisseMedicale = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Optimisation Trésorerie Cabinets Médicaux",
    "description": "Automatisation de la gestion de caisse pour cabinets médicaux et dentaires. Détection des pertes financières, rapprochement CB/TPE, gestion des débiteurs.",
    "provider": {
      "@type": "Organization",
      "name": "Dikio",
      "url": "https://dikio.fr"
    },
    "areaServed": "France",
    "serviceType": "Automatisation financière santé"
  };

  return (
    <>
      <SEO jsonLd={jsonLd} />
      
      <main className="font-sans">
        <HeroSection />
        <ProblemSection />
        <ArchimedSection />
        <FrameworkSection />
        <WorkflowsSection />
        <BeforeAfterSection />
        <OffersSection />
        <FinalCTASection />
      </main>
    </>
  );
};

export default CaisseMedicale;
