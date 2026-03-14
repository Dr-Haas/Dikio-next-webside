'use client';

import React from 'react';

const AboutAuditHero = () => {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-4 relative bg-dikio-blue overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1
          data-gsap="text-reveal"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.15]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Dikio n&apos;est pas un cabinet de conseil. C&apos;est un studio d&apos;opérations.
        </h1>
        <p
          data-gsap="fade-up"
          className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto"
        >
          On ne vend pas de l&apos;IA comme une promesse. On diagnostique, on construit, on déploie.
        </p>
      </div>
    </section>
  );
};

export default AboutAuditHero;
