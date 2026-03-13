import React from 'react';

const AboutHero = () => {
  return (
    <section className="pt-32 pb-20 md:pt-44 md:pb-32 px-4 relative overflow-hidden">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <span
          data-gsap="fade-up"
          className="text-xs uppercase tracking-[0.25em] text-dikio-title block mb-6"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          AI Operations Studio
        </span>

        <h1
          data-gsap="text-reveal"
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-dikio-paragraph mb-8 leading-[1.1]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          On ne vend pas de l'IA.
          <br />
          <span className="text-dikio-title">On l'opère.</span>
        </h1>

        <div
          data-gsap="fade-up"
          className="max-w-3xl space-y-6 text-lg leading-relaxed text-dikio-paragraph/80"
        >
          <p>
            Dikio est un AI Operations Studio. Nous concevons, déployons et pilotons des systèmes d'intelligence artificielle pour des cabinets d'avocats, des établissements de santé et des entreprises tech.
          </p>
          <p>
            Nous ne sommes ni une agence digitale, ni une ESN, ni un cabinet de conseil qui vend des slides. Nous sommes des architectes opérationnels. Notre travail commence là où les recommandations stratégiques s'arrêtent : dans le réel, dans les workflows, dans les systèmes qui tournent. Ou qui devraient tourner.
          </p>
          <p>
            Chaque organisation perd du temps, de l'argent et de l'énergie sur des processus qu'elle ne voit même plus. Des tâches répétées à la main, des données qui dorment dans des dossiers, des décisions prises sans les bonnes informations au bon moment. Ce sont des pertes silencieuses. Notre métier, c'est de les identifier, de construire les workflows qui les éliminent, et de piloter ces systèmes dans la durée. Pas un audit. Pas un POC. Un système qui fonctionne, maintenu, amélioré, opéré.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
