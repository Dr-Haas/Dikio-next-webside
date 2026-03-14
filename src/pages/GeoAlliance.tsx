'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  TrendingDown, EyeOff, DollarSign, Clock, BarChart3, Shield,
  Zap, Globe, Lock, FileText, Link2, Activity, ArrowRight,
  Check, X, ChevronRight, Sparkles, Users, Star, Award
} from 'lucide-react';

// ── Animated Counter ──
const AnimatedCounter = ({ target, suffix = '', duration = 2000 }: { target: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// ── Helpers ──
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }),
};

const GeoAlliance = () => {
  const [mobileNav, setMobileNav] = useState(false);

  const navLinks = [
    { label: 'Le Problème', href: '#probleme' },
    { label: 'Démonstration', href: '#demo' },
    { label: 'La Communauté', href: '#communaute' },
    { label: 'Offres', href: '#offres' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-dikio-background text-[#1a1a1a] overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Grain overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />

      {/* ── 1. NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-dikio-background/80 border-b border-[#2ab191]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Link href="/">
              <img src="/images/771a8b36-282b-42f2-8437-f98e84fc4d05.png" alt="Dikio" className="h-16 object-contain" />
            </Link>
            <span className="text-[#2ab191] font-semibold text-lg tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>GEO Alliance</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className="text-sm text-[#3a3a3a] hover:text-[#2ab191] transition-colors">{l.label}</a>
            ))}
          </div>
          <button className="md:hidden text-[#3a3a3a]" onClick={() => setMobileNav(!mobileNav)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileNav ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
          </button>
        </div>
        {mobileNav && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="md:hidden bg-dikio-background/95 border-t border-[#2ab191]/10 px-4 pb-4">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMobileNav(false)} className="block py-3 text-[#3a3a3a] hover:text-[#2ab191] transition-colors border-b border-[#2ab191]/10 last:border-0">{l.label}</a>
            ))}
          </motion.div>
        )}
      </nav>

      {/* ── 2. HERO ── */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(42,177,145,0.12)_0%,_transparent_70%)]" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#2ab191]/30 bg-[#2ab191]/10 mb-8">
            <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3edbb3] opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-[#2ab191]" /></span>
            <span className="text-sm text-[#1a7a63]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Programme exclusif · 15 cabinets en Île-de-France</span>
          </motion.div>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1} className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-[#1a1a1a]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Votre cabinet cité par <em className="text-[#2ab191] not-italic" style={{ fontStyle: 'italic' }}>ChatGPT</em>.<br />Pas celui d'en face.
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2} className="text-lg text-[#4a4a4a] max-w-3xl mx-auto mb-12">
            Les clients ne cherchent plus un avocat sur Google. Ils le demandent à l'IA. GEO Alliance positionne votre cabinet comme la réponse que les intelligences artificielles recommandent.
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3} className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-0 sm:divide-x sm:divide-[#2ab191]/20">
            {[
              { val: '80%', desc: "des utilisateurs IA ne cliquent plus sur un lien web" },
              { val: '60%', desc: "des recherches s'arrêtent à la réponse IA" },
              { val: '23,6%', desc: "des requêtes juridiques déclenchent une réponse IA" },
            ].map((s, i) => (
              <div key={i} className="sm:px-8 text-center">
                <div className="text-3xl font-bold text-[#2ab191]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{s.val}</div>
                <div className="text-sm text-[#5a5a5a] mt-1 max-w-[200px]">{s.desc}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 3. LE PROBLÈME ── */}
      <section id="probleme" className="py-24 px-4 relative bg-dikio-title overflow-hidden">
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(0,0,0,0.15)_0%,_transparent_60%)]" />
        
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#3edbb3]"
            style={{ top: `${15 + i * 15}%`, left: `${10 + i * 14}%` }}
            animate={{ y: [0, -20, 0], opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
          />
        ))}

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={fadeUp} custom={0}>
            <span className="text-xs uppercase tracking-[0.2em] text-white/50" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Le Constat</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4 text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Le SEO ne suffit plus. L'IA a changé les règles.</h2>
            <p className="text-white/70 max-w-2xl mb-10">Le comportement de recherche a basculé. Les utilisateurs posent des questions à ChatGPT, Perplexity et Gemini, et ils font confiance à la réponse.</p>
          </motion.div>

          {/* Live counter strip */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.1}
            className="grid grid-cols-3 gap-4 mb-14 p-6 rounded-2xl bg-white/[0.06] backdrop-blur-sm border border-white/10">
            {[
              { target: 25, suffix: '%', label: 'Chute du trafic organique d\'ici 2026', source: 'Bain & Company' },
              { target: 80, suffix: '%', label: 'des utilisateurs IA ne cliquent plus sur un lien', source: 'SparkToro 2024' },
              { target: 60, suffix: '%', label: 'des recherches s\'arrêtent à la réponse IA', source: 'Gartner' },
            ].map((stat, i) => (
              <motion.div key={i} className="text-center group cursor-default"
                whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
                <div className="text-3xl sm:text-4xl font-bold text-[#3edbb3]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                </div>
                <div className="text-xs text-white/60 mt-2 leading-tight">{stat.label}</div>
                <div className="text-[10px] text-white/30 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{stat.source}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Interactive problem cards */}
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { icon: TrendingDown, title: 'Le trafic organique s\'effondre', desc: 'Selon Bain & Company, le trafic organique va chuter de 15 à 25% d\'ici 2026. Les clics disparaissent au profit des réponses IA directes.', accent: '#ff6b6b' },
              { icon: EyeOff, title: 'Invisible = Inexistant', desc: 'Si votre cabinet n\'est pas cité par l\'IA, vous n\'existez pas pour la prochaine génération de clients qui ne scrollera jamais Google.', accent: '#ffa94d' },
              { icon: DollarSign, title: 'Le SEO classique coûte une fortune', desc: 'Un positionnement SEO sérieux pour un cabinet coûte entre 120 000€ et 150 000€ par an, sans garantie de résultat face aux réponses IA.', accent: '#ffd43b' },
              { icon: Clock, title: 'L\'avantage du premier arrivé', desc: 'Les premiers positionnés verrouillent les réponses IA. Pour les retardataires, le coût sera 3× plus élevé, s\'il reste des places.', accent: '#3edbb3' },
            ].map((c, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.12}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group relative p-6 rounded-2xl bg-white/[0.05] backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 cursor-default overflow-hidden">
                {/* Glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle at 30% 30%, ${c.accent}15, transparent 70%)` }} />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${c.accent}20` }}>
                      <c.icon className="w-5 h-5" style={{ color: c.accent }} />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{c.title}</h3>
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed group-hover:text-white/75 transition-colors">{c.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Urgency CTA bar */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.5}
            className="mt-12 p-5 rounded-2xl bg-[#3edbb3]/10 border border-[#3edbb3]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-3 h-3 rounded-full bg-[#3edbb3]" />
              <p className="text-sm text-white/80">
                <span className="font-semibold text-[#3edbb3]">12 places déjà réservées</span> sur 15 disponibles en Île-de-France
              </p>
            </div>
            <a href="#offres" className="text-sm font-medium text-[#3edbb3] hover:text-white transition-colors flex items-center gap-1 group/cta">
              Vérifier la disponibilité <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── 4. DÉMONSTRATION ── */}
      <section id="demo" className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(42,177,145,0.1)_0%,_transparent_60%)]" />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <span className="text-xs uppercase tracking-[0.2em] text-[#2ab191]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Démonstration</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-12 text-[#1a1a1a]" style={{ fontFamily: "'Playfair Display', serif" }}>Quand un client pose la question à l'IA.</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Sans GEO */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="rounded-2xl border border-[#1a1a1a]/10 bg-[#1a1a1a] overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-[#222] border-b border-white/10">
                <span className="w-3 h-3 rounded-full bg-[#ff5f57]" /><span className="w-3 h-3 rounded-full bg-[#ffbd2e]" /><span className="w-3 h-3 rounded-full bg-[#28c840]" />
                <span className="ml-2 text-xs text-[#999]">ChatGPT</span>
              </div>
              <div className="p-6 space-y-4 text-sm">
                <div className="bg-[#333] rounded-xl px-4 py-3 max-w-[80%] ml-auto text-white">Quel est le meilleur cabinet d'avocat en droit du numérique à Paris ?</div>
                <div className="bg-[#222] rounded-xl px-4 py-3">
                  <p className="text-[#ccc] mb-3">Voici les cabinets les plus reconnus en droit du numérique à Paris :</p>
                  <ol className="text-[#ccc] space-y-1 list-decimal list-inside">
                    <li>Lexing Alain Bensoussan</li>
                    <li>Haas Avocats</li>
                    <li>Cabinet Nouveau Monde Avocats</li>
                    <li>DJS Avocats</li>
                  </ol>
                  <p className="text-red-400 mt-3 text-xs font-medium">❌ Votre cabinet n'apparaît pas ici.</p>
                </div>
              </div>
              <div className="px-6 pb-4 text-center"><span className="text-xs text-red-400 font-medium">❌ Sans GEO Alliance</span></div>
            </motion.div>
            {/* Avec GEO */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.2} className="rounded-2xl border border-[#2ab191]/30 bg-[#1a1a1a] overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-[#222] border-b border-[#2ab191]/20">
                <span className="w-3 h-3 rounded-full bg-[#ff5f57]" /><span className="w-3 h-3 rounded-full bg-[#ffbd2e]" /><span className="w-3 h-3 rounded-full bg-[#28c840]" />
                <span className="ml-2 text-xs text-[#999]">ChatGPT</span>
              </div>
              <div className="p-6 space-y-4 text-sm">
                <div className="bg-[#333] rounded-xl px-4 py-3 max-w-[80%] ml-auto text-white">Quel est le meilleur cabinet d'avocat en droit du numérique à Paris ?</div>
                <div className="bg-[#222] rounded-xl px-4 py-3">
                  <p className="text-[#ccc] mb-3">Voici les cabinets les plus reconnus en droit du numérique à Paris :</p>
                  <ol className="text-[#ccc] space-y-1 list-decimal list-inside">
                    <li>Lexing Alain Bensoussan</li>
                    <li className="text-[#3edbb3] font-semibold">[Votre Cabinet] ✓</li>
                    <li>Haas Avocats</li>
                    <li>Cabinet Nouveau Monde Avocats</li>
                  </ol>
                </div>
              </div>
              <div className="px-6 pb-4 text-center"><span className="text-xs text-[#3edbb3] font-medium">✓ Avec GEO Alliance by Dikio</span></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 5. COMPARAISON SEO vs GEO ── */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <span className="text-xs uppercase tracking-[0.2em] text-[#2ab191]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>SEO vs GEO</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-12 text-[#1a1a1a]" style={{ fontFamily: "'Playfair Display', serif" }}>Pourquoi le GEO est l'évolution naturelle du SEO.</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.2} className="rounded-2xl border border-[#2ab191]/20 overflow-hidden bg-white/50 shadow-sm">
            <div className="grid grid-cols-3 text-sm">
              <div className="p-4 bg-[#2ab191]/5 font-semibold border-b border-[#2ab191]/10 text-[#1a1a1a]">Critère</div>
              <div className="p-4 bg-[#2ab191]/5 font-semibold border-b border-[#2ab191]/10 text-center text-[#5a5a5a]">SEO</div>
              <div className="p-4 bg-[#2ab191]/10 font-semibold border-b border-[#2ab191]/20 text-center text-[#2ab191]">GEO</div>
              {[
                ['Où vous apparaissez', 'Pages de résultats Google', 'Réponses IA (ChatGPT, Perplexity, Gemini)'],
                ['Comportement utilisateur', 'Clique sur un lien parmi 10', 'Fait confiance à la recommandation IA'],
                ['Budget annuel', '120-150K€/an', '60K€/an (Alliance)'],
                ['Couverture', 'Google uniquement', 'Tous les LLM simultanément'],
                ['Effet réseau', 'Aucun', 'Citations croisées entre 15 cabinets'],
                ['Protection concurrentielle', 'Faible (tout le monde peut se positionner)', 'Forte (places limitées à 15)'],
                ['Durabilité', 'Instable (algorithmes changeants)', 'Stable (autorité éditoriale cumulative)'],
              ].map(([crit, seo, geo], i) => (
                <React.Fragment key={i}>
                  <div className="p-4 border-b border-[#2ab191]/10 text-[#1a1a1a]">{crit}</div>
                  <div className="p-4 border-b border-[#2ab191]/10 text-center text-[#5a5a5a]">{seo}</div>
                  <div className="p-4 border-b border-[#2ab191]/10 text-center text-[#3a3a3a] bg-[#2ab191]/[0.05]">{geo}</div>
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 6. LA COMMUNAUTÉ ── */}
      <section id="communaute" className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(42,177,145,0.1)_0%,_transparent_60%)]" />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <span className="text-xs uppercase tracking-[0.2em] text-[#2ab191]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>La Force du Réseau</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4 text-[#1a1a1a]" style={{ fontFamily: "'Playfair Display', serif" }}>15 cabinets. Une alliance. Une domination collective.</h2>
            <p className="text-[#4a4a4a] max-w-2xl mb-12">Un cabinet seul à 10K/mois a une voix. Nos 15 cabinets ont 15 voix qui se renforcent mutuellement.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { n: '01', title: 'Citations croisées', desc: 'La même logique que le PageRank de Google, appliquée aux réponses IA. Chaque mention renforce les autres.' },
              { n: '02', title: 'Mutualisation des coûts', desc: 'Un article Forbes à 10 000€ partagé entre 4 cabinets = 2 500€ chacun pour une visibilité premium.' },
              { n: '03', title: 'Exclusivité garantie', desc: '1 seul cabinet par spécialité et par zone géographique. Votre position est protégée.' },
              { n: '04', title: 'Publications premium', desc: 'Presse juridique, médias nationaux, sites à haute autorité : les sources que les IA considèrent comme fiables.' },
              { n: '05', title: 'Backlinks stratégiques', desc: 'Un maillage mutualisé de liens entre les publications de l\'Alliance, renforçant l\'autorité de chaque cabinet.' },
              { n: '06', title: 'Monitoring IA continu', desc: 'Rapports mensuels sur votre positionnement dans ChatGPT, Perplexity, Gemini et Google AI Overview.' },
            ].map((f, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.1}
                className="relative p-6 rounded-2xl border border-[#2ab191]/15 bg-white/60 hover:border-[#2ab191]/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden shadow-sm">
                <div className="absolute top-4 right-4 text-5xl font-bold text-[#2ab191]/[0.07]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{f.n}</div>
                <div className="h-1 w-12 bg-[#2ab191] rounded-full mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-[#1a1a1a]">{f.title}</h3>
                <p className="text-sm text-[#4a4a4a] leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. COOPTATION ── */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <span className="text-xs uppercase tracking-[0.2em] text-[#2ab191]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Sélection par les pairs</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-12 text-[#1a1a1a]" style={{ fontFamily: "'Playfair Display', serif" }}>Une communauté élue démocratiquement.</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.2} className="flex flex-col md:flex-row items-stretch gap-4">
            {[
              { emoji: '📋', title: 'Candidature', desc: 'Dépôt de dossier et vérification des critères.' },
              { emoji: '🗳️', title: 'Vote anonyme', desc: <><span className="text-[#3edbb3] font-semibold">5 cabinets à exclure, 3 à intégrer</span>, scrutin anonyme.</> },
              { emoji: '⚖️', title: 'Sélection', desc: 'Décision collective par le groupe actif.' },
              { emoji: '🤝', title: 'Alliance', desc: '15 cabinets qui dominent ensemble les réponses IA.' },
            ].map((s, i) => (
              <React.Fragment key={i}>
                <div className="flex-1 p-6 rounded-2xl border border-[#2ab191]/15 bg-white/60 text-center shadow-sm">
                  <span className="text-3xl">{s.emoji}</span>
                  <h3 className="font-semibold mt-3 mb-2 text-[#1a1a1a]">{s.title}</h3>
                  <p className="text-sm text-[#4a4a4a]">{s.desc}</p>
                </div>
                {i < 3 && <div className="hidden md:flex items-center text-[#2ab191]"><ChevronRight size={24} /></div>}
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 7b. ALGORITHME PROPRIÉTAIRE ── */}
      <section className="py-24 px-4 relative bg-[#0a0a0a] overflow-hidden">
        {/* Grille subtile */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(42,177,145,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(42,177,145,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#2ab191]/10 blur-[120px]" />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-[#2ab191] mb-4 block" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Technologie exclusive</span>
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Un algorithme conçu pour<br />les cabinets d'avocats.
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Notre technologie propriétaire analyse et optimise votre positionnement sur les moteurs IA. La méthodologie est confidentielle. Les résultats, eux, sont visibles.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { icon: <Shield size={28} />, title: 'Algorithme confidentiel', desc: 'Développé en interne par nos ingénieurs IA, notre algorithme reste strictement propriétaire. Aucun détail technique n\'est divulgué.' },
              { icon: <Activity size={28} />, title: 'Analyse en temps réel', desc: 'Surveillance continue de votre positionnement sur ChatGPT, Perplexity, Gemini et les moteurs IA émergents.' },
              { icon: <Zap size={28} />, title: 'Optimisation automatisée', desc: 'Ajustements stratégiques déployés automatiquement pour maintenir et renforcer votre visibilité dans les réponses IA.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="p-8 rounded-2xl border border-[#2ab191]/20 bg-white/[0.03] backdrop-blur-sm hover:border-[#2ab191]/40 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#2ab191]/10 flex items-center justify-center text-[#2ab191] mb-5">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{item.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="rounded-2xl border border-[#2ab191]/20 bg-white/[0.03] backdrop-blur-sm p-10 flex flex-col md:flex-row items-center gap-8"
          >
            <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-[#2ab191]/10 flex items-center justify-center">
              <Lock size={36} className="text-[#2ab191]" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Pourquoi c'est confidentiel ?</h3>
              <p className="text-white/50 leading-relaxed">
                La puissance de notre approche repose sur son exclusivité. Partager notre méthodologie reviendrait à la rendre obsolète. 
                Ce que nous partageons : <span className="text-[#2ab191] font-semibold">les résultats mesurables</span>. Visibilité, positions, et recommandations générées par les IA pour votre cabinet.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 8. CAS CONCRETS ── */}
      <section id="preuves" className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(42,177,145,0.08)_0%,_transparent_60%)]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <span className="text-xs uppercase tracking-[0.2em] text-[#2ab191]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Cas concrets</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-12 text-[#1a1a1a]" style={{ fontFamily: "'Playfair Display', serif" }}>15 spécialités. 15 positions à prendre sur les LLM.</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Haas Avocats', num: '01', spec: 'Droit du numérique, IA, RGPD', desc: 'Référence en protection des données et droit de l\'IA.', result: 'Cité dans 78% des réponses', cited: true },
              { name: 'Lexing Alain Bensoussan', num: '02', spec: 'Droit des technologies avancées', desc: 'Pionnier du droit de l\'informatique en France.', result: 'Cité dans 85% des réponses', cited: true },
              { name: 'Bredin Prat', num: '03', spec: 'Droit des affaires & M&A', desc: 'Cabinet de premier plan pour les opérations complexes.', result: 'Cité dans 62% des réponses', cited: true },
              { name: 'August Debouzy', num: '04', spec: 'Droit social & restructurations', desc: 'Expert en droit du travail et restructurations.', result: 'Cité dans 54% des réponses', cited: true },
              { name: 'Cabinet Giganti', num: '05', spec: 'Droit du travail cadres dirigeants', desc: 'Spécialiste des contentieux haut de gamme.', result: 'Cité dans 41% des réponses', cited: true },
              { name: 'Darrois Villey', num: '06', spec: 'Contentieux des affaires', desc: 'Référence en contentieux commercial et sociétaire.', result: 'Cité dans 70% des réponses', cited: true },
              { name: 'Signature Litigation', num: '07', spec: 'Arbitrage international', desc: 'Boutique spécialisée en litiges complexes.', result: 'Cité dans 38% des réponses', cited: true },
              { name: 'Vigo Cabinet', num: '08', spec: 'Droit pénal des affaires', desc: 'Défense pénale des dirigeants et entreprises.', result: 'Cité dans 45% des réponses', cited: true },
              { name: 'Vogel & Vogel', num: '09', spec: 'Droit de la concurrence', desc: 'Expert en antitrust et pratiques restrictives.', result: 'Cité dans 59% des réponses', cited: true },
              { name: 'Altana', num: '10', spec: 'Propriété intellectuelle & marques', desc: 'Protection des innovations et marques premium.', result: 'Cité dans 52% des réponses', cited: true },
              { name: 'Courto Partners', num: '11', spec: 'Droit de la presse & médias', desc: 'Spécialiste des médias et de la communication.', result: 'Cité dans 33% des réponses', cited: true },
              { name: 'Huglo Lepage', num: '12', spec: 'Droit de l\'environnement', desc: 'Pionnier du droit environnemental en France.', result: 'Cité dans 67% des réponses', cited: true },
              { name: 'Novo Avocats', num: '13', spec: 'Droit immobilier & construction', desc: 'Expert en promotions immobilières et litiges.', result: 'Cité dans 44% des réponses', cited: true },
              { name: 'Votre concurrent', num: '14', spec: 'Droit fiscal patrimoine', desc: 'Cité malgré moins d\'expérience que vous.', result: 'Cité, moins qualifié, mais visible', cited: true },
              { name: 'Votre cabinet', num: '15', spec: 'Votre spécialité', desc: 'Absent des recommandations IA, pour l\'instant.', result: 'Absent des recommandations IA', cited: false },
            ].map((c, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={(i % 3) * 0.1}
                className={`p-5 rounded-xl border ${c.cited ? 'border-[#2ab191]/15 bg-white/60' : 'border-red-500/20 bg-red-50/80'} hover:border-[#2ab191]/40 transition-all duration-300 shadow-sm`}>
                <div className="flex items-start justify-between mb-2">
                  <span className="text-[#2ab191] font-semibold text-sm">{c.name}</span>
                  <span className="text-xs text-[#5a5a5a]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{c.num}</span>
                </div>
                <div className="text-[10px] uppercase tracking-widest text-[#5a5a5a] mb-2">{c.spec}</div>
                <p className="text-xs text-[#4a4a4a] mb-3">{c.desc}</p>
                <div className={`text-xs font-medium ${c.cited ? 'text-[#3edbb3]' : 'text-red-400'}`} style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {c.cited ? '✓' : '✗'} {c.result}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. OFFRES ── */}
      <section id="offres" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-[#2ab191]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Nos Offres</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 text-[#1a1a1a]" style={{ fontFamily: "'Playfair Display', serif" }}>Trois niveaux de positionnement.</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Alliance */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
              className="relative p-8 rounded-2xl border-2 border-[#2ab191] bg-[#2ab191]/[0.05]">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#2ab191] text-white text-xs font-bold rounded-full uppercase tracking-wider">Recommandé</div>
              <h3 className="text-2xl font-bold mt-4 mb-1 text-[#1a1a1a]" style={{ fontFamily: "'Playfair Display', serif" }}>Alliance</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-bold text-[#2ab191]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>5 000€</span>
              <span className="text-sm text-[#5a5a5a]">/mois</span>
              </div>
              <p className="text-xs text-[#5a5a5a] mb-6">Engagement 24 mois · 15 places maximum</p>
              <ul className="space-y-3">
                {['Stratégie GEO mutualisée', 'Articles médias haute autorité', 'Backlinks mutualisés', 'Citations croisées 14 cabinets', 'Exclusivité spécialité/zone', 'Monitoring mensuel tous LLM', 'Processus de cooptation', 'Accès réseau communauté'].map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#3a3a3a]"><ArrowRight size={14} className="text-[#2ab191] mt-1 shrink-0" />{f}</li>
                ))}
              </ul>
            </motion.div>
            {/* Ultra */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.15}
              className="p-8 rounded-2xl border border-[#2ab191]/15 bg-white/60 shadow-sm">
              <h3 className="text-2xl font-bold mb-1 text-[#1a1a1a]" style={{ fontFamily: "'Playfair Display', serif" }}>Ultra</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-bold text-[#1a1a1a]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>8 000€</span>
                <span className="text-sm text-[#5a5a5a]">/mois</span>
              </div>
              <p className="text-xs text-[#5a5a5a] mb-6">Engagement 24 mois · Places limitées</p>
              <ul className="space-y-3">
                {['Tout inclus Alliance', 'Articles sur site du client', 'Optimisation on-site LLM (schema markup, FAQ)', 'Contenus éditoriaux dédiés', 'Positionnement renforcé spécialité', 'Rapports bi-mensuels + analyse concurrence'].map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#3a3a3a]"><ArrowRight size={14} className="text-[#2ab191] mt-1 shrink-0" />{f}</li>
                ))}
              </ul>
            </motion.div>
            {/* Premium */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.3}
              className="p-8 rounded-2xl border border-[#2ab191]/10 bg-white/40 opacity-80 shadow-sm">
              <h3 className="text-2xl font-bold mb-1 text-[#1a1a1a]" style={{ fontFamily: "'Playfair Display', serif" }}>Premium</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-bold text-[#1a1a1a]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Sur devis</span>
              </div>
              <p className="text-xs text-[#5a5a5a] mb-6">Engagement 24 mois · Stratégie individuelle</p>
              <ul className="space-y-3 mb-6">
                {['Siège réservé parmi les 15', 'Stratégie 100% dédiée, zéro mutualisation', 'Articles/backlinks exclusifs', 'Déploiement GEO personnalisé', 'Équilibre collectif/exclusivité'].map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#3a3a3a]"><ArrowRight size={14} className="text-[#5a5a5a] mt-1 shrink-0" />{f}</li>
                ))}
              </ul>
              <div className="p-4 rounded-xl border border-red-500/20 bg-red-50/80 text-xs text-[#4a4a4a] leading-relaxed">
                <strong className="text-red-500">Notre avis transparent :</strong> Nous croyons dans la force du réseau. L'offre Premium va à l'encontre de notre algorithme et de la logique de marché. La mutualisation produit de meilleurs résultats. Mais le client est roi : nous répondons à tous vos désirs, même les plus singuliers.
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 10. TIMELINE ── */}
      <section id="strategie" className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <span className="text-xs uppercase tracking-[0.2em] text-[#2ab191]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Stratégie 24 mois</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-12 text-[#1a1a1a]" style={{ fontFamily: "'Playfair Display', serif" }}>Un plan d'action agressif en deux ans.</h2>
          </motion.div>
          <div className="relative pl-8 border-l-2 border-[#2ab191]/30 space-y-12">
            {[
              { months: 'Mois 1-3', title: 'Fondation', desc: 'Audit de présence IA, constitution du groupe par cooptation, mise en place de l\'infrastructure éditoriale.' },
              { months: 'Mois 4-8', title: 'Déploiement', desc: 'Production de contenus haute autorité, backlinks mutualisés, premières citations croisées entre les cabinets.' },
              { months: 'Mois 9-16', title: 'Accélération', desc: 'Publications premium (Forbes, Les Echos, Dalloz), renforcement des positions acquises, élargissement du spectre IA.' },
              { months: 'Mois 17-24', title: 'Domination', desc: 'Verrouillage des positions, expansion province à 3 000€/mois, maintenance et défense des acquis.' },
            ].map((t, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.15} className="relative">
                <div className="absolute -left-[41px] top-0 w-4 h-4 rounded-full bg-[#2ab191] shadow-[0_0_12px_rgba(42,177,145,0.5)]" />
                <span className="text-xs text-[#2ab191] font-semibold uppercase tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{t.months}</span>
                <h3 className="text-xl font-bold mt-1 mb-2 text-[#1a1a1a]">{t.title}</h3>
                <p className="text-sm text-[#4a4a4a] leading-relaxed">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. CTA ── */}
      <section id="contact" className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(42,177,145,0.15)_0%,_transparent_60%)]" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <span className="text-xs uppercase tracking-[0.2em] text-[#2ab191]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Rejoindre l'Alliance</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4 text-[#1a1a1a]" style={{ fontFamily: "'Playfair Display', serif" }}>Les 15 premières places définissent les 15 premiers noms que l'IA retiendra.</h2>
            <p className="text-[#4a4a4a] mb-10">Le programme est limité à 15 cabinets en Île-de-France. Pas un de plus.</p>
            <a href="mailto:contact@dikio.fr" className="inline-flex items-center gap-2 px-8 py-4 bg-[#2ab191] hover:bg-[#3edbb3] text-white font-semibold rounded-xl transition-colors text-lg">
              Demander un entretien <ArrowRight size={20} />
            </a>
            <p className="mt-6 text-sm text-[#1a7a63]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Places restantes : programme en cours de constitution</p>
          </motion.div>
        </div>
      </section>

      {/* ── 12. FOOTER ── */}
      <footer className="border-t border-[#2ab191]/15 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#5a5a5a]">GEO Alliance · Positionnement IA pour cabinets d'avocats · <a href="https://dikio.fr" className="text-[#2ab191] hover:underline">dikio.fr</a></p>
          <div className="flex items-center gap-2 text-sm text-[#5a5a5a]">
            Propulsé par
            <Link href="/"><img src="/images/771a8b36-282b-42f2-8437-f98e84fc4d05.png" alt="Dikio" className="h-14 object-contain" /></Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GeoAlliance;
