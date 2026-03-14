'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { X, Cookie } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const COOKIE_CONSENT_KEY = 'dikio_cookie_consent';

const CookieConsent = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!savedConsent) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({
      ...prefs,
      timestamp: new Date().toISOString(),
    }));
    setIsVisible(false);
  };

  const acceptAll = () => {
    savePreferences({ necessary: true, analytics: true, marketing: true });
  };

  const refuseAll = () => {
    savePreferences({ necessary: true, analytics: false, marketing: false });
  };

  const saveCustom = () => {
    savePreferences(preferences);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-in slide-in-from-bottom duration-500">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
        {!showDetails ? (
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-dikio-accent/10 rounded-full shrink-0">
                <Cookie className="h-6 w-6 text-dikio-accent" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-dikio-heading mb-2">
                  {t('cookies.title')}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {t('cookies.description')}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button 
                    onClick={acceptAll}
                    className="bg-dikio-accent hover:bg-dikio-accent-light text-white"
                  >
                    {t('cookies.acceptAll')}
                  </Button>
                  <Button 
                    onClick={refuseAll}
                    variant="outline"
                    className="border-gray-300"
                  >
                    {t('cookies.refuseAll')}
                  </Button>
                  <Button 
                    onClick={() => setShowDetails(true)}
                    variant="ghost"
                    className="text-dikio-accent hover:text-dikio-accent-light"
                  >
                    {t('cookies.customize')}
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  {t('cookies.learnMore')}{' '}
                  <Link href="/politique-confidentialite" className="text-dikio-accent hover:underline">
                    {t('cookies.privacyPolicy')}
                  </Link>
                </p>
              </div>
              <button
                onClick={refuseAll}
                className="text-gray-400 hover:text-gray-600 transition-colors shrink-0"
                aria-label={t('cookies.close')}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-dikio-heading">
                {t('cookies.settingsTitle')}
              </h3>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label={t('cookies.close')}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-dikio-heading">{t('cookies.necessary.title')}</p>
                  <p className="text-sm text-gray-500">
                    {t('cookies.necessary.description')}
                  </p>
                </div>
                <div className="w-12 h-6 bg-dikio-accent rounded-full flex items-center justify-end px-1">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
              
              <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                <div>
                  <p className="font-medium text-dikio-heading">{t('cookies.analytics.title')}</p>
                  <p className="text-sm text-gray-500">
                    {t('cookies.analytics.description')}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                  className="w-5 h-5 accent-dikio-accent"
                />
              </label>
              
              <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                <div>
                  <p className="font-medium text-dikio-heading">{t('cookies.marketing.title')}</p>
                  <p className="text-sm text-gray-500">
                    {t('cookies.marketing.description')}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                  className="w-5 h-5 accent-dikio-accent"
                />
              </label>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button 
                onClick={saveCustom}
                className="bg-dikio-accent hover:bg-dikio-accent-light text-white"
              >
                {t('cookies.savePreferences')}
              </Button>
              <Button 
                onClick={acceptAll}
                variant="outline"
                className="border-gray-300"
              >
                {t('cookies.acceptAll')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieConsent;
