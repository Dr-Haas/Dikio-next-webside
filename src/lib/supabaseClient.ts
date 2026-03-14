// Untyped Supabase client for tables not yet in the generated types
import { createClient } from '@supabase/supabase-js';

// Compatible intégration Vercel–Supabase : PUBLISHABLE_KEY = anon key
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://apbrupkcxsbrdbzyaspt.supabase.co";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwYnJ1cGtjeHNicmRienlhc3B0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4NzM2NDEsImV4cCI6MjA4MzQ0OTY0MX0.rvr_O8Fe48yjU06346s7bN0O5CiOIGBBRIahei_9z2Y";

// Untyped client for custom tables
export const supabaseUntyped = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
