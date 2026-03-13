import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, RocketIcon, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import OtherServices from '@/components/OtherServices';
import serviceLaunchingImage from '@/assets/service-launching.png';
import SEO from '@/components/SEO';

const Launching = () => {
  return (
    <div className="min-h-screen bg-dikio-background">
      <SEO 
        title="Lancement Rapide de Projet"
        description="Lancez votre projet en 4 semaines. MVP fonctionnel, validation de concept, premiers utilisateurs. Transformez votre idée en réalité rapidement."
        keywords="lancement rapide, MVP, minimum viable product, startup, validation concept, développement rapide, projet digital"
        url="https://dikio.fr/services/launching"
      />
      <main>
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-dikio-title mb-6">
                  Lancement <span className="text-dikio-accent">rapide</span> de votre projet
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Transformez votre idée en réalité avec notre service de lancement rapide. Nous créons un MVP (Minimum Viable Product) pour valider votre concept et attirer vos premiers utilisateurs.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-gray-700">
                    <Check className="w-5 h-5 mr-2 text-dikio-accent" />
                    Validation rapide de votre idée
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Check className="w-5 h-5 mr-2 text-dikio-accent" />
                    Création d'un MVP fonctionnel
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Check className="w-5 h-5 mr-2 text-dikio-accent" />
                    Attraction de vos premiers utilisateurs
                  </li>
                </ul>
                <Link to="/project-form">
                  <Button className="bg-dikio-accent hover:bg-dikio-accent-light text-white">
                    Démarrer votre projet
                  </Button>
                </Link>
              </div>
              <div className="relative">
                <img
                  src={serviceLaunchingImage}
                  alt="Lancement rapide"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-semibold text-dikio-title mb-4">
                Comment ça <span className="text-dikio-accent">marche</span> ?
              </h2>
              <p className="text-gray-600">
                Notre processus de lancement rapide est simple et efficace.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-dikio-title mb-2">
                  1. Analyse de votre idée
                </h3>
                <p className="text-gray-700">
                  Nous évaluons la viabilité de votre concept et définissons les
                  fonctionnalités clés de votre MVP.
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-dikio-title mb-2">
                  2. Développement du MVP
                </h3>
                <p className="text-gray-700">
                  Notre équipe développe rapidement un MVP fonctionnel, prêt à être
                  testé par vos premiers utilisateurs.
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-dikio-title mb-2">
                  3. Lancement et itération
                </h3>
                <p className="text-gray-700">
                  Nous lançons votre MVP et recueillons les commentaires des
                  utilisateurs pour améliorer continuellement votre produit.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold text-dikio-title mb-4">
                Nos <span className="text-dikio-accent">réalisations</span>
              </h2>
              <p className="text-gray-600">
                Découvrez quelques-uns de nos projets de lancement rapide.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src="/lovable-uploads/0999859b-959a-4c4b-844d-96855979599a.png"
                  alt="Projet 1"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-dikio-title mb-2">
                    Nom du projet 1
                  </h3>
                  <p className="text-gray-700">
                    Description du projet et des résultats obtenus grâce à notre
                    service de lancement rapide.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src="/lovable-uploads/0999859b-959a-4c4b-844d-96855979599a.png"
                  alt="Projet 2"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-dikio-title mb-2">
                    Nom du projet 2
                  </h3>
                  <p className="text-gray-700">
                    Description du projet et des résultats obtenus grâce à notre
                    service de lancement rapide.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src="/lovable-uploads/0999859b-959a-4c4b-844d-96855979599a.png"
                  alt="Projet 3"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-dikio-title mb-2">
                    Nom du projet 3
                  </h3>
                  <p className="text-gray-700">
                    Description du projet et des résultats obtenus grâce à notre
                    service de lancement rapide.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <OtherServices currentServicePath="/services/launching" />
      </main>
    </div>
  );
};

export default Launching;
