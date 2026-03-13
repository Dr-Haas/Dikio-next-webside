import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const { t } = useTranslation();

  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!statsRef.current) return;

    const statEls = statsRef.current.querySelectorAll<HTMLElement>('.stat-value');
    
    statEls.forEach((el) => {
      const raw = el.dataset.target || '0';
      const suffix = el.dataset.suffix || '';
      const target = parseFloat(raw);
      const obj = { val: 0 };

      gsap.to(obj, {
        val: target,
        duration: 2.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          const current = Math.round(obj.val);
          el.textContent = current + suffix;

          // Bounce effect on value jumps
          gsap.to(el, {
            scale: 1.25,
            duration: 0.1,
            ease: 'power2.out',
            onComplete: () => {
              gsap.to(el, {
                scale: 1,
                duration: 0.3,
                ease: 'elastic.out(1, 0.4)',
              });
            },
          });
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (statsRef.current?.contains(st.trigger as Element)) {
          st.kill();
        }
      });
    };
  }, []);

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 -z-10" 
        style={{ 
          background: 'linear-gradient(135deg, rgba(26, 198, 157, 0.08) 0%, rgba(255, 255, 255, 1) 40%, rgba(255, 255, 255, 1) 60%, rgba(242, 97, 87, 0.08) 100%)' 
        }} 
      />
      
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-4xl mx-auto">
          <div 
            data-gsap="scale"
            className="inline-flex items-center gap-2 rounded-full bg-dikio-subtitle/10 px-4 py-2 text-sm text-dikio-subtitle mb-6"
          >
            <Sparkles className="h-4 w-4" />
            <span>{t('hero.badge')}</span>
          </div>
          
          <h1 
            data-gsap="text-reveal"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-dikio-paragraph mb-6 leading-tight"
          >
            {t('hero.title1')}{' '}
            <span className="text-dikio-subtitle">{t('hero.title2')}</span> {t('hero.title3')}{' '}
            <span className="text-dikio-accent">{t('hero.title4')}</span> {t('hero.title5')}
          </h1>
          
          <p 
            data-gsap="fade-up"
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
          >
            {t('hero.description')}
          </p>
          
          <div 
            data-gsap="fade-up"
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button asChild size="lg" className="bg-dikio-subtitle hover:bg-dikio-title text-white">
              <Link to="/project-form">
                {t('hero.cta1')} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-dikio-title text-dikio-title hover:bg-dikio-title/5">
              <Link to="/ia">
                {t('hero.cta2')}
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div 
            ref={statsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
          >
            {[
              { target: 200, suffix: '+', label: t('hero.stats.projects') },
              { target: 12, suffix: '', label: t('hero.stats.countries') },
              { target: 15, suffix: 'h+', label: t('hero.stats.hours') },
              { target: 5, suffix: 'x', label: t('hero.stats.efficiency') }
            ].map((stat, index) => (
              <div key={index} className="text-center" data-gsap="fade-up">
                <div 
                  className="stat-value text-2xl md:text-3xl font-bold text-dikio-subtitle inline-block"
                  data-target={stat.target}
                  data-suffix={stat.suffix}
                >
                  0{stat.suffix}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
