import type { Metadata } from 'next';
import Automation from '@/pages/services/Automation';

export const metadata: Metadata = {
  title: 'Automatisation & IA | Dikio',
  description: "Automatisez vos processus avec l'intelligence artificielle. Chatbots, CRM automatisé, workflows intelligents. Gagnez du temps et boostez votre productivité.",
  keywords: "automatisation IA, intelligence artificielle, chatbot, CRM automatisé, workflow, no-code, low-code, productivité",
};

export default function AutomationPage() {
  return <Automation />;
}
