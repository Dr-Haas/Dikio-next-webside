import type { Metadata } from 'next';
import LegalPage from '@/pages/LegalPage';

export const metadata: Metadata = {
  title: 'Mentions Légales | Dikio',
  description: "Mentions légales de Dikio Studio. Informations sur l'éditeur, l'hébergeur, la propriété intellectuelle et les conditions d'utilisation.",
  keywords: "mentions légales, dikio, conditions utilisation, propriété intellectuelle",
};

export default function MentionsLegalesPage() {
  return <LegalPage />;
}
