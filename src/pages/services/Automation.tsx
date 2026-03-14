'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Bot, 
  Check,
  Cpu, 
  Database, 
  Clock, 
  TrendingDown, 
  AlertCircle, 
  Zap,
  Target,
  Users,
  CheckCircle,
  Workflow
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import OtherServices from '@/components/OtherServices';
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const Automation = () => {
  return (
    <div className="min-h-screen bg-dikio-background">
      <main>
        {/* Header Section - Conservé */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-6 animate-fade-in">
                <div className="inline-flex items-center gap-2 rounded-full bg-dikio-accent/10 px-3 py-1 text-sm text-dikio-accent">
                  <Bot className="h-3.5 w-3.5 fill-dikio-accent" />
                  <span>Service</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                  Automatisation & <span className="gradient-text">IA</span>
                </h1>
                <p className="text-lg text-gray-600 max-w-[600px]">
                  Libérez du temps et améliorez votre efficacité grâce à des solutions d'automatisation 
                  intelligentes et des outils IA sur mesure.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/project-form">
                    <Button size="lg" className="bg-dikio-accent hover:bg-dikio-accent-light text-white font-medium">
                      Automatiser vos processus
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-dikio-accent/10 to-dikio-subtitle/10 rounded-3xl transform rotate-3 scale-105"></div>
                <div className="relative bg-white dark:bg-gray-900 rounded-3xl p-6 lg:p-8 shadow-lg">
                  <h3 className="text-xl font-semibold mb-6 text-dikio-title">Nos solutions d'automatisation</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 rounded-full bg-dikio-accent/10 p-1.5 mt-1">
                        <Check className="h-4 w-4 text-dikio-accent" />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">Automatisations marketing & internes</p>
                        <p className="text-sm text-gray-500">Via n8n, Zapier, Make et autres outils spécialisés</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 rounded-full bg-dikio-accent/10 p-1.5 mt-1">
                        <Check className="h-4 w-4 text-dikio-accent" />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">Bots et agents IA personnalisés</p>
                        <p className="text-sm text-gray-500">Solutions GPT et outils maison adaptés à vos besoins spécifiques</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 rounded-full bg-dikio-accent/10 p-1.5 mt-1">
                        <Check className="h-4 w-4 text-dikio-accent" />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">Intégration CRM et formulaires intelligents</p>
                        <p className="text-sm text-gray-500">Systèmes automatisés pour la gestion et le scoring de prospects</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 rounded-full bg-dikio-accent/10 p-1.5 mt-1">
                        <Check className="h-4 w-4 text-dikio-accent" />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">Solutions no-code et low-code</p>
                        <p className="text-sm text-gray-500">Implémentations avec Notion, Airtable, Supabase et autres plateformes</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Comparison Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-12"
            >
              <motion.h2 
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold text-dikio-paragraph mb-4"
              >
                L'IA, ce n'est pas <span className="text-dikio-accent">ChatGPT</span>
              </motion.h2>
              <motion.p 
                variants={fadeInUp}
                className="text-lg text-muted-foreground max-w-2xl mx-auto"
              >
                Outre le fait que ce n'est qu'un outil, il ne faut pas s'attendre à ce qu'il résolve tous vos problèmes.
                Nos solutions s'intègrent dans vos systèmes existants.
              </motion.p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-dikio-background p-8 rounded-2xl shadow-sm border border-gray-100"
              >
                <h3 className="text-xl font-bold text-dikio-paragraph mb-6 flex items-center gap-2">
                  <AlertCircle className="h-6 w-6 text-dikio-accent" />
                  L'IA superficielle
                </h3>
                <ul className="space-y-4">
                  {[
                    "Utilisation ponctuelle de ChatGPT",
                    "Pas d'intégration dans les processus",
                    "Résultats inconstants et non mesurables",
                    "Perte de temps en prompts répétitifs",
                    "Aucune vision stratégique"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <span className="w-2 h-2 rounded-full bg-dikio-accent mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-gradient-to-br from-dikio-subtitle/10 to-dikio-title/10 p-8 rounded-2xl border border-dikio-subtitle/20"
              >
                <h3 className="text-xl font-bold text-dikio-paragraph mb-6 flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-dikio-subtitle" />
                  L'IA stratégique
                </h3>
                <ul className="space-y-4">
                  {[
                    "Agents IA intégrés à vos workflows",
                    "Automatisations sur mesure et scalables",
                    "ROI mesurable et traçable",
                    "Gain de temps exponentiel",
                    "Vision long terme et évolutive"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-dikio-paragraph">
                      <CheckCircle className="w-5 h-5 text-dikio-subtitle mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pain Points Section */}
        <section className="py-20 bg-dikio-background">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.h2 
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold text-dikio-paragraph mb-4"
              >
                Les entreprises perdent du{' '}
                <span className="text-dikio-subtitle">temps</span>, de l'
                <span className="text-dikio-accent">argent</span> et des{' '}
                <span className="text-dikio-title">opportunités</span>
              </motion.h2>
              <motion.p 
                variants={fadeInUp}
                className="text-lg text-muted-foreground"
              >
                Car elles n'ont pas encore intégré l'IA dans leur fonctionnement.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="max-w-4xl mx-auto space-y-6"
            >
              {[
                {
                  icon: Clock,
                  title: "Tâches manuelles répétitives",
                  description: "Vos équipes passent des heures sur des tâches qui pourraient être automatisées, réduisant leur capacité à se concentrer sur la valeur ajoutée."
                },
                {
                  icon: TrendingDown,
                  title: "Manque de visibilité sur les données",
                  description: "Vos données sont éparpillées et inexploitées. Sans analyse intelligente, vous passez à côté d'insights critiques pour votre business."
                },
                {
                  icon: AlertCircle,
                  title: "Délais de réponse",
                  description: "Les processus lents et manuels créent des goulots d'étranglement qui impactent directement la satisfaction client et la compétitivité."
                },
                {
                  icon: Users,
                  title: "Friction opérationnelle",
                  description: "Le manque d'automatisation génère des erreurs humaines, des doublons et une perte d'efficacité globale dans vos équipes."
                }
              ].map((pain, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="flex gap-6 p-6 bg-white rounded-xl"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-dikio-accent/10 rounded-xl flex items-center justify-center">
                      <pain.icon className="h-6 w-6 text-dikio-accent" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-dikio-paragraph mb-2">{pain.title}</h3>
                    <p className="text-muted-foreground">{pain.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Why AI Changes Everything */}
        <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(26, 198, 157, 0.15) 0%, rgba(255, 255, 255, 0.9) 50%, rgba(240, 240, 235, 1) 100%)' }}>
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.h2 
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold text-dikio-paragraph mb-4"
              >
                Pourquoi l'IA <span className="text-dikio-subtitle">change tout</span>
              </motion.h2>
              <motion.p 
                variants={fadeInUp}
                className="text-lg text-muted-foreground max-w-3xl mx-auto"
              >
                C'est une révolution qui permet aux entreprises, quelque soit leur taille, d'atteindre des niveaux de performance et d'agilité jamais vus auparavant.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
            >
              {[
                {
                  icon: Zap,
                  title: "Vitesse exponentielle",
                  description: "Réduisez de 80% le temps consacré aux tâches répétitives et concentrez-vous sur les décisions stratégiques."
                },
                {
                  icon: Target,
                  title: "Scalabilité sans friction",
                  description: "Multipliez votre capacité de production sans multiplier vos effectifs. L'IA s'adapte à votre croissance."
                },
                {
                  icon: Database,
                  title: "Données transformées en insights",
                  description: "Transformez vos données brutes en décisions éclairées grâce à l'analyse intelligente et prédictive."
                },
                {
                  icon: Bot,
                  title: "Automatisations intelligentes",
                  description: "Des workflows qui apprennent, s'adaptent et s'améliorent continuellement sans intervention humaine."
                },
                {
                  icon: Users,
                  title: "Collaboration augmentée",
                  description: "Libérez vos équipes des tâches chronophages pour qu'elles se concentrent sur l'innovation et la stratégie."
                },
                {
                  icon: TrendingDown,
                  title: "Réduction des coûts",
                  description: "Optimisez vos ressources et réduisez vos coûts opérationnels tout en améliorant la qualité de service."
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="w-14 h-14 bg-dikio-subtitle/10 rounded-xl flex items-center justify-center mb-6">
                    <benefit.icon className="h-7 w-7 text-dikio-subtitle" />
                  </div>
                  <h3 className="text-xl font-semibold text-dikio-paragraph mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How Dikio Unlocks This Power */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.h2 
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold text-dikio-paragraph mb-4"
              >
                Comment Dikio <span className="text-dikio-subtitle">débloque cette puissance</span>
              </motion.h2>
              <motion.p 
                variants={fadeInUp}
                className="text-lg text-muted-foreground max-w-2xl mx-auto"
              >
                Nous construisons des systèmes IA sur mesure qui s'intègrent parfaitement dans vos opérations.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            >
              {[
                {
                  icon: Cpu,
                  title: "Automatisations sur mesure",
                  description: "Des workflows automatisés adaptés à vos processus métier spécifiques, pas des solutions génériques."
                },
                {
                  icon: Bot,
                  title: "Agents IA personnalisés",
                  description: "Des assistants IA formés sur vos données et votre contexte pour des résultats précis et pertinents."
                },
                {
                  icon: Database,
                  title: "Data & Opérations",
                  description: "Exploitation intelligente de vos données pour des décisions basées sur des insights concrets."
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center p-8 bg-dikio-background rounded-2xl"
                >
                  <div className="w-16 h-16 bg-dikio-subtitle/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <service.icon className="h-8 w-8 text-dikio-subtitle" />
                  </div>
                  <h3 className="text-xl font-semibold text-dikio-paragraph mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Use Cases / Workflows */}
        <section className="py-20 bg-dikio-background">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.h2 
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold text-dikio-paragraph mb-4"
              >
                Des workflows IA <span className="text-dikio-subtitle">adaptés à votre métier</span>
              </motion.h2>
              <motion.p 
                variants={fadeInUp}
                className="text-lg text-muted-foreground"
              >
                Quelques exemples de cas d'usage que nous déployons.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
            >
              {[
                {
                  title: "Bot Telegram de trading",
                  description: "Création d'un bot GPT/n8n avec analyse technique automatique, alertes Telegram et IA compagnon pour aider les traders.",
                  result: "Gain de temps considérable et décisions d'investissement plus éclairées."
                },
                {
                  title: "Gestion d'établissements médicaux",
                  description: "Mise en place d'automatisations internes et d'outils no-code pour le pilotage opérationnel des établissements.",
                  result: "Optimisation des processus et réduction de 40% du temps administratif."
                },
                {
                  title: "Service RH",
                  description: "Tri automatique des CV, pré-qualification des candidats et planification d'entretiens via agents IA.",
                  result: "Réduction de 60% du temps de recrutement."
                },
                {
                  title: "Service Commercial",
                  description: "Qualification automatique des leads, scoring et nurturing personnalisé via workflows intelligents.",
                  result: "Augmentation de 35% du taux de conversion."
                }
              ].map((useCase, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 bg-dikio-subtitle/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Workflow className="h-5 w-5 text-dikio-subtitle" />
                    </div>
                    <h3 className="text-xl font-semibold text-dikio-paragraph">{useCase.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">{useCase.description}</p>
                  <p className="text-sm text-dikio-subtitle font-medium">→ {useCase.result}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Section carrousel des autres services */}
        <OtherServices currentServicePath="/services/automation" />
        
        {/* Final CTA */}
        <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(26, 198, 157, 0.2) 0%, rgba(255, 255, 255, 0.95) 40%, rgba(255, 255, 255, 0.95) 60%, rgba(242, 97, 87, 0.15) 100%)' }}>
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center max-w-3xl mx-auto"
            >
              <motion.h2 
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold mb-4 text-dikio-paragraph"
              >
                L'IA n'est pas l'avenir.
                <br />
                <span className="text-dikio-subtitle">C'est maintenant.</span>
              </motion.h2>
              <motion.p 
                variants={fadeInUp}
                className="text-lg text-muted-foreground mb-8"
              >
                Les entreprises qui intègrent l'IA aujourd'hui créent un avantage compétitif difficile à rattraper.
                Celles qui attendent prennent du retard.
              </motion.p>
              <motion.div 
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button asChild size="lg" className="bg-dikio-accent hover:bg-dikio-accent-light text-white">
                  <Link href="/project-form">
                    Démarrer votre projet d'automatisation <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
              <motion.p 
                variants={fadeInUp}
                className="text-sm text-muted-foreground mt-6"
              >
                Une conversation simple pour démarrer. Pas de pression, pas de formulaire.
              </motion.p>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Automation;