import { ProjectData } from '@/components/portfolio/ProjectCard';

// Définition des catégories pour le filtre
export const categories = [
  { id: "all", name: "Tous les projets" },
  { id: "site", name: "🌐 Sites web" },
  { id: "application", name: "📱 Applications" },
  { id: "ecommerce", name: "🛍️ E-commerce" },
  { id: "plateforme", name: "🔄 Plateformes" },
];

// Projets de fallback (utilisés si la base de données est vide)
export const fallbackProjects: ProjectData[] = [
  {
    id: "1",
    title: "Site Vitrine Entreprise",
    description: "Site web professionnel pour une entreprise de services",
    image_url: "/placeholder.svg",
    devices: ["desktop", "mobile"],
    tags: ["Responsive", "SEO", "UI/UX"],
    category: "site",
  },
  {
    id: "2",
    title: "Application Mobile Fitness",
    description: "Application de suivi de fitness et de nutrition",
    image_url: "/placeholder.svg",
    devices: ["mobile"],
    tags: ["React Native", "Health API", "UI/UX"],
    category: "application",
  },
  {
    id: "3",
    title: "Boutique en ligne Mode",
    description: "Plateforme e-commerce pour une marque de vêtements",
    image_url: "/placeholder.svg",
    devices: ["desktop", "mobile"],
    tags: ["E-commerce", "Paiement en ligne", "Catalogue"],
    category: "ecommerce",
  },
];

// Legacy export for backwards compatibility
export const portfolioProjects = fallbackProjects;
