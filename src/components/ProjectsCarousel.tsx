
import React from 'react';
import Link from 'next/link';
import { ArrowRight, Laptop, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

// Project case studies data
const projectCaseStudies = [
  {
    title: "Mède · Plateforme médicale",
    description: "Conception et développement d'une plateforme de prise de rendez-vous et de téléconsultation médicale, avec intégration de paiements et système de notifications.",
    devices: ["desktop"],
    tags: ["Santé", "SaaS", "Automatisation"],
    image: "/placeholder.svg",
  },
  {
    title: "Tassigny 168 · Cabinet dentaire",
    description: "Création d'un site vitrine pour le cabinet dentaire avec système de prise de rendez-vous en ligne et optimisation du référencement local.",
    devices: ["desktop", "mobile"],
    tags: ["Santé", "Site Vitrine", "SEO"],
    image: "/placeholder.svg",
  },
  {
    title: "Tank · Fitness app",
    description: "Application mobile de coaching sportif avec suivi des performances, programmes personnalisés et intégration d'objets connectés.",
    devices: ["desktop", "mobile"],
    tags: ["Sport", "Application", "Coaching"],
    image: "/placeholder.svg",
  },
  {
    title: "Bot Trading Telegram",
    description: "Développement d'un bot Telegram automatisé pour le trading de cryptomonnaies, avec alertes personnalisées et système de backtesting.",
    devices: ["desktop"],
    tags: ["Finance", "Automatisation", "Bot"],
    image: "/placeholder.svg",
  }
];

const ProjectsCarousel = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Nos réalisations</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez quelques projets emblématiques que nous avons réalisés pour nos clients
          </p>
        </div>
        
        <Carousel className="w-full max-w-5xl mx-auto"
          opts={{
            align: "center",
            loop: true,
          }}>
          <CarouselContent className="-ml-2 md:-ml-4">
            {projectCaseStudies.map((project, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/2">
                <div className="h-full">
                  <Card className="overflow-hidden h-full border-2 border-gray-100 hover:border-dikio-accent/30 transform transition-all duration-500 hover:scale-[1.01] hover:shadow-lg">
                    <div className="relative p-6 pt-8 pb-0 flex justify-center">
                      <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center gap-4">
                          {project.devices.includes("desktop") && (
                            <div className="relative z-10">
                              <Laptop className="h-24 w-24 text-gray-400" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-10 bg-gray-200 rounded-sm"></div>
                              </div>
                            </div>
                          )}
                          {project.devices.includes("mobile") && (
                            <div className="relative z-10">
                              <Smartphone className="h-20 w-20 text-gray-400" />
                              <div className="absolute inset-0 flex items-center justify-center mt-3">
                                <div className="w-7 h-12 bg-gray-200 rounded-sm"></div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-gray-600 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="inline-block bg-blue-100 text-dikio-blue text-xs px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                      <Button variant="outline" className="w-full group">
                        Voir plus de détails
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8">
            <CarouselPrevious className="mr-2" />
            <CarouselNext className="ml-2" />
          </div>
        </Carousel>
        
        <div className="text-center mt-12">
          <Link href="/portfolio">
            <Button className="bg-dikio-accent hover:bg-dikio-accent-light text-white">
              Voir tous nos projets
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsCarousel;
