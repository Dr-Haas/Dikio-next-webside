import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AboutCTA = () => {
  return (
    <section className="py-20 md:py-28 px-4 bg-dikio-title relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 0%, transparent 50%)',
      }} />

      <div
        data-gsap="scale"
        className="max-w-3xl mx-auto text-center relative z-10"
      >
        <h2
          data-gsap="text-reveal"
          className="text-3xl sm:text-4xl font-bold text-white mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Vous avez un système à construire ?
        </h2>
        <p data-gsap="fade-up" className="text-lg text-white/70 mb-10 max-w-2xl mx-auto">
          Parlons de vos processus, de vos pertes silencieuses, et de ce que l'IA peut réellement changer dans votre organisation.
        </p>
        <div data-gsap="fade-up">
          <Link href="/project-form">
            <Button
              size="lg"
              className="bg-white text-dikio-title hover:bg-white/90 font-semibold text-base px-8"
            >
              Démarrer une conversation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutCTA;
