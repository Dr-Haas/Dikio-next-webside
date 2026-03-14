import React from 'react';

type EtymologySectionProps = {
  variant?: 'light' | 'dark';
};

const EtymologySection = ({ variant = 'light' }: EtymologySectionProps) => {
  const isDark = variant === 'dark';
  const sectionClass = isDark ? 'py-20 md:py-28 px-4 relative bg-dikio-blue' : 'py-20 md:py-28 px-4 relative';
  const labelClass = isDark
    ? 'text-xs uppercase tracking-[0.25em] text-dikio-subtitle block mb-6'
    : 'text-xs uppercase tracking-[0.25em] text-dikio-title block mb-6';
  const titleClass = isDark
    ? 'text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-10 leading-[1.15]'
    : 'text-3xl sm:text-4xl md:text-5xl font-bold text-dikio-paragraph mb-10 leading-[1.15]';
  const titleHighlightClass = isDark ? 'text-dikio-subtitle italic' : 'text-dikio-title italic';
  const bodyClass = isDark
    ? 'space-y-6 text-lg leading-relaxed text-white/80'
    : 'space-y-6 text-lg leading-relaxed text-dikio-paragraph/75';

  return (
    <section className={sectionClass}>
      <div className="max-w-4xl mx-auto">
        <span
          data-gsap="fade-up"
          className={labelClass}
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Étymologie
        </span>

        <h2
          data-gsap="text-reveal"
          className={titleClass}
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Dikio · <span className={titleHighlightClass}>δίκιο</span>
        </h2>

        <div data-gsap="fade-up" className={bodyClass}>
          <p>
            Le nom vient du grec <em>écho díkio</em> (έχω δίκιο), « avoir raison ». La racine <em>díkē</em> (δίκη) signifie la justice, ce qui est juste. Pas la justice des tribunaux, mais celle du raisonnement. La justesse d&apos;une décision prise avec les bonnes données, au bon moment, pour les bonnes raisons.
          </p>
          <p>
            Dikio, c&apos;est cette ambition-là : mettre la justesse du raisonnement au service de la décision. Construire les systèmes qui permettent à chaque organisation de voir clair, d&apos;agir vite, et d&apos;avoir raison. Plus souvent.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EtymologySection;
