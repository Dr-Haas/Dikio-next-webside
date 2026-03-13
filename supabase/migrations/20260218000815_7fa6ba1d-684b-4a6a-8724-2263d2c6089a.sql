
-- Add detail fields to portfolio_projects
ALTER TABLE public.portfolio_projects
  ADD COLUMN IF NOT EXISTS long_description text,
  ADD COLUMN IF NOT EXISTS client_name text,
  ADD COLUMN IF NOT EXISTS project_url text,
  ADD COLUMN IF NOT EXISTS gallery_images text[] DEFAULT '{}'::text[],
  ADD COLUMN IF NOT EXISTS technologies text[] DEFAULT '{}'::text[],
  ADD COLUMN IF NOT EXISTS year text,
  ADD COLUMN IF NOT EXISTS duration text,
  ADD COLUMN IF NOT EXISTS testimonial_text text,
  ADD COLUMN IF NOT EXISTS testimonial_author text;
