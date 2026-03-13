-- Fix RLS policy for lead_ideas to allow anonymous inserts
DROP POLICY IF EXISTS "Allow public inserts" ON public.lead_ideas;

CREATE POLICY "Allow public inserts" 
ON public.lead_ideas 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);