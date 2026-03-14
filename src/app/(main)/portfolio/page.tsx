import type { Metadata } from 'next';
import { supabase } from '@/integrations/supabase/client';
import Portfolio from '@/pages/Portfolio';
import type { ProjectData } from '@/components/portfolio/ProjectCard';
import { fallbackProjects } from '@/data/portfolioData';

export const metadata: Metadata = {
  title: 'Portfolio | Dikio',
  description: "Découvrez nos réalisations : startups IA, applications, plateformes SaaS. Des projets innovants qui transforment leur secteur.",
  keywords: "portfolio dikio, startups IA, réalisations, projets clients, applications, intelligence artificielle",
};

export default async function PortfolioPage() {
  let projects: ProjectData[] = fallbackProjects;

  try {
    const { data, error } = await supabase
      .from('portfolio_projects' as any)
      .select('id, title, description, image_url, category, tags, devices, year')
      .eq('is_published', true)
      .order('display_order', { ascending: true });

    if (!error && data && data.length > 0) {
      projects = data as unknown as ProjectData[];
    }
  } catch (_e) {
    // En production (Vercel), réseau ou Supabase peut échouer : on affiche le fallback
  }

  return <Portfolio initialProjects={projects} />;
}
