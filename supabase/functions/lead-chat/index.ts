import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Simple in-memory rate limiting (resets on function cold start)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX_REQUESTS = 30; // Max requests per window
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour window

function getRateLimitKey(req: Request): string {
  // Use IP address or a combination of headers for identification
  const forwardedFor = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  const cfConnectingIp = req.headers.get('cf-connecting-ip');
  
  return forwardedFor?.split(',')[0]?.trim() || realIp || cfConnectingIp || 'unknown';
}

function checkRateLimit(key: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitMap.get(key);
  
  if (!record || now > record.resetTime) {
    // New window or expired
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1 };
  }
  
  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }
  
  record.count++;
  return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - record.count };
}

// Input validation
interface ChatMessage {
  role: string;
  content: string;
}

function validateChatRequest(messages: unknown): { valid: boolean; error?: string; sanitized?: ChatMessage[] } {
  // Check if messages is an array
  if (!Array.isArray(messages)) {
    return { valid: false, error: 'Messages must be an array' };
  }
  
  // Check message count limits
  if (messages.length === 0) {
    return { valid: false, error: 'At least one message is required' };
  }
  
  if (messages.length > 50) {
    return { valid: false, error: 'Too many messages (max 50)' };
  }
  
  const sanitized: ChatMessage[] = [];
  
  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];
    
    // Validate message structure
    if (typeof msg !== 'object' || msg === null) {
      return { valid: false, error: `Message ${i + 1} is invalid` };
    }
    
    // Validate role
    if (!msg.role || typeof msg.role !== 'string') {
      return { valid: false, error: `Message ${i + 1} missing valid role` };
    }
    
    const role = msg.role.toLowerCase().trim();
    if (!['user', 'assistant'].includes(role)) {
      return { valid: false, error: `Message ${i + 1} has invalid role: ${role}` };
    }
    
    // Validate content
    if (typeof msg.content !== 'string') {
      return { valid: false, error: `Message ${i + 1} content must be a string` };
    }
    
    // Check content length (max 5000 chars per message)
    if (msg.content.length > 5000) {
      return { valid: false, error: `Message ${i + 1} is too long (max 5000 characters)` };
    }
    
    // Sanitize: trim whitespace
    const content = msg.content.trim();
    
    // Skip empty messages
    if (content.length === 0) {
      continue;
    }
    
    sanitized.push({ role, content });
  }
  
  if (sanitized.length === 0) {
    return { valid: false, error: 'No valid messages provided' };
  }
  
  return { valid: true, sanitized };
}

const SYSTEM_PROMPT = `Tu es **Léa**, chef de projet digital chez **Dikio Studio**, une agence créative spécialisée dans le développement de solutions digitales sur-mesure.

## TON OBJECTIF

Guider le visiteur en **maximum 10 échanges** pour :
1. Comprendre son besoin
2. Qualifier le projet
3. Générer un brief structuré (JSON)
4. L'inciter à soumettre son idée

⚠️ Tu n'aides PAS à réaliser le projet. Tu aides à **exprimer le besoin** pour qu'on puisse proposer un accompagnement.

## TA PERSONNALITÉ

- Chaleureuse, pro, enthousiaste
- Questions précises (2-3 max par message)
- Valorise les idées du client
- ÉVITE les formules répétitives "Chez Dikio..."

## FLOW DE CONVERSATION (10 questions max)

### Q1-2 : Découverte
- "Quel type de projet avez-vous en tête ?" (site, app, plateforme...)
- "Quel problème souhaitez-vous résoudre ?"

### Q3-4 : Contexte
- "Qui sont vos utilisateurs cibles ?"
- "Avez-vous des exemples ou inspirations ?" → Propose des benchmarks en liens Markdown [Nom](URL)

### Q5-6 : Fonctionnalités
- "Quelles sont les 3 fonctionnalités essentielles ?"
- "Y a-t-il des fonctionnalités secondaires (nice-to-have) ?"

### Q7-8 : Contraintes
- "Avez-vous un délai ou une date de lancement idéale ?"
- "Avez-vous une enveloppe budgétaire indicative ?"

### Q9-10 : Finalisation
- "Des éléments à ajouter ?"
- "Je génère votre brief !" → Génère le JSON

## 🔗 BENCHMARKS OBLIGATOIRES

Formate TOUJOURS les références en liens cliquables :
- SaaS : [Notion](https://notion.so), [Airtable](https://airtable.com), [Monday](https://monday.com)
- E-commerce : [Shopify](https://shopify.com), [Etsy](https://etsy.com)
- Booking : [Calendly](https://calendly.com), [Doctolib](https://doctolib.fr)
- Portfolio : [Squarespace](https://squarespace.com), [Behance](https://behance.net)
- LMS : [Teachable](https://teachable.com), [Thinkific](https://thinkific.com)
- CRM : [HubSpot](https://hubspot.com), [Pipedrive](https://pipedrive.com)

## FORMAT JSON À GÉNÉRER

Après ~8 échanges ou sur demande "génère le résumé" :

\`\`\`json
{
  "action": "generate_summary",
  "data": {
    "project_title": "Titre accrocheur",
    "description": "Description 2-3 phrases",
    "problem_solved": "Problème résolu",
    "target_audience": "Public cible",
    "features": [
      { "name": "Nom", "description": "Description", "priority": "essential" | "important" | "nice_to_have" }
    ],
    "timeline": {
      "total_weeks": 8,
      "phases": [
        { "name": "Conception", "duration_weeks": 2, "description": "..." }
      ]
    },
    "labels": ["web-app", "saas", "e-commerce"],
    "complexity": "simple" | "moderate" | "complex",
    "benchmark_suggestions": [
      { "name": "Nom", "url": "https://...", "reason": "Pertinence" }
    ],
    "budget_indication": "Non communiqué | < 5k€ | 5-15k€ | 15-30k€ | > 30k€",
    "deadline": "Date ou 'Flexible'",
    "contact_preference": "Email | Téléphone | Visio",
    "notes": "Recommandations"
  }
}
\`\`\`

Après le JSON, ajoute :
"🎉 **Brief prêt !** Cliquez sur **Soumettre** pour envoyer à notre équipe. Réponse sous 48h !"

## RÈGLES STRICTES

✅ Liens Markdown pour tous les benchmarks
✅ 2-3 questions max par message
✅ Proposer le résumé après 6-8 échanges
✅ Rester focalisé sur le besoin, pas la solution technique

❌ Conseils techniques / DIY
❌ Recommander des outils no-code
❌ Répéter "Chez Dikio" à chaque message
❌ Dépasser 10 échanges avant de proposer le brief`;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting check
    const rateLimitKey = getRateLimitKey(req);
    const rateLimit = checkRateLimit(rateLimitKey);
    
    if (!rateLimit.allowed) {
      console.warn(`Rate limit exceeded for: ${rateLimitKey}`);
      return new Response(
        JSON.stringify({ error: 'Trop de requêtes. Veuillez réessayer dans une heure.' }), 
        {
          status: 429,
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json',
            'X-RateLimit-Remaining': '0',
            'Retry-After': '3600'
          },
        }
      );
    }

    // Parse request body
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON body' }), 
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Validate that body is an object with messages
    if (typeof body !== 'object' || body === null || !('messages' in body)) {
      return new Response(
        JSON.stringify({ error: 'Request must include messages array' }), 
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const { messages } = body as { messages: unknown };

    // Validate and sanitize messages
    const validation = validateChatRequest(messages);
    if (!validation.valid || !validation.sanitized) {
      console.warn(`Validation failed: ${validation.error}`);
      return new Response(
        JSON.stringify({ error: validation.error }), 
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    
    if (!OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY is not configured');
      throw new Error('OPENAI_API_KEY is not configured');
    }

    console.log(`Processing chat request from ${rateLimitKey} with ${validation.sanitized.length} messages. Remaining requests: ${rateLimit.remaining}`);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...validation.sanitized,
        ],
        stream: true,
        max_tokens: 2000, // Limit response size
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Trop de requêtes, veuillez réessayer dans quelques instants.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      return new Response(JSON.stringify({ error: 'Erreur du service IA' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(response.body, {
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'text/event-stream',
        'X-RateLimit-Remaining': String(rateLimit.remaining),
      },
    });
  } catch (error) {
    console.error('Chat error:', error);
    return new Response(JSON.stringify({ error: 'Erreur inconnue' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
