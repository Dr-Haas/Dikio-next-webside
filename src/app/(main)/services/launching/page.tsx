import type { Metadata } from 'next';
import Launching from '@/pages/services/Launching';

export const metadata: Metadata = {
  title: 'Lancement Rapide de Projet | Dikio',
  description: "Lancez votre projet en 4 semaines. MVP fonctionnel, validation de concept, premiers utilisateurs. Transformez votre idée en réalité rapidement.",
  keywords: "lancement rapide, MVP, minimum viable product, startup, validation concept, développement rapide, projet digital",
};

export default function LaunchingPage() {
  return <Launching />;
}
