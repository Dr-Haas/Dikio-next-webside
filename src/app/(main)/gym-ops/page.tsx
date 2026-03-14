import type { Metadata } from 'next';
import GymOps from '@/pages/GymOps';

export const metadata: Metadata = {
  title: 'GymOps | Indépendance digitale pour salles de fitness | Dikio',
  description: "Arrêtez de payer 7 SaaS. On construit vos propres outils : booking, CRM, automatisation IA. Tout vous appartient. Pour les gérants de salles indépendants.",
  keywords: "outils salle de sport, indépendance digitale fitness, alternative mindbody, CRM gym sur mesure, automatisation salle de sport",
};

export default function GymOpsPage() {
  return <GymOps />;
}
