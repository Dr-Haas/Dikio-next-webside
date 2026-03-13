-- Create lead_ideas table for prospects (non-clients)
CREATE TABLE public.lead_ideas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Contact info
  email TEXT,
  full_name TEXT,
  phone TEXT,
  contact_preference TEXT,
  
  -- Project brief (generated JSON)
  project_title TEXT NOT NULL,
  description TEXT,
  problem_solved TEXT,
  target_audience TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  timeline JSONB,
  labels TEXT[] DEFAULT '{}',
  complexity TEXT CHECK (complexity IN ('simple', 'moderate', 'complex')),
  benchmark_suggestions JSONB DEFAULT '[]'::jsonb,
  budget_indication TEXT,
  deadline TEXT,
  notes TEXT,
  
  -- Conversation history
  conversation_history JSONB DEFAULT '[]'::jsonb,
  
  -- Metadata
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'archived')),
  source TEXT DEFAULT 'chatbot',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.lead_ideas ENABLE ROW LEVEL SECURITY;

-- Public insert policy (anyone can submit an idea)
CREATE POLICY "Anyone can submit a lead idea" 
ON public.lead_ideas 
FOR INSERT 
WITH CHECK (true);

-- Only admins can view/update lead ideas
CREATE POLICY "Admins can view lead ideas" 
ON public.lead_ideas 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update lead ideas" 
ON public.lead_ideas 
FOR UPDATE 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete lead ideas" 
ON public.lead_ideas 
FOR DELETE 
USING (public.has_role(auth.uid(), 'admin'));

-- Trigger for updated_at
CREATE TRIGGER update_lead_ideas_updated_at
BEFORE UPDATE ON public.lead_ideas
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add index for status filtering
CREATE INDEX idx_lead_ideas_status ON public.lead_ideas(status);
CREATE INDEX idx_lead_ideas_created_at ON public.lead_ideas(created_at DESC);