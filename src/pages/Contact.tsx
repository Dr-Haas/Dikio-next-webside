import React from 'react';
import SEO from '@/components/SEO';
import Contact from '@/components/Contact';

const ContactPage = () => {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Dikio",
    "description": "Contactez l'équipe Dikio pour discuter de votre projet",
    "url": "https://dikio.fr/contact"
  };

  return (
    <div className="min-h-screen bg-dikio-background">
      <SEO 
        title="Contact"
        description="Contactez Dikio pour discuter de votre projet. Notre équipe d'experts en growth marketing, IA et automatisation est prête à vous accompagner."
        keywords="contact dikio, demande devis, projet digital, consultation gratuite, agence growth"
        url="https://dikio.fr/contact"
        jsonLd={contactSchema}
      />
      <main>
        <Contact />
      </main>
    </div>
  );
};

export default ContactPage;
