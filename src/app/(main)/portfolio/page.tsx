import type { Metadata } from 'next';
import { supabase } from '@/integrations/supabase/client';
import { supabaseServer } from '@/integrations/supabase/server';
import Portfolio from '@/pages/Portfolio';
import type { ProjectData } from '@/components/portfolio/ProjectCard';
import { fallbackProjects } from '@/data/portfolioData';

export const metadata: Metadata = {
  title: 'Portfolio | Dikio',
  description: "Découvrez nos réalisations : startups IA, applications, plateformes SaaS. Des projets innovants qui transforment leur secteur.",
  keywords: "portfolio dikio, startups IA, réalisations, projets clients, applications, intelligence artificielle",
};

async function fetchProjects(): Promise<ProjectData[]> {
  const client = supabaseServer ?? supabase;
  const { data, error } = await client
    .from('portfolio_projects' as any)
    .select('id, title, description, image_url, category, tags, devices, year')
    .eq('is_published', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('[Portfolio] Supabase error:', error.message, error.code);
    return fallbackProjects;
  }
  if (data && data.length > 0) {
    return data as unknown as ProjectData[];
  }
  return fallbackProjects;
}

export default async function PortfolioPage() {
  let projects: ProjectData[] = fallbackProjects;
  try {
    projects = await fetchProjects();
  } catch (e) {
    console.error('[Portfolio] Fetch error:', e);
  }
  return <Portfolio initialProjects={projects} />;
}
