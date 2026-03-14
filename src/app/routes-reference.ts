/**
 * Référence des routes du site (Next.js App Router).
 * Les routes sont définies par les dossiers sous src/app/, pas par ce fichier.
 * Ce fichier sert uniquement de doc / liste pour les devs.
 */
export const ROUTES = {
  home: '/',
  about: '/about',
  contact: '/contact',
  portfolio: '/portfolio',
  portfolioDetail: (id: string) => `/portfolio/${id}`,
  projectForm: '/project-form',
  services: '/services',
  servicesMarketing: '/services/marketing',
  servicesLaunching: '/services/launching',
  servicesStrategy: '/services/strategy',
  servicesBranding: '/services/branding',
  servicesAutomation: '/services/automation',
  ia: '/ia',
  caisseMedicale: '/caisse-medicale',
  caisseMedicaleDemande: '/caisse-medicale/demande',
  legalops: '/legalops',
  legalopsDemande: '/legalops/demande',
  archilo: '/archilo',
  gymOps: '/gym-ops',
  geoAlliance: '/geo-alliance',
  mentionsLegales: '/mentions-legales',
  politiqueConfidentialite: '/politique-confidentialite',
} as const;
