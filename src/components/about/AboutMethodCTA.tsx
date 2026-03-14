'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const AboutMethodCTA = () => {
  return (
    <section className="py-20 md:py-28 px-4 bg-dikio-blue">
      <div className="max-w-3xl mx-auto text-center">
        <h2
          data-gsap="text-reveal"
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Une question sur la méthode ?
        </h2>
        <div data-gsap="fade-up">
          <Button
            asChild
            size="lg"
            className="bg-dikio-accent hover:bg-dikio-accent-light text-white font-semibold text-base px-8 py-6 rounded-lg"
          >
            <Link href="/contact">Parler à Gary</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutMethodCTA;
