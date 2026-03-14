/**
 * Client Supabase côté serveur uniquement (Service Role).
 * À utiliser dans les Server Components / Route Handlers pour contourner la RLS
 * et garantir que les données sont bien récupérées en production.
 * NE JAMAIS importer ce fichier dans un composant client.
 */
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || 'https://apbrupkcxsbrdbzyaspt.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_SERVICE_ROLE_KEY && process.env.NODE_ENV === 'production') {
  console.warn('[Supabase Server] SUPABASE_SERVICE_ROLE_KEY manquant en production. Le portfolio utilisera le fallback.');
}

export const supabaseServer = SUPABASE_SERVICE_ROLE_KEY
  ? createClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } })
  : null;
