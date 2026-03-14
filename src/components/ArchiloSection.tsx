import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building2, Database, Plug, Brain } from 'lucide-react';
import Link from 'next/link';

const ArchiloSection = () => {
  const features = [
    {
      icon: Database,
      title: "Audit & Cartographie",
      description: "Analyse des flux et détection des silos"
    },
    {
      icon: Plug,
      title: "Intégration & APIs",
      description: "Vos outils communiquent enfin entre eux"
    },
    {
      icon: Brain,
      title: "IA-Ready",
      description: "Fondations prêtes pour l'intelligence artificielle"
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-dikio-paragraph relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div data-gsap="scale" className="text-center mb-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-dikio-accent/20 px-4 py-2 text-sm font-medium text-dikio-accent">
              <Building2 className="h-4 w-4" />
              ARCHILO · Architect Logistique & Opérationnel
            </span>
          </div>

          {/* Title */}
          <h2 
            data-gsap="text-reveal"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-6"
          >
            Une machine physique, une infinité de possibilités business.
          </h2>

          {/* Subtitle */}
          <p 
            data-gsap="fade-up"
            className="text-lg md:text-xl text-white/80 text-center max-w-3xl mx-auto mb-12"
          >
            <span className="text-dikio-subtitle font-semibold">Archilo</span>, le Maître d'œuvre technologique 
            qui transforme votre cabinet en plateforme connectée et prête pour l'IA.
          </p>

          {/* Features */}
          <div 
            data-gsap="stagger"
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-colors"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-dikio-subtitle/20 text-dikio-subtitle mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-white/70 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div data-gsap="fade-up" className="text-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-dikio-accent hover:bg-dikio-accent/90 text-white font-medium"
            >
              <Link href="/archilo">
                Découvrir Archilo <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArchiloSection;
