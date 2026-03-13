import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Unplug,
  Cog,
  Brain,
  BarChart3,
  ArrowRight,
  Check,
  ShieldCheck,
  Wallet,
  Lock,
  Wrench,
  Users,
  LineChart,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ─── Data ────────────────────────────────────────────────────────────────────

const problems = [
  {
    icon: Lock,
    title: 'Prisonnier de vos abonnements',
    desc: 'Vous payez 5, 6, 7 SaaS différents qui ne communiquent pas entre eux. Booking, CRM, mailing, réseaux : chacun prend sa part. Vous êtes locataire de vos propres données.',
  },
  {
    icon: Wallet,
    title: 'Un budget qui s\'évapore',
    desc: '300€/mois ici, 80€ là, 50€ encore là. Aucun de ces outils n\'est taillé pour votre salle. Vous payez des fonctionnalités que vous n\'utilisez pas.',
  },
  {
    icon: Unplug,
    title: 'Aucune vision d\'ensemble',
    desc: 'Vos données sont éparpillées dans 6 outils. Impossible de savoir ce qui marche vraiment. Vous pilotez à l\'instinct au lieu de piloter aux données.',
  },
];

const pillars = [
  {
    num: '01',
    icon: Wrench,
    title: 'Vos outils, sur mesure',
    desc: 'On construit votre écosystème digital : booking, CRM, site, automatisation. Tout interconnecté, tout à vous. Pas de licence mensuelle qui gonfle.',
  },
  {
    num: '02',
    icon: Brain,
    title: 'IA intégrée à votre quotidien',
    desc: 'Relances automatiques des prospects, détection des membres en décrochage, contenu réseaux généré. L\'IA travaille pendant que vous coachez.',
  },
  {
    num: '03',
    icon: LineChart,
    title: 'Vision stratégique business',
    desc: 'On ne pose pas des outils au hasard. On structure votre stratégie d\'acquisition, rétention et fidélisation avec des objectifs mesurables.',
  },
  {
    num: '04',
    icon: ShieldCheck,
    title: 'Indépendance totale',
    desc: 'Tout vous appartient. Vos données, vos outils, votre code. Si on arrête de travailler ensemble demain, tout reste chez vous.',
  },
];

const steps = [
  { num: '01', color: '#F97316', label: 'Diagnostic', timing: 'Semaine 1', desc: 'On cartographie vos outils actuels, vos coûts SaaS, vos flux et vos points de fuite.' },
  { num: '02', color: '#EAB308', label: 'Architecture', timing: 'Semaines 2–3', desc: 'On conçoit votre système : quels outils garder, quels outils remplacer, quels automatismes créer.' },
  { num: '03', color: '#FAFAFA', label: 'Déploiement', timing: 'Semaines 3–5', desc: 'On construit et connecte tout. Migration des données. Formation de votre équipe.' },
  { num: '04', color: '#F97316', label: 'Pilotage', timing: 'Mois 2+', desc: 'On suit les KPIs ensemble, on ajuste les automatismes et on optimise en continu.' },
];

const offers = [
  {
    name: 'Fondation',
    subtitle: 'Reprendre le contrôle',
    price: 'Sur devis',
    highlight: false,
    features: [
      'Audit complet de votre stack SaaS',
      'Site vitrine + booking intégré',
      'CRM simple sur mesure',
      'Migration de vos données',
      'Formation à vos nouveaux outils',
    ],
  },
  {
    name: 'Accélération',
    subtitle: 'Croissance pilotée par l\'IA',
    price: 'Sur devis',
    highlight: true,
    features: [
      'Tout Fondation inclus',
      'Automatisation acquisition + relances',
      'Contenu réseaux assisté par IA',
      'Tableau de bord unifié',
      'Suivi stratégique bi-mensuel',
    ],
  },
  {
    name: 'Autonomie',
    subtitle: 'L\'écosystème complet',
    price: 'Sur mesure',
    highlight: false,
    features: [
      'Tout Accélération inclus',
      'App mobile ou portail membres',
      'IA rétention & prédiction churn',
      'Intégration paiement & facturation',
      'Accompagnement stratégique continu',
    ],
  },
];

const faq = [
  {
    q: 'En quoi c\'est différent d\'un Mindbody ou d\'un Gymlib ?',
    a: 'Ces plateformes vous louent un outil standard. Vous n\'avez pas la main sur vos données, vous payez chaque mois, et le jour où vous partez, vous repartez de zéro. Nous, on construit VOS outils, adaptés à VOTRE salle. Et tout vous appartient.',
  },
  {
    q: 'Je n\'ai pas de compétences techniques, c\'est un problème ?',
    a: 'C\'est justement le but. On conçoit des outils simples à utiliser. On forme votre équipe. Et on reste disponible pour les ajustements. Vous gérez votre salle, on gère la tech.',
  },
  {
    q: 'Combien je vais économiser par rapport à mes abonnements actuels ?',
    a: 'En moyenne, nos clients réduisent leurs coûts SaaS de 40 à 70% sur 12 mois. L\'investissement initial est rentabilisé entre le 4ᵉ et le 6ᵉ mois.',
  },
  {
    q: 'Et si ça ne fonctionne pas, je perds tout ?',
    a: 'Non. Tout ce qu\'on construit est à vous : le code, les données, les automatismes. Si on arrête de collaborer, votre système continue de tourner. C\'est le principe même de l\'indépendance.',
  },
  {
    q: 'Combien de temps pour tout mettre en place ?',
    a: 'Le setup initial prend 3 à 5 semaines selon la complexité. Vous êtes opérationnel rapidement, et on continue d\'optimiser ensuite.',
  },
];

const saasComparison = [
  { name: 'Booking / Planning', saas: '~80€/mois', gymops: 'Inclus, intégré' },
  { name: 'CRM / Suivi membres', saas: '~60€/mois', gymops: 'Sur mesure, à vous' },
  { name: 'Email marketing', saas: '~40€/mois', gymops: 'Automatisé par IA' },
  { name: 'Site web', saas: '~30€/mois', gymops: 'Le vôtre, sans abonnement' },
  { name: 'Réseaux sociaux', saas: '~50€/mois', gymops: 'IA intégrée' },
  { name: 'Analytics', saas: '~30€/mois', gymops: 'Dashboard unifié' },
];

// ─── Component ───────────────────────────────────────────────────────────────

const GymOps = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero title word stagger
      gsap.from('.gymops-word', {
        opacity: 0,
        y: 40,
        skewY: 4,
        stagger: 0.08,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.2,
      });

      gsap.from('.gymops-badge', { opacity: 0, y: -16, duration: 0.6, delay: 0.1 });
      gsap.from('.gymops-sub', { opacity: 0, y: 20, duration: 0.7, delay: 0.8 });
      gsap.from('.gymops-ctas', { opacity: 0, y: 20, duration: 0.7, delay: 1.0 });

      // Savings counter
      if (counterRef.current) {
        const counter = { val: 0 };
        gsap.to(counter, {
          val: 70,
          duration: 1.8,
          delay: 1.2,
          ease: 'power2.out',
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = `-${Math.round(counter.val)}%`;
            }
          },
        });
      }

      // Problem cards
      gsap.from('.problem-card', {
        scrollTrigger: { trigger: '.problems-section', start: 'top 75%' },
        opacity: 0, y: 50, skewY: 3, stagger: 0.15, duration: 0.8, ease: 'power3.out',
      });

      // Comparison table
      gsap.from('.comparison-row', {
        scrollTrigger: { trigger: '.comparison-section', start: 'top 75%' },
        opacity: 0, x: -30, stagger: 0.08, duration: 0.6, ease: 'power2.out',
      });

      // Pillar cards
      gsap.from('.pillar-num', {
        scrollTrigger: { trigger: '.pillars-section', start: 'top 70%' },
        opacity: 0, scale: 0.5, stagger: 0.12, duration: 1, ease: 'back.out(1.7)',
      });
      gsap.from('.pillar-card', {
        scrollTrigger: { trigger: '.pillars-section', start: 'top 70%' },
        opacity: 0, y: 30, stagger: 0.12, duration: 0.7, ease: 'power2.out',
      });

      // Timeline
      if (progressLineRef.current) {
        gsap.from(progressLineRef.current, {
          scrollTrigger: { trigger: '.timeline-section', start: 'top 65%' },
          scaleX: 0, transformOrigin: 'left center', duration: 1.4, ease: 'power2.inOut',
        });
      }
      gsap.from('.step-card', {
        scrollTrigger: { trigger: '.timeline-section', start: 'top 65%' },
        opacity: 0, y: 30, stagger: 0.18, duration: 0.7, ease: 'power2.out', delay: 0.3,
      });

      // Offers
      gsap.from('.offer-card', {
        scrollTrigger: { trigger: '.offers-section', start: 'top 75%' },
        opacity: 0, y: 40, stagger: 0.15, duration: 0.8, ease: 'power3.out',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} style={{ backgroundColor: '#0A0A0A', color: '#FAFAFA' }} className="min-h-screen font-sans">
      <SEO
        title="GymOps | Indépendance digitale pour salles de fitness"
        description="Arrêtez de payer 7 SaaS. On construit vos propres outils : booking, CRM, automatisation IA. Tout vous appartient. Pour les gérants de salles indépendants."
        keywords="outils salle de sport, indépendance digitale fitness, alternative mindbody, CRM gym sur mesure, automatisation salle de sport"
        url="https://dikio.fr/gym-ops"
      />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-20">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(249,115,22,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(249,115,22,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)' }}
        />

        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-5xl">
            <div className="gymops-badge inline-flex items-center gap-2 mb-8">
              <span
                className="text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full"
                style={{ backgroundColor: 'rgba(249,115,22,0.15)', color: '#F97316', border: '1px solid rgba(249,115,22,0.3)' }}
              >
                Indépendance Digitale · Salles de Fitness
              </span>
            </div>

            <h1 className="mb-6" style={{ fontFamily: 'Fraunces, serif' }}>
              <div className="overflow-hidden mb-2">
                {'Vous payez 7 abonnements.'.split(' ').map((word, i) => (
                  <span key={i} className="gymops-word inline-block mr-[0.25em]"
                    style={{ fontSize: 'clamp(2.4rem, 5.5vw, 5rem)', lineHeight: 1.1, fontWeight: 700, color: '#FAFAFA' }}>
                    {word}
                  </span>
                ))}
              </div>
              <div className="overflow-hidden mb-2">
                {'Aucun ne vous appartient.'.split(' ').map((word, i) => (
                  <span key={i} className="gymops-word inline-block mr-[0.25em]"
                    style={{ fontSize: 'clamp(2.4rem, 5.5vw, 5rem)', lineHeight: 1.1, fontWeight: 700, color: '#9CA3AF' }}>
                    {word}
                  </span>
                ))}
              </div>
              <div className="overflow-hidden">
                {'On change ça.'.split(' ').map((word, i) => (
                  <span key={i} className="gymops-word inline-block mr-[0.25em]"
                    style={{ fontSize: 'clamp(2.4rem, 5.5vw, 5rem)', lineHeight: 1.1, fontWeight: 700, color: '#F97316' }}>
                    {word}
                  </span>
                ))}
              </div>
            </h1>

            <p className="gymops-sub max-w-2xl text-lg mb-10" style={{ color: '#9CA3AF', lineHeight: 1.7 }}>
              On construit vos propres outils digitaux : booking, CRM, automatisation, IA. Taillés pour votre salle, connectés entre eux, et qui vous appartiennent. Plus de dépendance. Plus d'abonnements qui s'empilent.
            </p>

            <div className="gymops-ctas flex flex-wrap gap-4 mb-16">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold transition-all duration-300"
                style={{ backgroundColor: '#F97316', color: '#0A0A0A' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#ea6a0a')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#F97316')}
              >
                Reprendre le contrôle <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#methode"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold transition-all duration-300"
                style={{ border: '1px solid rgba(249,115,22,0.4)', color: '#F97316' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(249,115,22,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                Voir la méthode
              </a>
            </div>

            <div className="inline-flex flex-col px-8 py-5 rounded-2xl"
              style={{ backgroundColor: '#111111', border: '1px solid rgba(249,115,22,0.2)' }}>
              <span ref={counterRef} className="text-5xl font-bold"
                style={{ fontFamily: 'Fraunces, serif', color: '#F97316' }}>
                -0%
              </span>
              <span className="text-sm mt-1" style={{ color: '#9CA3AF' }}>
                de coûts SaaS en moyenne sur 12 mois
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── LE PROBLÈME ── */}
      <section className="problems-section py-24" style={{ backgroundColor: '#111111' }}>
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mb-16">
            <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: '#F97316' }}>
              Le piège du tout-SaaS
            </p>
            <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 700, lineHeight: 1.15 }}>
              Plus vous grandissez, plus vous êtes dépendant.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {problems.map((p, i) => {
              const Icon = p.icon;
              return (
                <div key={i} className="problem-card p-8 rounded-2xl flex flex-col gap-5 transition-all duration-300"
                  style={{ backgroundColor: '#1A1A1A', border: '1px solid rgba(255,255,255,0.06)' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(249,115,22,0.3)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(249,115,22,0.12)' }}>
                    <Icon className="w-6 h-6" style={{ color: '#F97316' }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{p.title}</h3>
                    <p className="leading-relaxed" style={{ color: '#9CA3AF' }}>{p.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── COMPARAISON SaaS vs GymOps ── */}
      <section className="comparison-section py-24" style={{ backgroundColor: '#0A0A0A' }}>
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mb-16">
            <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: '#F97316' }}>
              Le vrai calcul
            </p>
            <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 700, lineHeight: 1.15 }}>
              Ce que vous payez aujourd'hui vs ce qu'on construit pour vous.
            </h2>
          </div>

          <div className="max-w-3xl">
            {/* Header */}
            <div className="grid grid-cols-3 gap-4 pb-4 mb-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <span className="text-sm font-semibold" style={{ color: '#9CA3AF' }}>Besoin</span>
              <span className="text-sm font-semibold text-center" style={{ color: '#EF4444' }}>SaaS classique</span>
              <span className="text-sm font-semibold text-center" style={{ color: '#F97316' }}>GymOps</span>
            </div>
            {saasComparison.map((row, i) => (
              <div key={i} className="comparison-row grid grid-cols-3 gap-4 py-4"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <span className="text-sm font-medium">{row.name}</span>
                <span className="text-sm text-center line-through" style={{ color: '#EF4444' }}>{row.saas}</span>
                <span className="text-sm text-center font-semibold" style={{ color: '#F97316' }}>{row.gymops}</span>
              </div>
            ))}
            <div className="grid grid-cols-3 gap-4 pt-6 mt-2" style={{ borderTop: '2px solid rgba(249,115,22,0.3)' }}>
              <span className="font-bold">Total mensuel</span>
              <span className="text-center font-bold" style={{ color: '#EF4444' }}>~290€/mois</span>
              <span className="text-center font-bold" style={{ color: '#F97316' }}>0€/mois*</span>
            </div>
            <p className="mt-4 text-xs" style={{ color: '#6B7280' }}>
              *Après investissement initial. Vos outils vous appartiennent, pas de frais récurrents de licence.
            </p>
          </div>
        </div>
      </section>

      {/* ── CE QU'ON CONSTRUIT ── */}
      <section className="pillars-section py-24" style={{ backgroundColor: '#111111' }}>
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mb-16">
            <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: '#F97316' }}>
              Notre approche
            </p>
            <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 700, lineHeight: 1.15 }}>
              On ne vous vend pas un outil.<br />
              <span style={{ color: '#F97316' }}>On construit le vôtre.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <div key={i} className="pillar-card relative overflow-hidden p-8 rounded-2xl"
                  style={{ backgroundColor: '#1A1A1A', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <span className="pillar-num absolute top-0 right-4 font-bold select-none pointer-events-none"
                    style={{ fontFamily: 'Fraunces, serif', fontSize: '8rem', lineHeight: 1, color: 'rgba(249,115,22,0.06)' }}>
                    {p.num}
                  </span>
                  <div className="relative z-10 flex flex-col gap-4">
                    <div className="w-11 h-11 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(249,115,22,0.12)' }}>
                      <Icon className="w-5 h-5" style={{ color: '#F97316' }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{p.title}</h3>
                      <p style={{ color: '#9CA3AF', lineHeight: 1.7 }}>{p.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── MÉTHODE ── */}
      <section id="methode" className="timeline-section py-24" style={{ backgroundColor: '#0A0A0A' }}>
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mb-16">
            <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: '#F97316' }}>
              Comment ça se passe
            </p>
            <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 700, lineHeight: 1.15 }}>
              De dépendant à autonome en 5 semaines.
            </h2>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-10 left-0 right-0 h-px" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }} />
            <div ref={progressLineRef} className="hidden md:block absolute top-10 left-0 right-0 h-px"
              style={{ backgroundColor: '#F97316', transformOrigin: 'left center' }} />

            <div className="grid md:grid-cols-4 gap-8">
              {steps.map((s, i) => (
                <div key={i} className="step-card relative pt-0 md:pt-20">
                  <div className="hidden md:block absolute top-0 left-0 w-[18px] h-[18px] rounded-full border-2"
                    style={{ backgroundColor: '#0A0A0A', borderColor: s.color, transform: 'translateY(-9px)' }} />
                  <div className="flex items-start gap-4 md:flex-col md:gap-3">
                    <span className="text-4xl font-bold shrink-0"
                      style={{ fontFamily: 'Fraunces, serif', color: s.color }}>
                      {s.num}
                    </span>
                    <div>
                      <span className="text-lg font-bold block mb-1">{s.label}</span>
                      <p className="text-xs font-medium mb-2" style={{ color: s.color }}>{s.timing}</p>
                      <p className="text-sm leading-relaxed" style={{ color: '#9CA3AF' }}>{s.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── OFFRES ── */}
      <section className="offers-section py-24" style={{ backgroundColor: '#111111' }}>
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mb-16">
            <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: '#F97316' }}>
              Les formules
            </p>
            <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 700, lineHeight: 1.15 }}>
              Choisissez votre niveau d'indépendance.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {offers.map((o, i) => (
              <div key={i} className="offer-card relative flex flex-col p-8 rounded-2xl transition-all duration-300"
                style={{
                  backgroundColor: o.highlight ? '#1A1A1A' : '#0A0A0A',
                  border: o.highlight ? '1px solid rgba(249,115,22,0.5)' : '1px solid rgba(255,255,255,0.06)',
                }}>
                {o.highlight && (
                  <div className="absolute -top-3 left-8 px-4 py-1 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: '#F97316', color: '#0A0A0A' }}>
                    Recommandé
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-1" style={{ fontFamily: 'Fraunces, serif' }}>{o.name}</h3>
                  <p className="text-sm" style={{ color: '#9CA3AF' }}>{o.subtitle}</p>
                </div>
                <div className="mb-8">
                  <span className="text-lg font-semibold" style={{ color: o.highlight ? '#F97316' : '#FAFAFA' }}>
                    {o.price}
                  </span>
                </div>
                <ul className="space-y-3 flex-1">
                  {o.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-3 text-sm" style={{ color: '#D1D5DB' }}>
                      <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#F97316' }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/project-form"
                  className="mt-8 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300"
                  style={o.highlight
                    ? { backgroundColor: '#F97316', color: '#0A0A0A' }
                    : { border: '1px solid rgba(249,115,22,0.4)', color: '#F97316' }}
                  onMouseEnter={e => {
                    if (o.highlight) e.currentTarget.style.backgroundColor = '#ea6a0a';
                    else e.currentTarget.style.backgroundColor = 'rgba(249,115,22,0.1)';
                  }}
                  onMouseLeave={e => {
                    if (o.highlight) e.currentTarget.style.backgroundColor = '#F97316';
                    else e.currentTarget.style.backgroundColor = 'transparent';
                  }}>
                  Démarrer un projet <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24" style={{ backgroundColor: '#0A0A0A' }}>
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="mb-12">
              <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: '#F97316' }}>
                Questions fréquentes
              </p>
              <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, lineHeight: 1.2 }}>
                Ce qu'on nous demande souvent.
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              {faq.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`}
                  className="rounded-xl overflow-hidden px-6"
                  style={{ backgroundColor: '#1A1A1A', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <AccordionTrigger className="py-5 text-left font-semibold hover:no-underline"
                    style={{ color: '#FAFAFA' }}>
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent style={{ color: '#9CA3AF', lineHeight: 1.7 }}>
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="relative py-28 overflow-hidden" style={{ backgroundColor: '#111111' }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px',
          }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 70%)' }} />

        <div className="container px-4 md:px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <p className="text-sm font-semibold tracking-widest uppercase mb-6" style={{ color: '#F97316' }}>
              Prêt à reprendre le contrôle ?
            </p>
            <h2 className="mb-6 mx-auto max-w-3xl"
              style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 1.1 }}>
              Votre salle, vos outils,<br />
              <span style={{ color: '#F97316' }}>votre indépendance.</span>
            </h2>
            <p className="mb-10 max-w-xl mx-auto text-lg" style={{ color: '#9CA3AF' }}>
              30 minutes pour auditer votre stack actuel et voir ce qu'on peut construire ensemble. Sans engagement.
            </p>
            <Link to="/contact"
              className="inline-flex items-center gap-2 px-8 py-5 rounded-full font-bold text-lg transition-all duration-300"
              style={{ backgroundColor: '#F97316', color: '#0A0A0A' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#ea6a0a')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#F97316')}>
              Reprendre le contrôle <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default GymOps;
