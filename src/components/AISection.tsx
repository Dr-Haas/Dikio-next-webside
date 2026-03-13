import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Target, Bot, Database, Clock, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AISection = () => {
  return (
    <section 
      className="py-20 relative overflow-hidden" 
      style={{ 
        background: 'linear-gradient(135deg, rgba(26, 198, 157, 0.15) 0%, rgba(255, 255, 255, 0.95) 50%, rgba(240, 240, 235, 1) 100%)' 
      }}
    >
      <div className="container px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div>
              <div 
                data-gsap="scale"
                className="inline-flex items-center gap-2 rounded-full bg-dikio-subtitle/10 px-4 py-2 text-sm text-dikio-subtitle mb-6"
              >
                <Zap className="h-4 w-4" />
                <span>L'IA change les règles du jeu</span>
              </div>
              
              <h2 
                data-gsap="text-reveal"
                className="text-3xl md:text-4xl font-bold text-dikio-paragraph mb-6"
              >
                Pourquoi l'IA est au cœur de{' '}
                <span className="text-dikio-subtitle">notre approche</span>
              </h2>
              
              <p 
                data-gsap="fade-up"
                className="text-lg text-muted-foreground mb-8"
              >
                L'intelligence artificielle n'est plus un avantage concurrentiel, c'est une nécessité. 
                Les entreprises qui l'intègrent aujourd'hui créent un fossé impossible à combler pour celles qui attendent.
              </p>

              <div data-gsap="fade-up">
                <Button asChild size="lg" className="bg-dikio-subtitle hover:bg-dikio-title text-white">
                  <Link to="/ia">
                    Découvrir notre approche IA <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right content - Benefits grid */}
            <div
              data-gsap="stagger"
              className="grid grid-cols-2 gap-4"
            >
              {[
                {
                  icon: Clock,
                  title: "80% de temps gagné",
                  description: "Sur les tâches répétitives"
                },
                {
                  icon: Target,
                  title: "Scalabilité infinie",
                  description: "Sans recruter"
                },
                {
                  icon: Database,
                  title: "Données valorisées",
                  description: "En insights actionnables"
                },
                {
                  icon: TrendingUp,
                  title: "ROI mesurable",
                  description: "Dès les premiers mois"
                }
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                >
                  <div className="w-10 h-10 bg-dikio-subtitle/10 rounded-lg flex items-center justify-center mb-4">
                    <benefit.icon className="h-5 w-5 text-dikio-subtitle" />
                  </div>
                  <h3 className="font-semibold text-dikio-paragraph mb-1">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AISection;
