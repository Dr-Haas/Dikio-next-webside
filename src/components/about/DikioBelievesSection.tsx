'use client';

import React from 'react';

const beliefs = [
  {
    number: '01',
    text: "Le problème des cabinets n'est pas seulement technologique. Il est commercial, opérationnel, expérientiel et humain.",
  },
  {
    number: '02',
    text: "Avant les systèmes agnostiques matures, il faut repenser les offres, les parcours client et la façon dont le savoir-faire juridique se manifeste.",
  },
  {
    number: '03',
    text: "L'avenir du cabinet ne repose pas sur la disparition de l'avocat – mais sur une articulation plus forte entre génie humain et outillage, expérience et marque.",
  },
  {
    number: '04',
    text: "Les actes juridiques seuls ne créent plus de valeur (de faits). Le cabinet doit transformer son savoir-faire en expérience de service compréhensible, incarnée, désirable.",
  },
  {
    number: '05',
    text: "Le cabinet de demain doit rendre visible qui pense, qui garantit, quelle méthode opère.",
  },
  {
    number: '06',
    text: "Chaque audit Dikio construit une intelligence marché sur les cabinets d'avocats. C'est un avantage stratégique cumulatif.",
  },
];

const DikioBelievesSection = () => {
  return (
    <section className="py-20 md:py-28 px-4 bg-dikio-blue">
      <div className="max-w-5xl mx-auto">
        <h2
          data-gsap="text-reveal"
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-12 md:mb-16"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Ce en quoi Dikio croit
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {beliefs.map((item, index) => (
            <div
              key={index}
              data-gsap="fade-up"
              className="rounded-xl border border-white/10 bg-white/5 p-5 md:p-6"
            >
              <span className="inline-block w-10 h-10 rounded-lg bg-white/10 text-white font-bold text-sm flex items-center justify-center mb-4">
                {item.number}
              </span>
              <p className="text-white/90 text-sm md:text-base leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DikioBelievesSection;
