'use client';

import React from 'react';

const blocks = [
  {
    title: 'Le problème',
    content:
      "Les cabinets d'avocats font face à une pression croissante : concurrence, attentes clients, coûts, complexité des dossiers. Beaucoup s'appuient sur des processus hérités et des outils éclatés, sans vision claire de ce qui pourrait être transformé en priorité.",
  },
  {
    title: 'Ce qui manque',
    content:
      "Une lecture opérationnelle honnête. Des livrables actionnables, pas des rapports de 200 slides. Une capacité à identifier les vrais goulots d'étranglement et à proposer des solutions concrètes, testables, déployables.",
  },
  {
    title: 'Ce que Dikio fait',
    content:
      "Nous réalisons des audits ciblés des cabinets : processus, outils, données, expérience client. Nous produisons des livrables HTML interactifs et un co-pilote IA en temps réel pendant l'audit. Objectif : une feuille de route claire, un pricing transparent, une livraison en 2 à 5 semaines.",
  },
];

const WhyDikioExistsSection = () => {
  return (
    <section className="py-20 md:py-28 px-4 bg-dikio-blue">
      <div className="max-w-4xl mx-auto">
        <h2
          data-gsap="text-reveal"
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-12 md:mb-16"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Pourquoi Dikio existe
        </h2>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 md:p-8 space-y-8 md:space-y-10">
          {blocks.map((block, index) => (
            <div key={index} data-gsap="fade-up">
              <h3 className="text-dikio-subtitle font-semibold text-lg mb-3">
                {block.title}
              </h3>
              <p className="text-white/90 leading-relaxed">{block.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyDikioExistsSection;
