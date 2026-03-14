'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import SEO from '@/components/SEO';
import PreorderDialog from '@/components/archilo/PreorderDialog';
import { 
  Shield, 
  Cpu, 
  ArrowRight,
  CheckCircle2,
  Clock,
  Moon,
  MessageSquare,
  Lock,
  MapPin,
  HelpCircle
} from 'lucide-react';
import archiloBoxTop from '@/assets/archilo-box-top.png';
import archiloPackaging from '@/assets/archilo-packaging.png';
import archiloAppInterface from '@/assets/archilo-app-interface.png';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const Archilo = () => {
  const { t } = useTranslation();
  const [preorderOpen, setPreorderOpen] = useState(false);
  
  const faqItems = [
    { key: 'q1' },
    { key: 'q2' },
    { key: 'q3' },
    { key: 'q4' },
    { key: 'q5' },
    { key: 'q6' },
  ];
  
  const phases = [
    {
      number: "01",
      title: "Audit",
      description: "Diagnostic des \"tâches zombies\" du cabinet. Identification du temps perdu à trier les emails pour préparer le module \"Assistant\"."
    },
    {
      number: "02",
      title: "Installation",
      description: "Livraison de la Box Archilo. Configuration des canaux sécurisés (Signal/WhatsApp) et choix des modèles de raisonnement locaux."
    },
    {
      number: "03",
      title: "Dressage",
      description: "Knowledge Management local. La Box scanne vos archives pour se constituer une \"mémoire\" des précédents et apprend votre style."
    },
    {
      number: "04",
      title: "Production",
      description: "Lancement du \"Stagiaire 24/7\". Activation des routines proactives (Veille nuit, Résumés matinaux) et automatisation des flux."
    }
  ];

  const features = [
    {
      icon: Clock,
      title: "Le Briefing Matinal",
      description: "Chaque matin à 8h00, la Box envoie un résumé des audiences, des urgences emails et de l'actualité juridique."
    },
    {
      icon: MessageSquare,
      title: "Conversation Sécurisée",
      description: "Vous ne changez pas d'appli. Parlez à votre Box via Telegram, Signal ou WhatsApp. Elle vous répond comme un humain."
    },
    {
      icon: Moon,
      title: "Le Night Shift",
      description: "La Box travaille la nuit. Analyse de pièces volumineuses et veille jurisprudentielle livrées prêtes le lendemain."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEO jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Archilo - La Black Box Juridique",
          "description": "Serveur physique sécurisé avec IA intégrée pour cabinets d'avocats. Infrastructure souveraine, données 100% locales, automatisation des tâches juridiques répétitives.",
          "brand": {
            "@type": "Brand",
            "name": "Dikio"
          },
          "manufacturer": {
            "@type": "Organization",
            "name": "Dikio Studio",
            "url": "https://dikio.fr"
          },
          "category": "LegalTech / Infrastructure Informatique",
          "offers": {
            "@type": "Offer",
            "price": "6000",
            "priceCurrency": "EUR",
            "priceValidUntil": "2026-12-31",
            "availability": "https://schema.org/PreOrder",
            "url": "https://dikio.fr/archilo",
            "seller": {
              "@type": "Organization",
              "name": "Dikio Studio"
            }
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5",
            "reviewCount": "1"
          },
          "additionalProperty": [
            {
              "@type": "PropertyValue",
              "name": "Souveraineté des données",
              "value": "100% local - aucun cloud"
            },
            {
              "@type": "PropertyValue",
              "name": "Conformité",
              "value": "RGPD et secret professionnel"
            },
            {
              "@type": "PropertyValue",
              "name": "Processeur",
              "value": "Apple M4 Neural Engine"
            }
          ]
        }}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />
        </div>

        <div className="container px-4 md:px-6 relative z-10 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-center lg:text-left"
            >
              <motion.div variants={fadeInUp} className="mb-6">
                <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-4 py-2 text-sm font-medium text-blue-400">
                  <Shield className="h-4 w-4" />
                  Infrastructure Souveraine Active
                </span>
              </motion.div>

              <motion.h1 
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
              >
                <span className="text-white">Pas un énième logiciel.</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Un nouveau collaborateur.
                </span>
              </motion.h1>

              <motion.p 
                variants={fadeInUp}
                className="text-lg md:text-xl text-slate-300 mb-8 max-w-xl mx-auto lg:mx-0"
              >
                Un serveur physique sécurisé installé à votre cabinet, couplé à une IA de niveau expert. 
                <span className="text-white font-medium"> Vos données restent chez vous.</span>
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  asChild
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-6 text-base"
                >
                  <Link href="/contact">
                    Découvrir l'Offre
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white px-8 py-6 text-base"
                  asChild
                >
                  <a href="#stagiaire">Voir la démo</a>
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Content - Product Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl blur-2xl" />
                
                <img 
                  src={archiloBoxTop.src} 
                  alt="ArchiloAI Black Box" 
                  className="relative w-full max-w-lg mx-auto drop-shadow-2xl"
                />

                {/* Status badge */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-sm border border-slate-700 rounded-full px-6 py-3 flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-sm text-slate-300">SYSTEM CONNECTED • 100% LOCAL</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hardware Section */}
      <section className="py-20 md:py-32 bg-slate-900 relative">
        <div className="container px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          >
            {/* Image */}
            <motion.div variants={fadeInUp} className="order-2 lg:order-1">
              <img 
                src={archiloPackaging.src} 
                alt="ArchiloAI Packaging Complet" 
                className="w-full rounded-2xl shadow-2xl"
              />
            </motion.div>

            {/* Content */}
            <motion.div variants={staggerContainer} className="order-1 lg:order-2">
              <motion.span variants={fadeInUp} className="text-blue-400 font-mono text-sm tracking-wider uppercase mb-4 block">
                Hardware
              </motion.span>
              
              <motion.h2 
                variants={fadeInUp}
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
              >
                La Black Box Juridique.
              </motion.h2>

              <motion.p 
                variants={fadeInUp}
                className="text-slate-400 text-lg mb-8"
              >
                Au lieu de vendre une licence logicielle, nous installons physiquement une machine chez vous. 
                Vos données ne partent pas dans le Cloud. Elles restent dans cette boîte, sous clé.
              </motion.p>

              <motion.div variants={staggerContainer} className="space-y-6">
                <motion.div 
                  variants={fadeInUp}
                  className="flex items-start gap-4 p-6 bg-slate-800/50 rounded-xl border border-slate-700/50"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <Lock className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Local-First & Souverain</h3>
                    <p className="text-slate-400">Architecture isolée. Vos dossiers ne sortent jamais.</p>
                  </div>
                </motion.div>

                <motion.div 
                  variants={fadeInUp}
                  className="flex items-start gap-4 p-6 bg-slate-800/50 rounded-xl border border-slate-700/50"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                    <Cpu className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Puissance Neuronale M4</h3>
                    <p className="text-slate-400">Un "Stagiaire Résident" sur puce dédiée IA.</p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-20 md:py-32 bg-slate-950 relative">
        <div className="container px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            >
              Maître d'Œuvre Technologique
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-slate-400 text-lg max-w-2xl mx-auto"
            >
              Nous ne vous laissons pas seul avec une machine. Notre méthodologie transforme l'objet en collaborateur proactif.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {phases.map((phase, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="relative p-6 bg-slate-900/50 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-all duration-300 group"
              >
                <span className="text-5xl font-bold text-slate-800 group-hover:text-blue-900/50 transition-colors absolute top-4 right-4">
                  {phase.number}
                </span>
                <div className="relative z-10">
                  <span className="text-blue-400 font-mono text-xs tracking-wider uppercase mb-3 block">
                    Phase {phase.number}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-3">{phase.title}</h3>
                  <p className="text-slate-400 text-sm">{phase.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stagiaire IA Section */}
      <section id="stagiaire" className="py-20 md:py-32 bg-slate-900 relative">
        <div className="container px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            >
              Le Stagiaire IA en Action
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-slate-400 text-lg max-w-2xl mx-auto"
            >
              L'objet prend vie à travers des routines quotidiennes qui changent votre métier.
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-[3rem] blur-2xl" />
                <img 
                  src={archiloAppInterface.src} 
                  alt="Archilo Assistant Interface" 
                  className="relative max-w-xs md:max-w-sm drop-shadow-2xl"
                />
              </div>
            </motion.div>

            {/* Features */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-6"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-slate-400">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 bg-slate-950 relative">
        <div className="container px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} className="flex items-center justify-center gap-3 mb-6">
              <HelpCircle className="h-6 w-6 text-blue-400" />
              <span className="text-blue-400 font-mono text-sm tracking-wider uppercase">FAQ</span>
            </motion.div>
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            >
              {t('archilo.faq.title')}
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-slate-400 text-lg max-w-2xl mx-auto"
            >
              {t('archilo.faq.description')}
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-3xl mx-auto"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem 
                  key={item.key} 
                  value={item.key}
                  className="bg-slate-900/50 rounded-xl border border-slate-800 px-6 data-[state=open]:border-blue-500/50 transition-colors"
                >
                  <AccordionTrigger className="text-left text-white hover:no-underline py-6">
                    <span className="flex items-start gap-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400 font-mono text-sm">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-base md:text-lg font-medium">
                        {t(`archilo.faq.${item.key}.question`)}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-400 pb-6 pl-12">
                    {t(`archilo.faq.${item.key}.answer`)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 md:p-12 lg:p-16 border border-slate-700/50"
          >
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* Left Content */}
              <div>
                <motion.span 
                  variants={fadeInUp}
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 px-4 py-2 text-sm font-medium text-emerald-400 mb-6"
                >
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  Offre Pionnier
                </motion.span>

                <motion.h2 
                  variants={fadeInUp}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight"
                >
                  Prenez de l'avance.
                  <br />
                  Sécurisez votre Box.
                </motion.h2>

                <motion.div 
                  variants={staggerContainer}
                  className="space-y-4"
                >
                  {[
                    { icon: CheckCircle2, text: "Installation sur site incluse", color: "text-emerald-400" },
                    { icon: Clock, text: "Livraison et configuration sous 14 jours", color: "text-blue-400" },
                    { icon: MapPin, text: "Formation des associés (2h) offerte", color: "text-cyan-400" }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      variants={fadeInUp}
                      className="flex items-center gap-3 text-slate-300"
                    >
                      <item.icon className={`h-5 w-5 ${item.color} flex-shrink-0`} />
                      <span>{item.text}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Right - Pricing Card */}
              <motion.div
                variants={fadeInUp}
                className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 text-center"
              >
                <div className="mb-2">
                  <span className="text-slate-500 line-through text-lg">8 999 € HT</span>
                </div>
                
                <div className="mb-4">
                  <span className="text-5xl md:text-6xl font-bold text-white">6 000€</span>
                  <span className="text-slate-400 text-lg ml-2">HT</span>
                </div>

                <div className="mb-8">
                  <span className="inline-block bg-emerald-500/20 text-emerald-400 text-sm font-medium px-4 py-2 rounded-full">
                    Paiement unique • Matériel inclus
                  </span>
                </div>

                <Button 
                  onClick={() => setPreorderOpen(true)}
                  size="lg"
                  className="w-full bg-white hover:bg-slate-100 text-slate-900 font-semibold py-6 text-base rounded-xl mb-6"
                >
                  Précommander maintenant
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <p className="text-slate-500 text-sm">
                  Quantité limitée pour le batch #1.
                  <br />
                  Livraison sous 2 semaines garantie.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Preorder Dialog */}
      <PreorderDialog open={preorderOpen} onOpenChange={setPreorderOpen} />
    </div>
  );
};

export default Archilo;
