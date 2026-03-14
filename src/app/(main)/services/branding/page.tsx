import type { Metadata } from 'next';
import Branding from '@/pages/services/Branding';

export const metadata: Metadata = {
  title: 'Branding & Image de marque | Dikio',
  description: "Créez une identité visuelle mémorable. Logo, charte graphique, storytelling de marque. Démarquez-vous avec une image forte et cohérente.",
  keywords: "branding, identité visuelle, logo, charte graphique, image de marque, design, storytelling, communication visuelle",
};

export default function BrandingPage() {
  return <Branding />;
}
