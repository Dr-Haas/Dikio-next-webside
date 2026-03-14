import type { Metadata } from 'next';
import Strategy from '@/pages/services/Strategy';

export const metadata: Metadata = {
  title: 'Accompagnement Stratégique | Dikio',
  description: "Structurez votre projet avec un coaching personnalisé. Définition des objectifs, parcours client, métriques de croissance. De l'idée au business viable.",
  keywords: "accompagnement stratégique, coaching, business plan, stratégie digitale, croissance, startup, entrepreneuriat",
};

export default function StrategyPage() {
  return <Strategy />;
}
