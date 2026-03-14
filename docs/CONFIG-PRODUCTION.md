# Configuration production (Vercel + Supabase)

Pour que https://www.dikio.fr fonctionne avec Supabase (portfolio, formulaire Léa, etc.).

---

## Option recommandée : connecter Supabase à Vercel

En reliant ton **projet Supabase** à **Vercel** via l’intégration officielle, les variables d’environnement sont **synchronisées automatiquement**. Plus besoin de les saisir à la main.

### Étapes

1. **Vercel** → ton projet → **Settings** → **Integrations** (ou [Vercel Marketplace](https://vercel.com/integrations)).
2. Chercher **Supabase** et installer l’intégration.
3. Lors de la configuration, **lier ton projet Supabase existant** (celui avec l’URL `apbrupkcxsbrdbzyaspt.supabase.co`).
4. Les variables suivantes sont alors ajoutées automatiquement sur le projet Vercel :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (clé anon)

Le code accepte les deux noms de clé. **Attention** : l’intégration peut synchroniser la clé « Publishable » (`sb_publishable_...`), alors que le client et l’appel à `lead-chat` fonctionnent mieux avec la clé **anon** (JWT). Si en prod ça ne se connecte pas, ajoute manuellement **`NEXT_PUBLIC_SUPABASE_ANON_KEY`** avec la clé anon (Supabase Dashboard → Settings → API → anon) et redéploie. Voir **VERCEL-SUPABASE-CHECKLIST.md** pour la checklist détaillée.

5. **Redéployer** le projet (Deployments → … → Redeploy) pour que le build utilise les nouvelles variables.

---

## Config manuelle (si tu n’utilises pas l’intégration)

Si tu préfères ne pas connecter Supabase à Vercel :

- **Vercel** → **Settings** → **Environment Variables** : ajouter à la main  
  `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY`  
  (valeurs dans Supabase Dashboard → Project Settings → API).

---

## Supabase – CORS (à faire dans tous les cas)

Pour que le navigateur sur **dikio.fr** puisse appeler l’API et les Edge Functions :

1. [Supabase Dashboard](https://supabase.com/dashboard) → ton projet.
2. **Project Settings** → **API**.
3. Section **CORS** / **Allowed Origins** : ajouter `https://www.dikio.fr` et `https://dikio.fr`, puis enregistrer.

---

## Edge Function `lead-chat` (Léa)

La page **Démarrer votre projet** utilise la fonction `lead-chat`. Elle doit être déployée et avoir le secret OpenAI.

- **Déploiement** (CLI Supabase, projet déjà lié) :
  ```bash
  supabase functions deploy lead-chat
  ```
- **Secret** : dans le Dashboard Supabase, **Edge Functions** → **lead-chat** → **Secrets** → ajouter `OPENAI_API_KEY`.

---

## Récap

| Action | Option intégration | Option manuelle |
|--------|--------------------|-----------------|
| Variables Supabase sur Vercel | ✅ Synchro auto | Saisie manuelle de `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| CORS Supabase | À faire dans le Dashboard | Idem |
| Edge Function `lead-chat` + `OPENAI_API_KEY` | À faire (deploy + secret) | Idem |

En connectant Supabase à Vercel, tu évites toute la partie config des variables ; il reste la config CORS et le déploiement / secret de la fonction Léa.
