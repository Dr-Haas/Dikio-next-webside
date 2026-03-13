import React from 'react';
import SEO from '@/components/SEO';
import AboutHero from '@/components/about/AboutHero';
import FounderSection from '@/components/about/FounderSection';
import EtymologySection from '@/components/about/EtymologySection';
import AboutCTA from '@/components/about/AboutCTA';

const About = () => {
  return (
    <div className="min-h-screen bg-dikio-background">
      <SEO 
        title="À propos · AI Operations Studio"
        description="Dikio conçoit, déploie et opère des systèmes d'intelligence artificielle pour les cabinets d'avocats, la medtech et les entreprises tech. Fondé par Gary Haas."
        keywords="dikio, AI operations studio, gary haas, intelligence artificielle, legal tech, medtech, automatisation IA"
        url="https://dikio.fr/about"
      />
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
