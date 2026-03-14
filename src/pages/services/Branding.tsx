'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Palette, Check, Bot, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import OtherServices from '@/components/OtherServices';
import serviceBrandingImage from '@/assets/service-branding.png';
const Branding = () => {
  return (
    <div className="min-h-screen bg-dikio-background">
      <main>
        <section className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-dikio-title mb-4">
                  Branding & image de marque
                </h1>
                <p className="text-gray-600 text-lg mb-6">
                  Votre identité visuelle est la première impression que vous laissez. Nous créons des marques mémorables qui résonnent avec votre public.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-gray-700">
                    <Check className="mr-2 h-5 w-5 text-dikio-accent" />
                    Logos uniques et identités visuelles complètes
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Check className="mr-2 h-5 w-5 text-dikio-accent" />
                    Storytelling de marque captivant
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Check className="mr-2 h-5 w-5 text-dikio-accent" />
                    Supports de communication percutants
                  </li>
                </ul>
                <Link href="/project-form">
                  <Button className="bg-dikio-accent hover:bg-dikio-accent-light text-white">
                    Démarrer votre projet branding <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="relative">
                <img
                  src={serviceBrandingImage.src}
                  alt="Branding"
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-semibold text-dikio-title mb-3">
                Comment nous donnons vie à votre marque
              </h2>
              <p className="text-gray-600 text-lg">
                Notre approche en trois étapes pour un branding réussi.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {/* Étape 1: Analyse et stratégie */}
              <div className="p-6 bg-white rounded-lg shadow-md">
                <Palette className="h-10 w-10 text-dikio-accent mb-4" />
                <h3 className="text-xl font-semibold text-dikio-title mb-2">
                  Analyse et stratégie
                </h3>
                <p className="text-gray-700">
                  Nous plongeons au cœur de votre entreprise pour comprendre votre vision, vos valeurs et votre public cible.
                </p>
              </div>
              
              {/* Étape 2: Création et design */}
              <div className="p-6 bg-white rounded-lg shadow-md">
                <Cpu className="h-10 w-10 text-dikio-accent mb-4" />
                <h3 className="text-xl font-semibold text-dikio-title mb-2">
                  Création et design
                </h3>
                <p className="text-gray-700">
                  Nos designers traduisent votre essence en une identité visuelle unique, du logo aux couleurs.
                </p>
              </div>
              
              {/* Étape 3: Déploiement et cohérence */}
              <div className="p-6 bg-white rounded-lg shadow-md">
                <Bot className="h-10 w-10 text-dikio-accent mb-4" />
                <h3 className="text-xl font-semibold text-dikio-title mb-2">
                  Déploiement et cohérence
                </h3>
                <p className="text-gray-700">
                  Nous assurons une application uniforme de votre branding sur tous les supports, pour une image de marque forte.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <OtherServices currentServicePath="/services/branding" />
      </main>
    </div>
  );
};

export default Branding;
