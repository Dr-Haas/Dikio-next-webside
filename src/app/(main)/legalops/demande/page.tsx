import type { Metadata } from 'next';
import LegalOpsForm from '@/pages/LegalOpsForm';

export const metadata: Metadata = {
  title: 'Demander un audit LegalOps | Dikio',
  description: "Répondez à quelques questions pour recevoir un diagnostic personnalisé de vos opérations.",
};

export default function LegalOpsDemandePage() {
  return <LegalOpsForm />;
}
