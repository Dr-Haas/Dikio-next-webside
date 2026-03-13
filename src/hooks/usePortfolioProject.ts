import { useQuery } from '@tanstack/react-query';
import { supabaseUntyped } from '@/lib/supabaseClient';

export interface ContentSection {
  title: string;
  content: string;
}

export interface PortfolioProjectDetail {
  id: string;
  title: string;
  description: string | null;
  long_description: string | null;
  image_url: string | null;
  category: string;
  tags: string[];
  devices: string[];
  technologies: string[];
  gallery_images: string[];
  client_name: string | null;
  project_url: string | null;
  year: string | null;
  duration: string | null;
  testimonial_text: string | null;
  testimonial_author: string | null;
  content_sections: ContentSection[];
}

export const usePortfolioProject = (id: string | undefined) => {
  return useQuery({
    queryKey: ['portfolio-project', id],
    queryFn: async (): Promise<PortfolioProjectDetail | null> => {
      if (!id) return null;
      const { data, error } = await supabaseUntyped
        .from('portfolio_projects')
        .select('*')
        .eq('id', id)
        .eq('is_published', true)
        .single();

      if (error) {
        console.error('Error fetching project:', error);
        return null;
      }
      return data as PortfolioProjectDetail;
    },
    enabled: !!id,
  });
};
