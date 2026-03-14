'use client';


import React from 'react';
import { useTranslation } from 'react-i18next';

const StoryVision = () => {
  const { t } = useTranslation();
  
  return (
    <div className="grid md:grid-cols-2 gap-10 md:gap-16">
      <div>
        <h2 className="text-2xl font-bold mb-4">{t('aboutPage.storyTitle')}</h2>
        <div className="space-y-4">
          <p>{t('aboutPage.storyP1')}</p>
          <p>{t('aboutPage.storyP2')}</p>
          <p>{t('aboutPage.storyP3')}</p>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">{t('aboutPage.visionTitle')}</h2>
        <div className="space-y-4">
          <p>{t('aboutPage.visionP1')}</p>
          <p>{t('aboutPage.visionP2')}</p>
          <p>{t('aboutPage.visionP3')}</p>
        </div>
      </div>
    </div>
  );
};

export default StoryVision;
