import React from 'react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15 },
  }),
};

const FounderSection = () => {
  return (
    <section className="py-20 md:py-28 px-4 relative bg-[#0a0a0a] overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-dikio-title/5 blur-[150px]" />

      <div className="max-w-4xl mx-auto relative z-10">
        <span
          data-gsap="fade-up"
          className="text-xs uppercase tracking-[0.25em] text-dikio-title block mb-6"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Le fondateur
        </span>

        <h2
          data-gsap="text-reveal"
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-10 leading-[1.15]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Gary Haas.
        </h2>

        <div
          data-gsap="fade-up"
          className="space-y-6 text-lg leading-relaxed text-white/65"
        >
          <p>
            Gary n'a pas commencé par l'IA. Il a commencé par la musique, le design, la stratégie digitale. Vingt-cinq ans à construire des choses dans des univers où la créativité n'est pas un luxe, mais une contrainte de survie. Cette trajectoire a forgé une conviction : les meilleures solutions ne viennent jamais d'une seule discipline.
          </p>
          <p>
            Pendant neuf ans, il a travaillé à l'intersection du Legal, de la Tech et de la MedTech. Il a développé des solutions d'automatisation déployées dans des groupes de cliniques, des cabinets d'avocats de premier plan, des structures de santé où chaque minute perdue a un coût humain. Il est l'architecte de{' '}
            <span className="text-dikio-subtitle font-medium">Noria</span>, un système d'IA juridique, et d'
            <span className="text-dikio-subtitle font-medium">Archimed</span>, une infrastructure d'automatisation pour la medtech.
          </p>
          <p>
            Ce qui distingue Gary, ce n'est pas la technique, c'est le regard. Il voit les frictions que les organisations ne voient plus. Les processus que tout le monde accepte parce que « ça a toujours été comme ça ». Et il construit les systèmes qui les rendent obsolètes.
          </p>
        </div>

        {/* Stats */}
        <div
          data-gsap="stagger"
          className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-8"
        >
          {[
            { value: '9', label: 'ans Legal × Tech × MedTech' },
            { value: '25', label: 'ans de créativité appliquée' },
            { value: '∞', label: 'curiosité structurelle' },
          ].map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <div
                className="text-4xl md:text-5xl font-bold text-dikio-title mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-white/40 uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
