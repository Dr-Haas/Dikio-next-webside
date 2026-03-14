import type { Metadata } from 'next';
import { supabaseUntyped } from '@/lib/supabaseClient';
import ProjectDetail from '@/pages/ProjectDetail';
import type { PortfolioProjectDetail } from '@/hooks/usePortfolioProject';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { data: project } = await supabaseUntyped
    .from('portfolio_projects')
    .select('title, description')
    .eq('id', id)
    .eq('is_published', true)
    .single();

  if (!project) {
    return {
      title: 'Projet introuvable | Dikio',
    };
  }

  const title = project.title;
  const description = project.description || `Découvrez le projet ${project.title}`;

  return {
    title: `${title} | Dikio`,
    description,
    openGraph: {
      title: `${title} | Dikio`,
      description,
      url: `https://dikio.fr/portfolio/${id}`,
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const { data: project } = await supabaseUntyped
    .from('portfolio_projects')
    .select('*')
    .eq('id', id)
    .eq('is_published', true)
    .single();

  return <ProjectDetail initialProject={project as PortfolioProjectDetail | null} />;
}
