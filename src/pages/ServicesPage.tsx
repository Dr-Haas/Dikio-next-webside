import React from 'react';
import SEO from '@/components/SEO';
import Services from '@/components/Services';

const ServicesPage = () => {
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Services Dikio",
    "itemListElement": [
      {
        "@type": "Service",
        "position": 1,
        "name": "Lancement Rapide",
        "description": "Lancez votre projet en 4 semaines avec un MVP fonctionnel"
      },
      {
        "@type": "Service",
        "position": 2,
        "name": "Branding & Image",
        "description": "Créez une identité visuelle mémorable et impactante"
      },
      {
        "@type": "Service",
        "position": 3,
        "name": "Automatisation & IA",
        "description": "Automatisez vos processus avec l'intelligence artificielle"
      },
      {
        "@type": "Service",
        "position": 4,
        "name": "Growth Marketing",
        "description": "Accélérez votre croissance avec des campagnes optimisées"
      },
      {
        "@type": "Service",
        "position": 5,
        "name": "Accompagnement Stratégique",
        "description": "Structurez votre vision avec un coaching personnalisé"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-dikio-background">
      <SEO 
        title="Nos Services"
        description="Découvrez nos services : lancement rapide, branding, automatisation IA, growth marketing et accompagnement stratégique. Transformez votre vision en réalité."
        keywords="services dikio, growth marketing, automatisation IA, branding, lancement projet, stratégie digitale, MVP"
        url="https://dikio.fr/services"
        jsonLd={servicesSchema}
      />
      <main>
        <Services />
      </main>
    </div>
  );
};

export default ServicesPage;
