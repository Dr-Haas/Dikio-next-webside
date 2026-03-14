import type { Metadata } from 'next';
import Archilo from '@/pages/Archilo';

export const metadata: Metadata = {
  title: "Archilo - IA Souveraine pour Cabinets d'Avocats | Dikio",
  description: "Archilo : serveur physique sécurisé avec IA expert installé dans votre cabinet. Automatisez recherches juridiques, veilles et synthèses. Données 100% locales, conforme RGPD et secret professionnel.",
  keywords: "IA avocat, intelligence artificielle juridique, serveur local cabinet avocat, automatisation juridique, souveraineté données avocat, RGPD cabinet avocat, LegalTech France",
};

export default function ArchiloPage() {
  return <Archilo />;
}
