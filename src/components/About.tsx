import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Target, Lightbulb, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  const pillars = [
    {
      icon: Users,
      titleKey: "about.pillars.expertise.title",
      descriptionKey: "about.pillars.expertise.description"
    },
    {
      icon: Target,
      titleKey: "about.pillars.results.title",
      descriptionKey: "about.pillars.results.description"
    },
    {
      icon: Zap,
      titleKey: "about.pillars.agility.title",
      descriptionKey: "about.pillars.agility.description"
    },
    {
      icon: Lightbulb,
      titleKey: "about.pillars.innovation.title",
      descriptionKey: "about.pillars.innovation.description"
    }
  ];

  return (
    <section id="about" className="py-20 bg-dikio-background">
      <div className="container px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div>
              <h2 
                data-gsap="text-reveal"
                className="text-3xl md:text-4xl font-bold text-dikio-paragraph mb-6"
              >
                {t('about.title')} <span className="text-dikio-accent">{t('about.titleHighlight')}</span> {t('about.titleEnd')}
              </h2>
              
              <p 
                data-gsap="fade-up"
                className="text-lg text-muted-foreground mb-6"
              >
                {t('about.description1')}
              </p>
              
              <p 
                data-gsap="fade-up"
                className="text-lg text-muted-foreground mb-8"
              >
                {t('about.description2')}
              </p>

              <div data-gsap="fade-up">
                <Button asChild variant="outline" className="group border-dikio-title text-dikio-title hover:bg-dikio-title/5">
                  <Link to="/about">
                    {t('about.learnMore')}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right content - Pillars */}
            <div
              data-gsap="stagger"
              className="space-y-4"
            >
              {pillars.map((pillar, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-5 bg-white rounded-xl shadow-sm"
                >
                  <div className="w-12 h-12 bg-dikio-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <pillar.icon className="h-6 w-6 text-dikio-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dikio-paragraph mb-1">{t(pillar.titleKey)}</h3>
                    <p className="text-sm text-muted-foreground">{t(pillar.descriptionKey)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
