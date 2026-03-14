'use client';


import React from 'react';
import Link from 'next/link';
import { ArrowRight, Rocket, Palette, Bot, Megaphone, Briefcase } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface OtherServicesProps {
  currentServicePath: string;
}

const OtherServices: React.FC<OtherServicesProps> = ({ currentServicePath }) => {
  const { t } = useTranslation();
  
  const allServices = [
    {
      title: t('servicesPage.otherServices.launching.title'),
      description: t('servicesPage.otherServices.launching.description'),
      icon: Rocket,
      link: "/services/launching"
    },
    {
      title: t('servicesPage.otherServices.branding.title'),
      description: t('servicesPage.otherServices.branding.description'),
      icon: Palette,
      link: "/services/branding"
    },
    {
      title: t('servicesPage.otherServices.automation.title'),
      description: t('servicesPage.otherServices.automation.description'),
      icon: Bot,
      link: "/services/automation"
    },
    {
      title: t('servicesPage.otherServices.marketing.title'),
      description: t('servicesPage.otherServices.marketing.description'),
      icon: Megaphone,
      link: "/services/marketing"
    },
    {
      title: t('servicesPage.otherServices.strategy.title'),
      description: t('servicesPage.otherServices.strategy.description'),
      icon: Briefcase,
      link: "/services/strategy"
    }
  ];

  const otherServices = allServices.filter(service => service.link !== currentServicePath);

  return (
    <section className="py-20 bg-dikio-background">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold tracking-widest uppercase text-dikio-subtitle mb-3">
            Explorer
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-dikio-title" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t('servicesPage.otherServices.title')}
          </h2>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {otherServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link
                key={index}
                href={service.link}
                className="group relative flex flex-col p-6 rounded-2xl border border-dikio-title/10 bg-white/60 backdrop-blur-sm transition-all duration-300 hover:border-dikio-subtitle/30 hover:shadow-lg hover:shadow-dikio-subtitle/5 hover:-translate-y-1"
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 bg-dikio-subtitle/10 group-hover:bg-dikio-subtitle/15 transition-colors duration-300">
                  <Icon className="w-5 h-5 text-dikio-subtitle" />
                </div>
                <h3 className="text-base font-bold text-dikio-title mb-2 leading-tight">
                  {service.title}
                </h3>
                <p className="text-sm text-dikio-paragraph/70 leading-relaxed flex-1 mb-4">
                  {service.description}
                </p>
                <div className="flex items-center gap-1.5 text-sm font-semibold text-dikio-subtitle group-hover:gap-2.5 transition-all duration-300">
                  {t('servicesPage.otherServices.discover')}
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OtherServices;
