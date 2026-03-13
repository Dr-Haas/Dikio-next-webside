import React, { useEffect } from 'react';
import SEO from '@/components/SEO';
import { usePortfolioProjects } from '@/hooks/usePortfolioProjects';
import PortfolioHero from '@/components/portfolio/PortfolioHero';
import ProjectsGrid from '@/components/portfolio/ProjectsGrid';
import PortfolioCTA from '@/components/portfolio/PortfolioCTA';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const { data: projects = [], isLoading } = usePortfolioProjects();

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [projects]);

  return (
    <div className="min-h-screen bg-dikio-background">
      <SEO
        title="Portfolio"
        description="Découvrez nos réalisations : startups IA, applications, plateformes SaaS. Des projets innovants qui transforment leur secteur."
        keywords="portfolio dikio, startups IA, réalisations, projets clients, applications, intelligence artificielle"
        url="https://dikio.fr/portfolio"
      />
      <main>
        <PortfolioHero projects={projects} />

        <section className="container mx-auto px-4 pb-20">
          {isLoading ? (
            <div className="flex flex-col justify-center items-center py-32 gap-4">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 rounded-full border-2 border-dikio-title/20" />
                <div className="absolute inset-0 rounded-full border-2 border-dikio-title border-t-transparent animate-spin" />
              </div>
              <p className="text-sm text-muted-foreground">Chargement des projets…</p>
            </div>
          ) : (
            <ProjectsGrid projects={projects} />
          )}
        </section>

        <PortfolioCTA />
      </main>
    </div>
  );
};

export default Portfolio;
