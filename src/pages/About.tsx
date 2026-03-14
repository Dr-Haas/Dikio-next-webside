'use client';

import React from 'react';
import AboutAuditHero from '@/components/about/AboutAuditHero';
import WhyDikioExistsSection from '@/components/about/WhyDikioExistsSection';
import DikioBelievesSection from '@/components/about/DikioBelievesSection';
import EtymologySection from '@/components/about/EtymologySection';
import AboutFounderBlock from '@/components/about/AboutFounderBlock';
import ConsultantComparisonSection from '@/components/about/ConsultantComparisonSection';
import AboutMethodCTA from '@/components/about/AboutMethodCTA';

const About = () => {
  return (
    <div className="min-h-screen bg-dikio-blue">
      <main>
        <AboutAuditHero />
        <WhyDikioExistsSection />
        <DikioBelievesSection />
        <EtymologySection variant="dark" />
        <AboutFounderBlock />
        <ConsultantComparisonSection />
        <AboutMethodCTA />
      </main>
    </div>
  );
};

export default About;
