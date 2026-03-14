import type { Metadata } from 'next';
import PrivacyPage from '@/pages/PrivacyPage';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité | Dikio',
  description: "Politique de confidentialité de Dikio. Découvrez comment nous collectons, utilisons et protégeons vos données personnelles conformément au RGPD.",
  keywords: "politique confidentialité, RGPD, données personnelles, protection vie privée, cookies",
};

export default function PolitiqueConfidentialitePage() {
  return <PrivacyPage />;
}
