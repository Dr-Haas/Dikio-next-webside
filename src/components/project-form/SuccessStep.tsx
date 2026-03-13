
import React from 'react';
import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SuccessStep = () => {
  const { t } = useTranslation();
  
  return (
    <div className="flex flex-col items-center justify-center py-10 space-y-6 animate-fade-in">
      <div className="w-32 h-32 bg-dikio-accent rounded-full flex items-center justify-center">
        <Check className="text-white w-16 h-16" />
      </div>
      
      <h2 className="text-3xl font-bold text-dikio-title text-center">{t('projectForm.success.title')}</h2>
      <p className="text-lg text-center max-w-md">
        {t('projectForm.success.description')}
      </p>
    </div>
  );
};

export default SuccessStep;
