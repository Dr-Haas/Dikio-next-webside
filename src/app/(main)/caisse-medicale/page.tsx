import type { Metadata } from 'next';
import CaisseMedicale from '@/pages/CaisseMedicale';

export const metadata: Metadata = {
  title: 'Optimisation Trésorerie Cabinets Médicaux | Dikio',
  description: "Détectez les pertes financières cachées de votre cabinet médical ou dentaire. Automatisation complète de la gestion de caisse : rapprochement CB, débiteurs, clôture. Résultats dès le premier mois.",
  keywords: "gestion caisse cabinet médical, automatisation facturation santé, débiteurs patients, rapprochement CB TPE, trésorerie cabinet dentaire, pertes financières santé",
};

export default function CaisseMedicalePage() {
  return <CaisseMedicale />;
}
