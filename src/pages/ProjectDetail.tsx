import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Laptop, Smartphone, Tablet, Calendar, Clock, User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SEO from '@/components/SEO';
import { usePortfolioProject } from '@/hooks/usePortfolioProject';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: project, isLoading } = usePortfolioProject(id);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project || !pageRef.current) return;

    const ctx = gsap.context(() => {
      // Hero text reveal
      gsap.from('[data-anim="hero-title"]', {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.3,
      });

      gsap.from('[data-anim="hero-meta"]', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.6,
      });

      gsap.from('[data-anim="hero-desc"]', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.8,
      });

      gsap.from('[data-anim="scroll-hint"]', {
        y: -10,
        opacity: 0,
        duration: 0.6,
        delay: 1.2,
        ease: 'power2.out',
      });

      // Content sections staggered
      gsap.utils.toArray<HTMLElement>('[data-anim="section"]').forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: 'power3.out',
        });
      });

      // Gallery images
      gsap.utils.toArray<HTMLElement>('[data-anim="gallery-img"]').forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          scale: 0.9,
          opacity: 0,
          duration: 0.7,
          delay: i * 0.15,
          ease: 'power2.out',
        });
      });

      // Tags & tech
      gsap.from('[data-anim="tech-badge"]', {
        scrollTrigger: {
          trigger: '[data-anim="tech-section"]',
          start: 'top 85%',
        },
        y: 20,
        opacity: 0,
        stagger: 0.05,
        duration: 0.5,
        ease: 'power2.out',
      });

      // Testimonial
      gsap.from('[data-anim="testimonial"]', {
        scrollTrigger: {
          trigger: '[data-anim="testimonial"]',
          start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      });

      // CTA
      gsap.from('[data-anim="cta"]', {
        scrollTrigger: {
          trigger: '[data-anim="cta"]',
          start: 'top 90%',
        },
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
      });
    }, pageRef);

    return () => ctx.revert();
  }, [project]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6 px-4">
        <h1 className="text-3xl font-bold text-foreground">Projet introuvable</h1>
        <p className="text-muted-foreground">Ce projet n'existe pas ou n'est plus disponible.</p>
        <Link to="/portfolio">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au portfolio
          </Button>
        </Link>
      </div>
    );
  }

  const fallbackImage = "https://apbrupkcxsbrdbzyaspt.supabase.co/storage/v1/object/public/project_logos/default.png";
  const heroImage = project.image_url || fallbackImage;
  const hasContentSections = project.content_sections && project.content_sections.length > 0;
  const hasGallery = project.gallery_images && project.gallery_images.length > 0;

  const getDeviceIcon = (device: string) => {
    const d = device.toLowerCase();
    if (d.includes('desktop')) return <Laptop className="h-4 w-4" />;
    if (d.includes('mobile')) return <Smartphone className="h-4 w-4" />;
    if (d.includes('tablet')) return <Tablet className="h-4 w-4" />;
    return null;
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-background">
      <SEO
        title={project.title}
        description={project.description || `Découvrez le projet ${project.title}`}
        url={`https://dikio.fr/portfolio/${project.id}`}
      />

      {/* ── Hero Banner ── */}
      <section className="relative h-[85vh] min-h-[600px] flex items-end overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt={project.title}
            className="w-full h-full object-cover object-center"
            onError={(e) => { e.currentTarget.src = fallbackImage; }}
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
        </div>

        {/* Back button */}
        <Link
          to="/portfolio"
          className="absolute top-24 left-6 md:left-10 z-10 inline-flex items-center text-white/80 hover:text-white transition-colors group backdrop-blur-sm bg-black/20 px-4 py-2 rounded-full"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Portfolio
        </Link>

        {/* Hero content */}
        <div className="relative z-10 container mx-auto px-6 md:px-10 pb-16 md:pb-20">
          <div className="max-w-3xl">
            <div data-anim="hero-meta" className="flex flex-wrap items-center gap-3 mb-5">
              <Badge className="bg-dikio-accent/90 text-white border-none text-xs uppercase tracking-widest px-3 py-1">
                {project.category}
              </Badge>
              {project.year && (
                <span className="flex items-center gap-1.5 text-sm text-foreground/70">
                  <Calendar className="h-3.5 w-3.5" />
                  {project.year}
                </span>
              )}
              {project.duration && (
                <span className="flex items-center gap-1.5 text-sm text-foreground/70">
                  <Clock className="h-3.5 w-3.5" />
                  {project.duration}
                </span>
              )}
              {project.client_name && (
                <span className="flex items-center gap-1.5 text-sm text-foreground/70">
                  <User className="h-3.5 w-3.5" />
                  {project.client_name}
                </span>
              )}
            </div>

            <h1 data-anim="hero-title" className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 font-fraunces leading-tight">
              {project.title}
            </h1>

            <p data-anim="hero-desc" className="text-lg md:text-xl text-foreground/70 leading-relaxed max-w-2xl mb-8">
              {project.description}
            </p>

            <div data-anim="hero-desc" className="flex flex-wrap gap-3">
              {project.devices?.map((device, i) => (
                <span key={i} className="flex items-center gap-1.5 text-sm text-foreground/60 bg-secondary/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border/50">
                  {getDeviceIcon(device)}
                  {device}
                </span>
              ))}
              {project.project_url && (
                <a href={project.project_url} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" className="bg-dikio-accent hover:bg-dikio-accent-light text-white rounded-full">
                    Voir le site
                    <ExternalLink className="ml-2 h-3.5 w-3.5" />
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div data-anim="scroll-hint" className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-foreground/40 animate-bounce">
          <span className="text-xs uppercase tracking-widest mb-1">Découvrir</span>
          <ChevronDown className="h-5 w-5" />
        </div>
      </section>

      {/* ── Technologies & Tags ── */}
      {((project.technologies && project.technologies.length > 0) || (project.tags && project.tags.length > 0)) && (
        <section data-anim="tech-section" className="py-14 border-b border-border/50">
          <div className="container mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-10">
              {project.technologies && project.technologies.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.2em] mb-4">Stack technique</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <Badge key={i} data-anim="tech-badge" className="bg-primary/10 text-primary hover:bg-primary/20 text-sm px-3 py-1">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {project.tags && project.tags.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.2em] mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <Badge key={i} data-anim="tech-badge" variant="outline" className="text-sm px-3 py-1">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── Content Sections ── */}
      {hasContentSections && (
        <section className="py-20">
          <div className="container mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-x-16 gap-y-14">
              {project.content_sections.map((section, i) => (
                <div key={i} data-anim="section" className="relative">
                  <div className="absolute -left-4 top-0 w-1 h-10 bg-dikio-accent/60 rounded-full hidden md:block" />
                  <h3 className="text-xl font-bold text-foreground mb-3 font-fraunces">
                    {section.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Gallery ── */}
      {hasGallery && (
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-6 md:px-10">
            <h2 className="text-2xl font-bold text-foreground mb-10 font-fraunces text-center" data-anim="section">
              Aperçu visuel
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {project.gallery_images.map((img, i) => (
                <div
                  key={i}
                  data-anim="gallery-img"
                  className="rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-xl transition-shadow duration-500 group"
                >
                  <div className="overflow-hidden">
                    <img
                      src={img}
                      alt={`${project.title} - vue ${i + 1}`}
                      className="w-full h-72 md:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => { e.currentTarget.src = fallbackImage; }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Long description fallback ── */}
      {!hasContentSections && project.long_description && (
        <section className="py-20">
          <div className="container mx-auto px-6 md:px-10 max-w-3xl" data-anim="section">
            <h2 className="text-2xl font-bold text-foreground mb-6 font-fraunces">À propos du projet</h2>
            <div className="prose prose-lg text-muted-foreground whitespace-pre-line leading-relaxed">
              {project.long_description}
            </div>
          </div>
        </section>
      )}

      {/* ── Testimonial ── */}
      {project.testimonial_text && (
        <section className="py-20 bg-primary/5">
          <div className="container mx-auto px-6 md:px-10 max-w-2xl text-center" data-anim="testimonial">
            <div className="text-5xl text-dikio-accent/30 font-serif mb-4">"</div>
            <blockquote className="text-xl md:text-2xl italic text-foreground/80 mb-6 font-fraunces leading-relaxed">
              {project.testimonial_text}
            </blockquote>
            {project.testimonial_author && (
              <p className="text-muted-foreground font-medium">{project.testimonial_author}</p>
            )}
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="py-20" data-anim="cta">
        <div className="container mx-auto px-6 md:px-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-fraunces">Un projet similaire en tête ?</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Discutons ensemble de votre idée et donnons-lui vie.
          </p>
          <Link to="/project-form">
            <Button className="bg-dikio-accent hover:bg-dikio-accent-light text-white px-8 rounded-full">
              Démarrer un projet
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
