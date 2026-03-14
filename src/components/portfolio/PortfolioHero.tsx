'use client';


import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Sparkles } from 'lucide-react';
import { ProjectData } from './ProjectCard';

interface PortfolioHeroProps {
  projects: ProjectData[];
}

const PortfolioHero: React.FC<PortfolioHeroProps> = ({ projects }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Compute dynamic stats
  const totalProjects = projects.length;
  const years = projects
    .map((p: any) => p.year)
    .filter(Boolean)
    .map(Number)
    .filter((y: number) => !isNaN(y));
  const uniqueYears = [...new Set(years)].sort((a, b) => a - b);
  const yearSpan = uniqueYears.length >= 2
    ? `${uniqueYears[0]}–${uniqueYears[uniqueYears.length - 1]}`
    : uniqueYears.length === 1
    ? `${uniqueYears[0]}`
    : '2023–2025';

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background line animation
      gsap.fromTo('.hero-marquee-line',
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 1.6, ease: 'power4.inOut', delay: 0.1 }
      );

      // Badge
      gsap.fromTo('.portfolio-hero-badge',
        { opacity: 0, y: -16, scale: 0.85 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)', delay: 0.2 }
      );

      // Title words stagger
      gsap.fromTo('.hero-word',
        { opacity: 0, y: 60, skewY: 4 },
        { opacity: 1, y: 0, skewY: 0, duration: 0.9, ease: 'power4.out', stagger: 0.08, delay: 0.35 }
      );

      // Subtitle
      gsap.fromTo('.portfolio-hero-sub',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.75 }
      );

      // Stats counter animation
      gsap.fromTo('.stat-card',
        { opacity: 0, y: 30, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out', stagger: 0.1, delay: 0.9 }
      );

      // Counter number animation
      if (totalProjects > 0) {
        const counter = { val: 0 };
        const el = document.querySelector('.stat-count-projects');
        if (el) {
          gsap.to(counter, {
            val: totalProjects,
            duration: 1.4,
            delay: 1.1,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = Math.round(counter.val).toString();
            }
          });
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, [totalProjects]);

  return (
    <section ref={containerRef} className="relative pt-24 pb-0 md:pt-32 overflow-hidden">

      {/* Background texture lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="hero-marquee-line absolute h-px bg-dikio-title/8"
            style={{ top: `${15 + i * 18}%`, left: 0, right: 0 }}
          />
        ))}
      </div>

      <div className="container px-4 md:px-6 relative z-10">

        {/* Top row: badge + year span */}
        <div className="flex items-center justify-between mb-10">
          <div className="portfolio-hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dikio-title/10 border border-dikio-title/20">
            <Sparkles className="w-3.5 h-3.5 text-dikio-title" />
            <span className="text-xs font-semibold text-dikio-title tracking-widest uppercase">Projets IA & Innovation</span>
          </div>
          <span className="text-xs text-dikio-blue/40 font-mono tracking-widest hidden md:block">{yearSpan}</span>
        </div>

        {/* Giant editorial title */}
        <div className="overflow-hidden mb-4">
          <h1 className="text-[clamp(3.5rem,10vw,9rem)] font-black leading-[0.88] tracking-tighter text-dikio-blue flex flex-wrap gap-x-6">
            <span className="hero-word inline-block">Nos</span>
            <span className="hero-word inline-block gradient-text">réalisations</span>
          </h1>
        </div>

        {/* Divider */}
        <div className="h-px bg-dikio-title/20 mb-10" />

        {/* Bottom row: subtitle + stats */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 pb-16">

          {/* Subtitle */}
          <p className="portfolio-hero-sub text-base md:text-lg text-dikio-blue/60 max-w-xl leading-relaxed font-light">
            Des entreprises ambitieuses à l'ère de l'IA, qui transforment leurs process grâce à l'intelligence artificielle et des expériences digitales de nouvelle génération.
          </p>

          {/* Stats row */}
          <div className="flex gap-3 shrink-0 flex-wrap">

            {/* Projects count - dynamic */}
            <div className="stat-card flex flex-col items-center justify-center px-6 py-4 rounded-2xl bg-dikio-title text-white min-w-[110px]">
              <span className="stat-count-projects text-4xl font-black tabular-nums leading-none">
                {totalProjects > 0 ? '0' : '-'}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-widest mt-1.5 text-white/70">Projets</span>
            </div>

            {/* 100% IA */}
            <div className="stat-card flex flex-col items-center justify-center px-6 py-4 rounded-2xl border border-dikio-title/20 bg-dikio-title/5 min-w-[110px]">
              <span className="text-4xl font-black tabular-nums leading-none text-dikio-title">100%</span>
              <span className="text-[10px] font-semibold uppercase tracking-widest mt-1.5 text-dikio-blue/50">IA intégrée</span>
            </div>

            {/* Impact */}
            <div className="stat-card flex flex-col items-center justify-center px-6 py-4 rounded-2xl border border-dikio-title/20 bg-dikio-title/5 min-w-[110px]">
              <span className="text-4xl font-black tabular-nums leading-none text-dikio-title">∞</span>
              <span className="text-[10px] font-semibold uppercase tracking-widest mt-1.5 text-dikio-blue/50">Impact</span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioHero;
