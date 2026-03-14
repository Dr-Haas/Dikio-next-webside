import type { Metadata } from 'next';
import IALanding from '@/pages/IALanding';

export const metadata: Metadata = {
  title: "IA & Automatisation pour votre Business | Dikio",
  description: "L'IA n'est plus une option, c'est un multiplicateur de puissance. Découvrez comment transformer votre entreprise avec l'intelligence artificielle stratégique.",
  keywords: "intelligence artificielle, IA business, automatisation entreprise, transformation digitale, AI strategy, chatbot IA, productivité IA",
};

export default function IAPage() {
  return <IALanding />;
}
