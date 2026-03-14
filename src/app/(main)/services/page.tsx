import type { Metadata } from 'next';
import ServicesPage from '@/pages/ServicesPage';

export const metadata: Metadata = {
  title: 'Nos Services | Dikio',
  description: "Découvrez nos services : lancement rapide, branding, automatisation IA, growth marketing et accompagnement stratégique. Transformez votre vision en réalité.",
  keywords: "services dikio, growth marketing, automatisation IA, branding, lancement projet, stratégie digitale, MVP",
};

export default function ServicesRoutePage() {
  return <ServicesPage />;
}
