import type { Metadata } from 'next';
import Marketing from '@/pages/services/Marketing';

export const metadata: Metadata = {
  title: 'Growth Marketing & Ads | Dikio',
  description: "Boostez votre croissance avec des stratégies marketing innovantes. Google Ads, réseaux sociaux, SEO, contenu engageant. Maximisez votre ROI.",
  keywords: "growth marketing, google ads, facebook ads, SEO, marketing digital, publicité en ligne, ROI, campagnes publicitaires",
};

export default function MarketingPage() {
  return <Marketing />;
}
