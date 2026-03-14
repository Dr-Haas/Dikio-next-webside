# Checklist : connecter la prod (dikio.fr) à Supabase

Ton projet Supabase **Site Dikio** est bien actif. Pour que le site en ligne fonctionne, vérifie les points suivants.

---

## 1. Variables d’environnement sur Vercel

Dans **Vercel** → ton projet → **Settings** → **Environment Variables** :

| Variable | Valeur | Environnement |
|----------|--------|----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://apbrupkcxsbrdbzyaspt.supabase.co` | **Production** et **Preview** |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | La clé **anon** (JWT longue) | **Production** et **Preview** |

### Où trouver la clé anon

1. [Supabase Dashboard](https://supabase.com/dashboard) → projet **Site Dikio**.
2. **Project Settings** (engrenage) → **API**.
3. Section **Legacy API Keys** (ou **Project API keys**) → copier la clé **anon** (commence par `eyJhbGci...`).

Important : utilise bien la clé **anon** (JWT), pas la clé « Publishable » (`sb_publishable_...`) pour `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Le client Supabase et l’appel à la fonction `lead-chat` ont besoin de cette JWT.

### Après avoir ajouté/modifié les variables

- **Redéployer** : **Deployments** → … sur le dernier déploiement → **Redeploy** (cocher **Use existing Build Cache** si tu veux).
- Les variables `NEXT_PUBLIC_*` sont prises au **moment du build** : un nouveau déploiement est nécessaire.

---

## 2. CORS dans Supabase

Pour que le navigateur sur `https://www.dikio.fr` puisse appeler Supabase :

1. Supabase Dashboard → projet **Site Dikio** → **Project Settings** → **API**.
2. Trouver **CORS** / **Allowed Origins** (ou **Additional origins**).
3. Ajouter :
   - `https://www.dikio.fr`
   - `https://dikio.fr`
4. Enregistrer.

---

## 3. Vérifier que tout est branché

- **Edge Function** : `lead-chat` est déployée sur le projet (confirmé côté Supabase).
- **Secret** : dans Supabase → **Edge Functions** → **lead-chat** → **Secrets**, la variable `OPENAI_API_KEY` doit être définie, sinon Léa ne pourra pas répondre.

---

## 4. Si ça ne marche toujours pas

1. **Onglet Réseau** (F12 → Network) sur https://www.dikio.fr/project-form ou /portfolio :
   - Requête vers `...supabase.co/...` en rouge → cliquer dessus et regarder l’erreur (401, 403, CORS, etc.).
2. Vérifier que les variables sont bien présentes **en production** : Vercel → **Settings** → **Environment Variables** → filtre **Production**.
3. S’assurer qu’un **nouveau build** a été fait après avoir ajouté les variables (pas seulement un déploiement depuis le même build).

---

Récap : **URL + clé anon (JWT)** sur Vercel pour Production et Preview, **CORS** avec `https://www.dikio.fr` et `https://dikio.fr` dans Supabase, puis **redéploiement**.
