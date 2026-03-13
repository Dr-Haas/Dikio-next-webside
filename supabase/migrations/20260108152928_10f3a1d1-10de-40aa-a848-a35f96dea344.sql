-- Table pour les soumissions de projets (formulaire)
CREATE TABLE public.project_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Step 1: Project Info
  project_name TEXT NOT NULL,
  project_stage TEXT,
  objective TEXT,
  objective_other TEXT,
  
  -- Step 2: Presence
  has_website TEXT,
  has_branding TEXT,
  uses_digital_tools BOOLEAN DEFAULT false,
  digital_tools_details TEXT,
  
  -- Step 3: Target
  target_audience TEXT,
  ideal_client TEXT,
  currently_selling TEXT,
  
  -- Step 4: Needs
  need_website BOOLEAN DEFAULT false,
  need_sales_funnel BOOLEAN DEFAULT false,
  need_branding BOOLEAN DEFAULT false,
  need_automation BOOLEAN DEFAULT false,
  need_ads BOOLEAN DEFAULT false,
  need_google_reviews BOOLEAN DEFAULT false,
  need_strategy BOOLEAN DEFAULT false,
  need_coaching BOOLEAN DEFAULT false,
  
  -- Step 5: Budget
  budget TEXT,
  start_time TEXT,
  
  -- Step 6: Contact
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  contact_preference TEXT,
  additional_info TEXT
);

-- Enable RLS
ALTER TABLE public.project_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous inserts (public form)
CREATE POLICY "Allow anonymous inserts" 
ON public.project_submissions 
FOR INSERT 
WITH CHECK (true);

-- Table pour les projets du portfolio
CREATE TABLE public.portfolio_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  devices TEXT[] DEFAULT '{}',
  is_published BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0
);

-- Enable RLS
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public reads for published projects
CREATE POLICY "Allow public reads for published projects" 
ON public.portfolio_projects 
FOR SELECT 
USING (is_published = true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_portfolio_projects_updated_at
BEFORE UPDATE ON public.portfolio_projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial portfolio data
INSERT INTO public.portfolio_projects (title, description, image_url, category, tags, devices, display_order) VALUES
('Site Vitrine Entreprise', 'Site web professionnel pour une entreprise de services', '/placeholder.svg', 'site', ARRAY['Responsive', 'SEO', 'UI/UX'], ARRAY['desktop', 'mobile'], 1),
('Application Mobile Fitness', 'Application de suivi de fitness et de nutrition', '/placeholder.svg', 'application', ARRAY['React Native', 'Health API', 'UI/UX'], ARRAY['mobile'], 2),
('Boutique en ligne Mode', 'Plateforme e-commerce pour une marque de vêtements', '/placeholder.svg', 'ecommerce', ARRAY['E-commerce', 'Paiement en ligne', 'Catalogue'], ARRAY['desktop', 'mobile'], 3),
('Plateforme SaaS B2B', 'Solution logicielle pour la gestion d''entreprise', '/placeholder.svg', 'plateforme', ARRAY['SaaS', 'B2B', 'Dashboard'], ARRAY['desktop'], 4),
('Site Restaurant', 'Site web avec réservation en ligne pour restaurant', '/placeholder.svg', 'site', ARRAY['Réservation', 'Menu', 'UI/UX'], ARRAY['desktop', 'mobile'], 5),
('Application de Gestion', 'Système de gestion de stocks et inventaires', '/placeholder.svg', 'application', ARRAY['Dashboard', 'Analytique', 'Base de données'], ARRAY['desktop', 'mobile'], 6);