import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ProjectData } from '@/components/portfolio/ProjectCard';
import { fallbackProjects } from '@/data/portfolioData';

export const usePortfolioProjects = () => {
  return useQuery({
    queryKey: ['portfolio-projects'],
    queryFn: async (): Promise<ProjectData[]> => {
      const { data, error } = await supabase
        .from('portfolio_projects' as any)
        .select('id, title, description, image_url, category, tags, devices, year')
        .eq('is_published', true)
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error fetching portfolio projects:', error);
        return fallbackProjects;
      }

      if (!data || data.length === 0) {
        return fallbackProjects;
      }

      return data as unknown as ProjectData[];
    },
  });
};
