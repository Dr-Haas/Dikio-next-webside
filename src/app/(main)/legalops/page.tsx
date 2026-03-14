import type { Metadata } from 'next';
import LegalOps from '@/pages/LegalOps';

export const metadata: Metadata = {
  title: 'Audit LegalOps · Dikio',
  description: "Le seul audit opérationnel 100% indépendant pour cabinets d'avocats. Pas de logiciel à vendre. Un diagnostic objectif pour décider en connaissance de cause.",
  keywords: "legalops, audit cabinet avocats, diagnostic opérationnel, legaltech indépendant, cahier des charges IT cabinet",
};

export default function LegalOpsPage() {
  return <LegalOps />;
}
