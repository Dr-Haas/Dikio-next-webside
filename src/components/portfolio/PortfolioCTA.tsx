
import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PortfolioCTA: React.FC = () => {
  return (
    <section className="py-20 mt-16 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dikio-blue" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, #327171 0%, transparent 50%), radial-gradient(circle at 80% 50%, #1ac69d 0%, transparent 50%)',
        }}
      />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8" data-gsap="fade-up">
            <Sparkles className="w-4 h-4 text-dikio-subtitle" />
            <span className="text-sm font-semibold text-white tracking-wide">Votre projet, notre vision</span>
          </div>
          <h2 data-gsap="text-reveal" className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            Prêt à lancer votre<br />
            <span style={{ color: '#1ac69d' }}>projet IA ?</span>
          </h2>
          <p data-gsap="fade-up" className="text-lg text-white/70 mb-10 max-w-xl mx-auto leading-relaxed">
            Transformons votre vision en produit digital de référence. Chaque grand projet commence par une conversation.
          </p>
          <div data-gsap="scale">
            <Link href="/project-form">
              <Button size="lg" className="bg-dikio-accent hover:bg-dikio-accent-light text-white font-semibold px-8 py-6 text-base rounded-full shadow-lg shadow-dikio-accent/30 transition-all duration-300 hover:shadow-dikio-accent/50 hover:scale-105">
                Démarrer mon projet
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioCTA;
