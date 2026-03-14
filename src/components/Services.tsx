'use client';

import React from 'react';
import { Rocket, Palette, Bot, Megaphone, Briefcase, ArrowRight, Scale, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const Services = () => {
  const { t } = useTranslation();

  const serviceData = [
    {
      titleKey: "services.automation.title",
      descriptionKey: "services.automation.description",
      icon: Bot,
      link: "/services/automation",
      highlight: true
    },
    {
      titleKey: "services.legal.title",
      descriptionKey: "services.legal.description",
      icon: Scale,
      link: "/archilo",
      highlight: false
    },
    {
      titleKey: "services.medical.title",
      descriptionKey: "services.medical.description",
      icon: Stethoscope,
      link: "/caisse-medicale",
      highlight: false
    },
    {
      titleKey: "services.launching.title",
      descriptionKey: "services.launching.description",
      icon: Rocket,
      link: "/services/launching",
      highlight: false
    },
    {
      titleKey: "services.branding.title",
      descriptionKey: "services.branding.description",
      icon: Palette,
      link: "/services/branding",
      highlight: false
    },
    {
      titleKey: "services.marketing.title",
      descriptionKey: "services.marketing.description",
      icon: Megaphone,
      link: "/services/marketing",
      highlight: false
    },
    {
      titleKey: "services.strategy.title",
      descriptionKey: "services.strategy.description",
      icon: Briefcase,
      link: "/services/strategy",
      highlight: false
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 
            data-gsap="text-reveal"
            className="text-3xl md:text-4xl font-bold text-dikio-paragraph mb-4"
          >
            {t('services.title')} <span className="text-dikio-subtitle">{t('services.titleHighlight')}</span>
          </h2>
          <p 
            data-gsap="fade-up"
            className="text-lg text-muted-foreground"
          >
            {t('services.description')}
          </p>
        </div>

        <div
          data-gsap="stagger"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {serviceData.map((service, index) => (
            <div
              key={index}
              className={`group relative p-8 rounded-2xl transition-all hover:shadow-lg ${
                service.highlight 
                  ? 'bg-gradient-to-br from-dikio-subtitle/10 to-dikio-accent/10 border-2 border-dikio-subtitle/20' 
                  : 'bg-dikio-background hover:bg-white border border-transparent'
              }`}
            >
              {service.highlight && (
                <div className="absolute -top-3 left-6 px-3 py-1 bg-dikio-subtitle text-white text-xs font-medium rounded-full">
                  {t('services.featuredBadge')}
                </div>
              )}
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                service.highlight ? 'bg-dikio-subtitle/20' : 'bg-dikio-accent/10'
              }`}>
                <service.icon className={`h-7 w-7 ${service.highlight ? 'text-dikio-subtitle' : 'text-dikio-accent'}`} />
              </div>
              <h3 className="text-xl font-semibold text-dikio-paragraph mb-3">{t(service.titleKey)}</h3>
              <p className="text-muted-foreground mb-6">{t(service.descriptionKey)}</p>
              <Link 
                href={service.link}
                className={`inline-flex items-center text-sm font-medium transition-colors ${
                  service.highlight ? 'text-dikio-subtitle hover:text-dikio-title' : 'text-dikio-accent hover:text-dikio-accent-light'
                }`}
              >
                {t('services.learnMore')} <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>

        <div
          data-gsap="fade-up"
          className="text-center mt-12"
        >
          <Button asChild size="lg" variant="outline" className="border-dikio-title text-dikio-title hover:bg-dikio-title/5">
            <Link href="/services">
              {t('services.viewAll')} <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
