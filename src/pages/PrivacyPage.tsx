'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
const PrivacyPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-dikio-background">
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-8 text-dikio-heading">{t('privacy.title')}</h1>
          
          <p className="text-gray-700 mb-6">
            {t('privacy.intro')}
          </p>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-dikio-heading">{t('privacy.section1.title')}</h2>
            <p className="text-gray-700">
              {t('privacy.section1.content')}
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-dikio-heading">{t('privacy.section2.title')}</h2>
            <p className="text-gray-700 mb-3">{t('privacy.section2.intro')}</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><span className="font-medium">{t('privacy.section2.item1')}</span></li>
              <li><span className="font-medium">{t('privacy.section2.item2')}</span></li>
              <li><span className="font-medium">{t('privacy.section2.item3')}</span></li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-dikio-heading">{t('privacy.section3.title')}</h2>
            <p className="text-gray-700 mb-3">{t('privacy.section3.intro')}</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>{t('privacy.section3.item1')}</li>
              <li>{t('privacy.section3.item2')}</li>
              <li>{t('privacy.section3.item3')}</li>
              <li>{t('privacy.section3.item4')}</li>
              <li>{t('privacy.section3.item5')}</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-dikio-heading">{t('privacy.section4.title')}</h2>
            <p className="text-gray-700">{t('privacy.section4.intro')}</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-3">
              <li>{t('privacy.section4.item1')}</li>
              <li>{t('privacy.section4.item2')}</li>
              <li>{t('privacy.section4.item3')}</li>
              <li>{t('privacy.section4.item4')}</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-dikio-heading">{t('privacy.section5.title')}</h2>
            <p className="text-gray-700">
              {t('privacy.section5.content')}
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-dikio-heading">{t('privacy.section6.title')}</h2>
            <p className="text-gray-700">{t('privacy.section6.intro')}</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-3">
              <li>{t('privacy.section6.item1')}</li>
              <li>{t('privacy.section6.item2')}</li>
              <li>{t('privacy.section6.item3')}</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-dikio-heading">{t('privacy.section7.title')}</h2>
            <p className="text-gray-700 mb-3">{t('privacy.section7.intro')}</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><span className="font-medium">{t('privacy.section7.access')}</span></li>
              <li><span className="font-medium">{t('privacy.section7.rectification')}</span></li>
              <li><span className="font-medium">{t('privacy.section7.erasure')}</span></li>
              <li><span className="font-medium">{t('privacy.section7.restriction')}</span></li>
              <li><span className="font-medium">{t('privacy.section7.portability')}</span></li>
              <li><span className="font-medium">{t('privacy.section7.objection')}</span></li>
            </ul>
            <p className="text-gray-700 mt-4">
              {t('privacy.section7.contact')} <span className="font-medium">contact@dikio.studio</span>
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-dikio-heading">{t('privacy.section8.title')}</h2>
            <p className="text-gray-700">
              {t('privacy.section8.content')}
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-dikio-heading">{t('privacy.section9.title')}</h2>
            <p className="text-gray-700">
              {t('privacy.section9.content')}
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-dikio-heading">{t('privacy.section10.title')}</h2>
            <p className="text-gray-700">
              {t('privacy.section10.content')}
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-dikio-heading">{t('privacy.section11.title')}</h2>
            <p className="text-gray-700">
              {t('privacy.section11.content')} <span className="font-medium">contact@dikio.studio</span>
              <br/><br/>
              {t('privacy.section11.cnil')} <a href="https://www.cnil.fr" className="text-dikio-accent hover:underline" target="_blank" rel="noopener noreferrer">www.cnil.fr</a>
            </p>
          </section>
          
          <p className="text-sm text-gray-500 mt-8">
            {t('privacy.lastUpdate')}
          </p>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPage;
