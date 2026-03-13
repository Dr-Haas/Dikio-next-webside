#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { GoogleGenAI } from "@google/genai";

// Initialiser Gemini avec la clé API depuis les variables d'environnement
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error("⚠️  GEMINI_API_KEY non définie. La génération d'images ne fonctionnera pas.");
}

// Le client récupère automatiquement la clé API depuis la variable d'environnement GEMINI_API_KEY
const ai = GEMINI_API_KEY ? new GoogleGenAI({}) : null;

const server = new Server(
  {
    name: "assets",
    version: "2.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Handler pour lister les outils
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "suggestAsset",
        description: "Suggère des assets visuels (images, icônes, illustrations) adaptés au contexte du projet.",
        inputSchema: {
          type: "object",
          properties: {
            context: {
              type: "string",
              description: "Contexte ou type d'asset recherché (ex: 'icône menu', 'illustration hero')",
            },
          },
          required: ["context"],
        },
      },
      {
        name: "generateImage",
        description: "Génère une image avec Gemini à partir d'une description textuelle.",
        inputSchema: {
          type: "object",
          properties: {
            prompt: {
              type: "string",
              description: "Description détaillée de l'image à générer (ex: 'Une illustration moderne d'un médecin avec un stéthoscope, style flat design, couleurs douces')",
            },
            style: {
              type: "string",
              description: "Style de l'image (ex: 'flat design', 'realistic', 'minimalist', '3D')",
              default: "modern",
            },
            aspectRatio: {
              type: "string",
              description: "Ratio d'aspect de l'image (ex: '16:9', '1:1', '4:3')",
              default: "1:1",
            },
          },
          required: ["prompt"],
        },
      },
    ],
  };
});

// Handler pour exécuter les outils
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "suggestAsset") {
    const context = args.context;
    
    return {
      content: [
        {
          type: "text",
          text: `🎨 **Suggestion d'assets pour : ${context}**

📦 **Sources recommandées :**
- Icons8 (illustrations modernes)
- Undraw (illustrations personnalisables)
- Lucide Icons (icônes React)
- Heroicons (icônes Tailwind)

💡 **Conseil :** Utilise des assets SVG pour une meilleure performance et scalabilité.
🖼️ **Astuce :** Tu peux aussi utiliser l'outil "generateImage" pour générer une image personnalisée avec Gemini !`,
        },
      ],
    };
  }

  if (name === "generateImage") {
    if (!ai) {
      return {
        content: [
          {
            type: "text",
            text: "❌ **Erreur :** La clé API Gemini n'est pas configurée.\n\nPour activer la génération d'images :\n1. Obtenez une clé API sur https://aistudio.google.com/app/apikey\n2. Ajoutez-la dans la configuration MCP sous la variable d'environnement `GEMINI_API_KEY`",
          },
        ],
        isError: true,
      };
    }

    try {
      const prompt = args.prompt;
      const style = args.style || "modern";
      const aspectRatio = args.aspectRatio || "1:1";

      // Construire le prompt optimisé pour Gemini
      const optimizationPrompt = `Tu es un expert en design graphique et création d'images. 

Crée une description ultra-détaillée et optimisée pour générer cette image :
- Description : ${prompt}
- Style : ${style}
- Ratio d'aspect : ${aspectRatio}

Fournis :
1. Une description visuelle très détaillée (couleurs exactes, composition, éléments visuels, style graphique)
2. Des suggestions de palette de couleurs spécifiques (codes hexadécimaux)
3. Des recommandations techniques (résolution recommandée, format optimal)
4. Des instructions pour un designer ou un outil de génération d'image

Sois très précis et créatif.`;

      // Utiliser la nouvelle API avec gemini-2.5-flash
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: optimizationPrompt,
      });

      const text = response.text;

      // Extraire les codes couleurs si présents
      const colorMatches = text.match(/#[0-9A-Fa-f]{6}/g) || [];
      const colors = colorMatches.length > 0 ? colorMatches.join(", ") : "Aucun code couleur spécifié";

      return {
        content: [
          {
            type: "text",
            text: `🖼️ **Génération d'image avec Gemini**

📝 **Prompt original :** ${prompt}
🎨 **Style :** ${style}
📐 **Ratio :** ${aspectRatio}

---

${text}

---

🎨 **Couleurs détectées :** ${colors}

💡 **Prochaines étapes :**
Pour générer l'image réelle, vous pouvez :
1. Utiliser cette description avec DALL-E, Midjourney ou Stable Diffusion
2. Utiliser l'API Imagen de Google Cloud (nécessite Google Cloud Platform)
3. Créer l'image manuellement avec un outil de design (Figma, Canva, etc.)

📋 **Pour une favicon :**
- Format recommandé : SVG ou PNG 32x32px / 64x64px
- Couleurs : Utilisez les codes hexadécimaux fournis ci-dessus
- Style : Simple et reconnaissable même à petite taille`,
          },
        ],
      };
    } catch (error) {
      console.error("Erreur lors de la génération d'image:", error);
      return {
        content: [
          {
            type: "text",
            text: `❌ **Erreur lors de la génération d'image :**\n\n${error.message}\n\nVérifiez que votre clé API Gemini est valide et que vous avez les permissions nécessaires.`,
          },
        ],
        isError: true,
      };
    }
  }
  
  throw new Error(`Outil inconnu: ${name}`);
});

// Démarrer le serveur
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("🎨 Assets MCP Server (avec Gemini) lancé sur stdio");
  if (GEMINI_API_KEY) {
    console.error("✅ Génération d'images Gemini activée");
  } else {
    console.error("⚠️  Génération d'images Gemini désactivée (GEMINI_API_KEY manquante)");
  }
}

main().catch((error) => {
  console.error("Erreur fatale:", error);
  process.exit(1);
});
