import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import OtherServices from '@/components/OtherServices';
import serviceStrategyImage from '@/assets/service-strategy.png';
import SEO from '@/components/SEO';

const Strategy = () => {
  return (
    <div className="min-h-screen bg-dikio-background">
      <SEO 
        title="Accompagnement Stratégique"
        description="Structurez votre projet avec un coaching personnalisé. Définition des objectifs, parcours client, métriques de croissance. De l'idée au business viable."
        keywords="accompagnement stratégique, coaching, business plan, stratégie digitale, croissance, startup, entrepreneuriat"
        url="https://dikio.fr/services/strategy"
      />
      <main>
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-6 animate-fade-in">
                <div className="inline-flex items-center gap-2 rounded-full bg-dikio-accent/10 px-3 py-1 text-sm text-dikio-accent">
                  <Briefcase className="h-3.5 w-3.5 fill-dikio-accent" />
                  <span>Service</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                  Accompagnement <span className="gradient-text">stratégique</span>
                </h1>
                <p className="text-lg text-gray-600 max-w-[600px]">
                  Tracez la voie vers le succès : bénéficiez d'une expertise stratégique personnalisée 
                  pour structurer et développer votre projet avec méthode.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/project-form">
                    <Button size="lg" className="bg-dikio-accent hover:bg-dikio-accent-light text-white font-medium">
                      Structurer votre projet
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <img
                  src={serviceStrategyImage}
                  alt="Accompagnement stratégique"
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-gray-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Les piliers de notre accompagnement</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-dikio-accent font-bold text-xl mb-2">Clarté stratégique</div>
                <p>Définition précise des objectifs, du marché cible et des avantages concurrentiels de votre projet.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-dikio-accent font-bold text-xl mb-2">Parcours client optimisé</div>
                <p>Conception d'une expérience client fluide et engageante du premier contact à la fidélisation.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-dikio-accent font-bold text-xl mb-2">Métriques de croissance</div>
                <p>Identification et suivi des indicateurs clés qui vous permettront de mesurer et accélérer votre développement.</p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="bg-dikio-accent/10 p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6 text-center">Témoignages clients</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow">
                  <p className="italic mb-4">"L'accompagnement stratégique de Dikio nous a permis de clarifier notre vision et de structurer notre développement. Nous avons gagné des mois de tâtonnements et évité plusieurs erreurs coûteuses."</p>
                  <p className="font-bold">Fondateur de Recovv, outil de suivi patient</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <p className="italic mb-4">"Gary a su nous aider à identifier notre véritable valeur ajoutée et à construire une offre cohérente et attractive. Son expertise a été déterminante dans notre lancement réussi."</p>
                  <p className="font-bold">Équipe de SurprizWheel, projet marketing B2B</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Section carrousel des autres services */}
        <OtherServices currentServicePath="/services/strategy" />
        
        <section className="py-16 bg-gray-900 text-white">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">Prêt à structurer votre projet ?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">Passez de l'idée à un business viable et pérenne avec un accompagnement expert.</p>
            <Link to="/project-form">
              <Button size="lg" className="bg-dikio-accent hover:bg-dikio-accent-light text-white font-medium">
                Démarrer votre accompagnement stratégique
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Strategy;
