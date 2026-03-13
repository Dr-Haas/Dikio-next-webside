-- Add company column to lead_ideas table
ALTER TABLE public.lead_ideas 
ADD COLUMN IF NOT EXISTS company TEXT;