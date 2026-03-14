import type { Metadata } from 'next';
import CaisseMedicaleForm from '@/pages/CaisseMedicaleForm';

export const metadata: Metadata = {
  title: 'Pré-qualification | Caisse Médicale | Dikio',
  description: "Répondez à quelques questions pour recevoir une analyse personnalisée de votre gestion de caisse.",
};

export default function CaisseMedicaleDemandePage() {
  return <CaisseMedicaleForm />;
}
