import React from 'react';
import SEO from '@/components/SEO';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import AISection from '@/components/AISection';
import ArchiloSection from '@/components/ArchiloSection';
import About from '@/components/About';
import Contact from '@/components/Contact';
import ProjectsCarousel from '@/components/about/ProjectsCarousel';
import CaisseMedicaleSection from '@/components/CaisseMedicaleSection';

const Index = () => {
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Dikio",
    "description": "Agence digitale spécialisée dans la croissance des projets innovants avec l'IA et l'automatisation",
    "url": "https://dikio.fr",
    "areaServed": "France",
    "serviceType": [
      "Growth Marketing",
      "Automatisation IA",
      "Branding",
      "Lancement de projet",
      "Accompagnement stratégique"
    ],
    "priceRange": "€€€"
  };

  return (
    <div className="min-h-screen bg-dikio-background">
      <SEO 
        url="https://dikio.fr"
        jsonLd={servicesSchema}
      />
      <main>
        <Hero />
        <Services />
        <CaisseMedicaleSection />
        <AISection />
        <ArchiloSection />
        <About />
        <Contact />
        <ProjectsCarousel />
      </main>
    </div>
  );
};

export default Index;