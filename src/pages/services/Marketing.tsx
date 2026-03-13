import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Check, Bot, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import OtherServices from '@/components/OtherServices';
import serviceMarketingImage from '@/assets/service-marketing.png';
import SEO from '@/components/SEO';

const Marketing = () => {
  return (
    <div className="min-h-screen bg-dikio-background">
      <SEO 
        title="Growth Marketing & Ads"
        description="Boostez votre croissance avec des stratégies marketing innovantes. Google Ads, réseaux sociaux, SEO, contenu engageant. Maximisez votre ROI."
        keywords="growth marketing, google ads, facebook ads, SEO, marketing digital, publicité en ligne, ROI, campagnes publicitaires"
        url="https://dikio.fr/services/marketing"
      />
      <main>
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-3xl font-bold text-dikio-title mb-4">
                  Growth Marketing & Ads
                </h2>
                <p className="text-gray-600 mb-6">
                  Boostez votre croissance grâce à des stratégies marketing innovantes et des campagnes publicitaires percutantes.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-gray-600">
                    <Check className="mr-2 h-5 w-5 text-green-500" />
                    Analyse approfondie de votre marché et de vos cibles
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="mr-2 h-5 w-5 text-green-500" />
                    Création de campagnes publicitaires optimisées (Google Ads, réseaux sociaux)
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="mr-2 h-5 w-5 text-green-500" />
                    Stratégies de contenu engageantes pour attirer et fidéliser votre audience
                  </li>
                  
                  <li className="flex items-center text-gray-600">
                    <Check className="mr-2 h-5 w-5 text-green-500" />
                    Suivi des performances et ajustements pour un ROI maximal
                  </li>
                </ul>
                <Link to="/project-form">
                  <Button className="bg-dikio-accent hover:bg-dikio-accent-light text-white">
                    Démarrer un projet <ArrowRight className="ml-2" />
                  </Button>
                </Link>
              </div>
              <img
                src={serviceMarketingImage}
                alt="Growth Marketing"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <h3 className="text-2xl font-bold text-dikio-title mb-6">
              Pourquoi choisir notre service Growth Marketing ?
            </h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="p-6 bg-white rounded-lg shadow-md">
                <TrendingUp className="h-8 w-8 text-dikio-accent mb-4" />
                <h4 className="text-lg font-semibold text-dikio-title mb-2">
                  Expertise éprouvée
                </h4>
                <p className="text-gray-600">
                  Notre équipe possède une solide expérience en growth marketing et une connaissance approfondie des dernières tendances.
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <Cpu className="h-8 w-8 text-dikio-accent mb-4" />
                <h4 className="text-lg font-semibold text-dikio-title mb-2">
                  Solutions sur mesure
                </h4>
                <p className="text-gray-600">
                  Nous adaptons nos stratégies à vos besoins spécifiques et à votre budget pour des résultats optimaux.
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <Bot className="h-8 w-8 text-dikio-accent mb-4" />
                <h4 className="text-lg font-semibold text-dikio-title mb-2">
                  Focus sur le ROI
                </h4>
                <p className="text-gray-600">
                  Nous mesurons en permanence l'efficacité de nos actions et ajustons nos stratégies pour maximiser votre retour sur investissement.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <OtherServices currentServicePath="/services/marketing" />
      </main>
    </div>
  );
};

export default Marketing;
