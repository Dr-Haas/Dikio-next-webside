import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { usePortfolioProjects } from '@/hooks/usePortfolioProjects';
import ProjectCard from '@/components/portfolio/ProjectCard';

const ProjectsCarousel = () => {
  const { data: projects = [], isLoading } = usePortfolioProjects();
  const displayProjects = projects.slice(0, 6);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Nos réalisations</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez quelques projets emblématiques que nous avons réalisés pour nos clients
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dikio-accent"></div>
          </div>
        ) : displayProjects.length > 0 ? (
          <Carousel className="w-full max-w-5xl mx-auto"
            opts={{
              align: "center",
              loop: true,
            }}>
            <CarouselContent className="-ml-2 md:-ml-4">
              {displayProjects.map((project) => (
                <CarouselItem key={project.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/2">
                  <div className="h-full">
                    <ProjectCard project={project} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8">
              <CarouselPrevious className="mr-2" />
              <CarouselNext className="ml-2" />
            </div>
          </Carousel>
        ) : (
          <p className="text-center text-gray-500">Aucun projet à afficher pour le moment.</p>
        )}
        
        <div className="text-center mt-12">
          <Link to="/portfolio">
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
