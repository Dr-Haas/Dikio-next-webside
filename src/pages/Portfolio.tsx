'use client';

import React, { useEffect } from 'react';
import PortfolioHero from '@/components/portfolio/PortfolioHero';
import ProjectsGrid from '@/components/portfolio/ProjectsGrid';
import PortfolioCTA from '@/components/portfolio/PortfolioCTA';
import type { ProjectData } from '@/components/portfolio/ProjectCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Portfolio = ({ initialProjects = [] }: { initialProjects?: ProjectData[] }) => {
  const projects = initialProjects;

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [projects]);

  return (
    <div className="min-h-screen bg-dikio-background">
      <main>
        <PortfolioHero projects={projects} />

        <section className="container mx-auto px-4 pb-20">
          <ProjectsGrid projects={projects} />
        </section>

        <PortfolioCTA />
      </main>
    </div>
  );
};

export default Portfolio;
