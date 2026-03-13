import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '@/components/SEO';

const LegalPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-dikio-background">
      <SEO 
        title="Mentions Légales"
        description="Mentions légales de Dikio Studio. Informations sur l'éditeur, l'hébergeur, la propriété intellectuelle et les conditions d'utilisation."
        keywords="mentions légales, dikio, conditions utilisation, propriété intellectuelle"
        url="https://dikio.fr/mentions-legales"
      />
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-8 text-dikio-heading">{t('legal.title')}</h1>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-dikio-heading">{t('legal.editor.title')}</h2>
            <p className="mb-2">{t('legal.editor.intro')}</p>
            <ul className="space-y-2 text-gray-700">
              <li><span className="font-medium">{t('legal.editor.company')}</span> DIKIO</li>
              <li><span className="font-medium">{t('legal.editor.form')}</span> SASU, société par actions simplifiée unipersonnelle</li>
              <li><span className="font-medium">{t('legal.editor.address')}</span> 6 rue de Saint-Pétersbourg, 75008 Paris, France</li>
              <li><span className="font-medium">{t('legal.editor.email')}</span> gary.h@dikio.fr</li>
              <li><span className="font-medium">{t('legal.editor.phone')}</span> 06 99 02 87 08</li>
              <li><span className="font-medium">{t('legal.editor.siret')}</span> 921 491 775 00018</li>
              <li><span className="font-medium">SIREN : </span> 921 491 775</li>
              <li><span className="font-medium">N° TVA intracommunautaire : </span> FR72921491775</li>
              <li><span className="font-medium">{t('legal.editor.rcs')}</span> 921 491 775 R.C.S. Paris</li>
              <li><span className="font-medium">Capital social : </span> 1 000,00 €</li>
              <li><span className="font-medium">{t('legal.editor.director')}</span> Gary Haas</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-dikio-heading">{t('legal.hosting.title')}</h2>
            <p className="mb-2">{t('legal.hosting.intro')}</p>
            <ul className="space-y-1 text-gray-700">
              <li>OVH SAS</li>
              <li>2 rue Kellermann</li>
              <li>59100 Roubaix - France</li>
              <li>Tél. : 1007</li>
              <li>Site web : <a href="https://www.ovh.com" className="text-dikio-accent hover:underline" target="_blank" rel="noopener noreferrer">www.ovh.com</a></li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-dikio-heading">{t('legal.intellectual.title')}</h2>
            <p className="text-gray-700">
              {t('legal.intellectual.content')}
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-dikio-heading">{t('legal.responsibility.title')}</h2>
            <p className="text-gray-700">
              {t('legal.responsibility.content')}
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-dikio-heading">{t('legal.personalData.title')}</h2>
            <p className="text-gray-700">
              {t('legal.personalData.content')}
              <br/><br/>
              {t('legal.personalData.gdpr')} gary.h@dikio.fr
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-dikio-heading">{t('legal.cookiesSection.title')}</h2>
            <p className="text-gray-700">
              {t('legal.cookiesSection.content')}
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LegalPage;
