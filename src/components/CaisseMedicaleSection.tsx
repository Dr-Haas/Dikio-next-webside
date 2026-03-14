import React from 'react';
import Link from 'next/link';
import { ArrowRight, TrendingDown, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CaisseMedicaleSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-dikio-background to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div data-gsap="scale" className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 mb-4">
              <TrendingDown className="h-4 w-4 text-amber-600" />
              <span className="text-sm font-semibold text-amber-700">Pour cabinets médicaux</span>
            </div>
            <h2 data-gsap="text-reveal" className="text-3xl md:text-4xl lg:text-5xl font-bold text-dikio-title mb-4">
              Optimiser la trésorerie de votre cabinet
            </h2>
            <p data-gsap="fade-up" className="text-lg text-gray-600 max-w-3xl mx-auto">
              Découvrez comment Dikio aide les praticien·ne·s à détecter les pertes financières silencieuses et automatiser leur gestion de caisse.
            </p>
          </div>

          {/* Content Grid */}
          <div data-gsap="stagger" className="grid md:grid-cols-3 gap-6 mb-10">
            {/* Stat 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                  <TrendingDown className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="font-bold text-dikio-title">Pertes détectées</h3>
              </div>
              <p className="text-sm text-gray-600">Identifiez les écarts de trésorerie en temps réel avec notre système automatisé.</p>
            </div>

            {/* Stat 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-dikio-title">Framework Archimed</h3>
              </div>
              <p className="text-sm text-gray-600">Basé sur le succès d'un cabinet dentaire, adaptable à votre pratique.</p>
            </div>

            {/* Stat 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                  <svg className="h-6 w-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-bold text-dikio-title">100% automatisé</h3>
              </div>
              <p className="text-sm text-gray-600">Zéro intervention manuelle, zéro erreur. Fonctionnement 24/7.</p>
            </div>
          </div>

          {/* CTA Button */}
          <div data-gsap="fade-up" className="text-center flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/caisse-medicale">
              <Button 
                size="lg"
                className="bg-dikio-accent hover:bg-dikio-accent-light text-white font-semibold"
              >
                Découvrir l'optimisation de caisse <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/caisse-medicale/demande">
              <Button 
                size="lg"
                variant="outline"
                className="border-dikio-accent text-dikio-accent hover:bg-dikio-accent/10 font-semibold"
              >
                Demander une démo
              </Button>
            </Link>
            <p className="text-sm text-gray-500 mt-2 sm:mt-0 sm:hidden w-full">
              Disponible pour cabinet médical, dentaire et paramédical
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaisseMedicaleSection;
