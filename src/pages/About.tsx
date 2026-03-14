'use client';

import React from 'react';
import AboutHero from '@/components/about/AboutHero';
import FounderSection from '@/components/about/FounderSection';
import EtymologySection from '@/components/about/EtymologySection';
import AboutCTA from '@/components/about/AboutCTA';

const About = () => {
  return (
    <div className="min-h-screen bg-dikio-background">
      <main>
        <AboutHero />
        <FounderSection />
        <EtymologySection />
        <AboutCTA />
      </main>
    </div>
  );
};

export default About;
