import React from 'react';

const EtymologySection = () => {
  return (
    <section className="py-20 md:py-28 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <span
          data-gsap="fade-up"
          className="text-xs uppercase tracking-[0.25em] text-dikio-title block mb-6"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Étymologie
        </span>

        <h2
          data-gsap="text-reveal"
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-dikio-paragraph mb-10 leading-[1.15]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Dikio · <span className="text-dikio-title italic">δίκιο</span>
        </h2>

        <div
          data-gsap="fade-up"
          className="space-y-6 text-lg leading-relaxed text-dikio-paragraph/75"
        >
          <p>
            Le nom vient du grec <em>écho díkio</em> (έχω δίκιο), « avoir raison ». La racine <em>díkē</em> (δίκη) signifie la justice, ce qui est juste. Pas la justice des tribunaux, mais celle du raisonnement. La justesse d'une décision prise avec les bonnes données, au bon moment, pour les bonnes raisons.
          </p>
          <p>
            Dikio, c'est cette ambition-là : mettre la justesse du raisonnement au service de la décision. Construire les systèmes qui permettent à chaque organisation de voir clair, d'agir vite, et d'avoir raison. Plus souvent.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EtymologySection;
