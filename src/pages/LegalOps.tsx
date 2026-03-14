'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LegalOps = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current) return;
    const sections = pageRef.current.querySelectorAll('[data-reveal]');
    sections.forEach((el) => {
      gsap.fromTo(el, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
      });
    });
    return () => { ScrollTrigger.getAll().forEach(st => st.kill()); };
  }, []);

  const legalOpsSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Dikio LegalOps",
    "description": "Audit opérationnel indépendant pour cabinets d'avocats. Diagnostic, cartographie et cahier des charges neutre.",
    "url": "https://dikio.fr/legalops",
    "areaServed": "France",
    "serviceType": ["Audit LegalOps", "Diagnostic opérationnel", "Cahier des charges IT"],
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-dikio-background">
      <SEO jsonLd={legalOpsSchema} />

      {/* HERO */}
      <section className="pt-32 pb-20 md:pt-44 md:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-dikio-title/5 blur-[120px]" />
        </div>
        <div className="container px-4 md:px-6 max-w-4xl">
          <div className="mb-6">
            <span className="inline-block font-['JetBrains_Mono'] text-xs uppercase tracking-[0.2em] text-dikio-title border border-dikio-title/20 px-3 py-1.5 rounded-full">
              Audit LegalOps · 100% indépendant
            </span>
          </div>
          <h1 className="font-['Fraunces'] text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] mb-8 tracking-tight text-dikio-paragraph">
            Votre cabinet tourne.
            <br />
            <span className="text-dikio-accent">Mais il tourne mal.</span>
          </h1>
          <p className="text-lg md:text-xl text-dikio-paragraph/60 max-w-2xl mb-10 leading-relaxed font-['DM_Sans']">
            Outils empilés, données en silos, process manuels, heures facturables perdues. Vous êtes excellents en droit. Vos opérations, elles, sont restées en 2015.
          </p>
          <Link
            href="/legalops/demande"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-dikio-title text-white font-semibold text-base hover:bg-dikio-title/90 transition-colors duration-200"
          >
            Demander un audit LegalOps <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* SEPARATOR */}
      <div className="container px-4 md:px-6"><div className="h-px bg-dikio-title/10" /></div>

      {/* SECTION 2 — LE PROBLÈME */}
      <section className="py-20 md:py-32">
        <div className="container px-4 md:px-6 max-w-5xl">
          <div data-reveal className="mb-16">
            <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-[0.2em] text-dikio-subtitle mb-4 block">
              Le problème
            </span>
            <h2 className="font-['Fraunces'] text-3xl md:text-4xl font-semibold tracking-tight text-dikio-paragraph">
              Trois vérités que personne ne vous dit.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                number: '01',
                title: "Le temps qui disparaît",
                body: "Un avocat passe en moyenne 48% de son temps sur des tâches non-juridiques : relances, classement, recherche de documents, reporting. Chaque heure perdue est une heure non facturée.",
              },
              {
                number: '02',
                title: "Le mille-feuille numérique",
                body: "Outlook ici, un CRM là, un drive partagé, un tableur Excel pour le suivi. Cinq outils qui ne se parlent pas. Vous avez numérisé le chaos, pas les opérations.",
              },
              {
                number: '03',
                title: "Le renard dans le poulailler",
                body: "Vous demandez un diagnostic à un éditeur de logiciel ? Il va vous prescrire… son logiciel. Confier son audit à quelqu'un qui vend le remède, c'est un conflit d'intérêts.",
              },
            ].map((item) => (
              <div key={item.number} data-reveal className="group">
                <span className="font-['JetBrains_Mono'] text-sm text-dikio-subtitle/60 block mb-3">
                  {item.number}
                </span>
                <h3 className="font-['Fraunces'] text-xl font-semibold mb-4 text-dikio-paragraph">
                  {item.title}
                </h3>
                <p className="text-dikio-paragraph/60 leading-relaxed font-['DM_Sans'] text-[15px]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container px-4 md:px-6"><div className="h-px bg-dikio-title/10" /></div>

      {/* SECTION 3 — L'AUDIT */}
      <section className="py-20 md:py-32">
        <div className="container px-4 md:px-6 max-w-5xl">
          <div data-reveal className="mb-16">
            <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-[0.2em] text-dikio-subtitle mb-4 block">
              La solution
            </span>
            <h2 className="font-['Fraunces'] text-3xl md:text-4xl font-semibold tracking-tight max-w-3xl text-dikio-paragraph">
              Un audit opérationnel. Neutre. Borné. Actionnable.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-16">
            {[
              {
                label: "Ce qu'on analyse",
                items: ["Flux d'information internes", "Outils et licences en place", "Gestion documentaire et données", "Process métier et conformité (RGPD, secret professionnel)"],
              },
              {
                label: "Ce qu'on livre",
                items: ["Cartographie opérationnelle complète", "Diagnostic avec scoring par axe", "Cahier des charges neutre et objectif", "Recommandations priorisées"],
              },
              {
                label: "Ce que ça change",
                items: ["Vous décidez en connaissance de cause", "Vous négociez avec les éditeurs en position de force", "Vous gardez 100% du pouvoir de décision", "Vous arrêtez de payer pour des outils inutiles"],
              },
            ].map((col) => (
              <div key={col.label} data-reveal>
                <h3 className="font-['Fraunces'] text-lg font-semibold mb-5 text-dikio-title">
                  {col.label}
                </h3>
                <ul className="space-y-3">
                  {col.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-dikio-paragraph/60 font-['DM_Sans'] text-[15px] leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-dikio-subtitle/50 mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div data-reveal className="rounded-2xl border border-dikio-title/10 bg-white/50 backdrop-blur-sm p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
              <div className="flex-1">
                <h3 className="font-['Fraunces'] text-xl font-semibold mb-2 text-dikio-paragraph">Format de l'audit</h3>
                <p className="text-dikio-paragraph/60 font-['DM_Sans'] text-[15px] leading-relaxed">
                  2 à 3 semaines d'analyse. Restitution en personne avec le ou les associés. 
                  Le cahier des charges est le vôtre : envoyez-le à qui vous voulez. 
                  Dikio ne touche aucune commission sur les solutions recommandées.
                </p>
              </div>
              <div className="shrink-0">
                <div className="font-['JetBrains_Mono'] text-xs uppercase tracking-[0.15em] text-dikio-paragraph/40 mb-1">Durée</div>
                <div className="font-['Fraunces'] text-3xl font-semibold text-dikio-title">2–3 sem.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container px-4 md:px-6"><div className="h-px bg-dikio-title/10" /></div>

      {/* SECTION 4 — POURQUOI DIKIO */}
      <section className="py-20 md:py-32">
        <div className="container px-4 md:px-6 max-w-5xl">
          <div data-reveal className="mb-16">
            <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-[0.2em] text-dikio-subtitle mb-4 block">
              Pourquoi Dikio
            </span>
            <h2 className="font-['Fraunces'] text-3xl md:text-4xl font-semibold tracking-tight text-dikio-paragraph">
              Le médecin, pas le pharmacien.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {[
              {
                title: "Indépendant",
                body: "Aucun logiciel à vendre. Aucune commission. Aucun partenariat éditeur. Le seul intérêt de Dikio, c'est que votre cabinet fasse le bon choix.",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
              },
              {
                title: "Juridique-native",
                body: "Dikio opère au sein d'un cabinet de droit du numérique de 25+ ans. Secret professionnel, déontologie, RGPD, IA Act : on les connaît de l'intérieur, pas des présentations commerciales.",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
              },
              {
                title: "Opérationnel",
                body: "Pas des théoriciens. 9 ans de déploiement de systèmes dans le legal, la medtech, les secteurs régulés. Des process qui tournent en production, pas sur des slides.",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M11.42 15.17l-5.6-5.6a2.42 2.42 0 010-3.42l.56-.56a2.42 2.42 0 013.42 0l1.6 1.6 1.6-1.6a2.42 2.42 0 013.42 0l.56.56a2.42 2.42 0 010 3.42l-5.6 5.6z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M11.42 15.17L7 19.59m4.42-4.42L16 19.59M9 7L4 12m11-5l5 5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
              },
            ].map((pillar) => (
              <div key={pillar.title} data-reveal className="rounded-2xl border border-dikio-title/10 bg-white/50 backdrop-blur-sm p-8 hover:border-dikio-subtitle/30 hover:shadow-lg hover:shadow-dikio-subtitle/5 hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-dikio-subtitle/10 text-dikio-subtitle flex items-center justify-center mb-5">
                  {pillar.icon}
                </div>
                <h3 className="font-['Fraunces'] text-xl font-semibold mb-3 text-dikio-paragraph">{pillar.title}</h3>
                <p className="text-dikio-paragraph/60 font-['DM_Sans'] text-[15px] leading-relaxed">{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container px-4 md:px-6"><div className="h-px bg-dikio-title/10" /></div>

      {/* SECTION 5 — APRÈS L'AUDIT */}
      <section className="py-20 md:py-32">
        <div className="container px-4 md:px-6 max-w-4xl">
          <div data-reveal className="mb-12">
            <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-[0.2em] text-dikio-subtitle mb-4 block">
              Et après
            </span>
            <h2 className="font-['Fraunces'] text-3xl md:text-4xl font-semibold tracking-tight text-dikio-paragraph">
              L'audit n'est pas une fin. C'est un levier.
            </h2>
          </div>

          <div data-reveal className="space-y-0">
            {[
              { title: "Choix d'outils", desc: "Accompagnement dans la sélection de solutions, sans parti pris." },
              { title: "Déploiement & formation", desc: "Mise en place opérationnelle et montée en compétence de l'équipe." },
              { title: "Optimisation continue", desc: "Suivi post-déploiement, ajustements, itérations." },
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-6 py-6 border-b border-dikio-title/10 last:border-b-0">
                <span className="font-['JetBrains_Mono'] text-sm text-dikio-subtitle/50 mt-1 shrink-0 w-8">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-['Fraunces'] text-lg font-semibold mb-1 text-dikio-paragraph">{step.title}</h3>
                  <p className="text-dikio-paragraph/60 font-['DM_Sans'] text-[15px]">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p data-reveal className="mt-10 text-dikio-paragraph/50 font-['DM_Sans'] text-sm italic border-l-2 border-dikio-subtitle/30 pl-5">
            Tout est optionnel. Vous pouvez repartir avec votre cahier des charges et vous débrouiller. C'est ça, l'indépendance.
          </p>
        </div>
      </section>

      <div className="container px-4 md:px-6"><div className="h-px bg-dikio-title/10" /></div>

      {/* SECTION 6 — CRÉDIBILITÉ */}
      <section className="py-20 md:py-32">
        <div className="container px-4 md:px-6 max-w-5xl">
          <div data-reveal className="mb-12">
            <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-[0.2em] text-dikio-subtitle mb-4 block">
              Crédibilité
            </span>
            <h2 className="font-['Fraunces'] text-3xl md:text-4xl font-semibold tracking-tight text-dikio-paragraph">
              Ancré dans le réel juridique.
            </h2>
          </div>

          <div data-reveal className="grid sm:grid-cols-2 gap-6">
            {[
              {
                label: "Cabinet Haas Avocats",
                detail: "Adossé à un cabinet de 25+ ans spécialisé en droit du numérique (IA Act, RGPD, DSA/DMA, contrats IT).",
              },
              {
                label: "Procès fictifs pionniers",
                detail: "Co-organisation du procès fictif du véhicule autonome (2018) et de l'IA managériale (2024). Anticipation du droit, pas réaction.",
              },
              {
                label: "GEO Alliance",
                detail: "Membre fondateur de la GEO Alliance, réseau international de cabinets d'avocats spécialisés en numérique.",
              },
              {
                label: "9 ans d'opérations",
                detail: "Déploiement de systèmes en production dans le legal, la medtech et les secteurs régulés. Pas de prototypes, du réel.",
              },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-dikio-title/10 bg-white/50 backdrop-blur-sm p-6">
                <h3 className="font-['Fraunces'] text-base font-semibold mb-2 text-dikio-title">{item.label}</h3>
                <p className="text-dikio-paragraph/60 font-['DM_Sans'] text-[14px] leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container px-4 md:px-6"><div className="h-px bg-dikio-title/10" /></div>

      {/* SECTION 7 — CTA FINAL */}
      <section className="py-24 md:py-36">
        <div className="container px-4 md:px-6 max-w-3xl text-center">
          <h2 data-reveal className="font-['Fraunces'] text-3xl md:text-5xl font-semibold tracking-tight mb-6 leading-tight text-dikio-paragraph">
            Arrêtez de deviner.
            <br />
            <span className="text-dikio-accent">Décidez.</span>
          </h2>
          <p data-reveal className="text-dikio-paragraph/60 font-['DM_Sans'] text-lg mb-10 max-w-xl mx-auto">
            Un diagnostic indépendant pour reprendre le contrôle de vos opérations. Sans engagement, sans logiciel à acheter.
          </p>
          <div data-reveal>
            <Link
              href="/legalops/demande"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-dikio-title text-white font-semibold text-base hover:bg-dikio-title/90 transition-colors duration-200"
            >
              Demander un audit LegalOps <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <p data-reveal className="mt-8 font-['JetBrains_Mono'] text-xs text-dikio-paragraph/40">
            Ou écrivez directement à{' '}
            <a href="mailto:gary.h@dikio.fr" className="text-dikio-subtitle hover:underline">
              gary.h@dikio.fr
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default LegalOps;
