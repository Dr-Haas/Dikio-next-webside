'use client';

import React from 'react';
import Link from 'next/link';

const AboutFounderBlock = () => {
  return (
    <section className="py-20 md:py-28 px-4 bg-dikio-blue">
      <div className="max-w-4xl mx-auto">
        <h2
          data-gsap="text-reveal"
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-12"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Gary Haas — Fondateur
        </h2>
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
          <div
            data-gsap="fade-up"
            className="w-24 h-24 rounded-xl bg-dikio-subtitle flex items-center justify-center flex-shrink-0 text-white text-2xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            GH
          </div>
          <div className="flex-1 space-y-6">
            <p
              data-gsap="fade-up"
              className="text-white/90 leading-relaxed text-lg"
            >
              Gary n&apos;a pas commencé par l&apos;IA. Il a commencé par la
              musique, le design, la stratégie digitale. Vingt-cinq ans à
              construire des choses dans des univers où la créativité n&apos;est
              pas un luxe, mais une contrainte de survie. Cette trajectoire a
              forgé une conviction : les meilleures solutions ne viennent jamais
              d&apos;une seule discipline.
            </p>
            <p
              data-gsap="fade-up"
              className="text-white/90 leading-relaxed text-lg"
            >
              Pendant neuf ans, il a travaillé à l&apos;intersection du Legal, de
              la Tech et de la MedTech. Il est l&apos;architecte de{' '}
              <span className="text-dikio-subtitle font-medium">Noria</span>, un
              système d&apos;IA juridique, et d&apos;
              <span className="text-dikio-subtitle font-medium">Archimed</span>
              , une infrastructure d&apos;automatisation pour la medtech. Dikio
              est né de la volonté de mettre cette expérience au service des
              cabinets qui veulent transformer leur façon de travailler.
            </p>
            <p
              data-gsap="fade-up"
              className="text-white/90 leading-relaxed text-lg"
            >
              Ce qui distingue Gary, ce n&apos;est pas la technique, c&apos;est
              le regard. Il voit les frictions que les organisations ne voient
              plus. Et il construit les systèmes qui les rendent obsolètes.
            </p>
            <p data-gsap="fade-up" className="pt-2">
              <Link
                href="mailto:contact@dikio.fr"
                className="text-dikio-subtitle hover:text-dikio-subtitle/80 font-medium transition-colors"
              >
                contact@dikio.fr
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutFounderBlock;
