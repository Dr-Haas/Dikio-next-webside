import type { Metadata } from 'next';
import ProjectForm from '@/pages/ProjectForm';

export const metadata: Metadata = {
  title: 'Démarrer votre projet | Dikio',
  description: "Discutez avec Léa, notre assistante IA, pour définir votre projet. En quelques minutes, obtenez un brief personnalisé et démarrez votre collaboration avec Dikio.",
  keywords: "démarrer projet, brief projet, chatbot IA, consultation gratuite, dikio",
};

export default function ProjectFormPage() {
  return <ProjectForm />;
}
