
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  devices: string[];
  tags: string[];
  image_url: string;
  category: string;
  year?: string | null;
}

interface ProjectCardProps {
  project: ProjectData;
  size?: 'hero' | 'large' | 'medium';
  index?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, size = 'medium', index = 0 }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const img = imgRef.current;
    const overlay = overlayRef.current;
    const content = contentRef.current;
    const arrow = arrowRef.current;
    if (!card || !img || !overlay || !content || !arrow) return;

    // Set initial states
    gsap.set(content, { y: 20, opacity: 0 });
    gsap.set(arrow, { scale: 0.7, opacity: 0 });

    const onEnter = () => {
      gsap.to(img, { scale: 1.06, duration: 0.8, ease: 'power2.out' });
      gsap.to(overlay, { opacity: 1, duration: 0.4, ease: 'power2.out' });
      gsap.to(content, { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' });
      gsap.to(arrow, { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.7)', delay: 0.1 });
    };
    const onLeave = () => {
      gsap.to(img, { scale: 1, duration: 0.6, ease: 'power2.inOut' });
      gsap.to(overlay, { opacity: 0, duration: 0.4, ease: 'power2.out' });
      gsap.to(content, { y: 20, opacity: 0, duration: 0.3, ease: 'power2.in' });
      gsap.to(arrow, { scale: 0.7, opacity: 0, duration: 0.25, ease: 'power2.in' });
    };

    card.addEventListener('mouseenter', onEnter);
    card.addEventListener('mouseleave', onLeave);
    return () => {
      card.removeEventListener('mouseenter', onEnter);
      card.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  // ALL cards are landscape 16/9
  const aspectClass = size === 'hero'
    ? 'aspect-[16/9] md:aspect-[21/9]'
    : 'aspect-[16/9]';

  const titleSize = size === 'hero'
    ? 'text-2xl md:text-4xl'
    : size === 'large'
    ? 'text-xl md:text-2xl'
    : 'text-lg md:text-xl';

  return (
    <Link to={`/portfolio/${project.id}`} className="block group portfolio-card">
      <div ref={cardRef} className={`relative overflow-hidden rounded-2xl ${aspectClass} cursor-pointer`}>
        {/* Image */}
        <img
          ref={imgRef}
          src={project.image_url || '/placeholder.svg'}
          alt={project.title}
          className="w-full h-full object-cover object-center"
          onError={(e) => { e.currentTarget.src = '/placeholder.svg'; }}
        />

        {/* Persistent subtle gradient at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Hover overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 opacity-0"
          style={{ background: 'linear-gradient(to top, rgba(50,113,113,0.88) 0%, rgba(50,113,113,0.35) 55%, transparent 100%)' }}
        />

        {/* AI badge - always visible */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20">
          <Sparkles className="w-3 h-3 text-dikio-subtitle" />
          <span className="text-xs font-semibold text-white tracking-wide">IA intégrée</span>
        </div>

        {/* Category badge */}
        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20">
          <span className="text-xs font-medium text-white">{project.category.split(' ')[0]}</span>
        </div>

        {/* Hover content */}
        <div ref={contentRef} className="absolute inset-0 flex flex-col justify-end p-5 md:p-7">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.tags.slice(0, 3).map((tag, i) => (
              <span key={i} className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm border border-white/20">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-end justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className={`text-white font-bold leading-tight mb-1 ${titleSize}`}>{project.title}</h3>
              {size !== 'medium' && (
                <p className="text-white/75 text-sm line-clamp-2 leading-relaxed">{project.description}</p>
              )}
            </div>
            <div ref={arrowRef} className="flex-shrink-0 w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-lg">
              <ArrowUpRight className="w-5 h-5 text-dikio-title" />
            </div>
          </div>
        </div>
      </div>

      {/* Below card info */}
      <div className="mt-3 px-1 flex items-start justify-between gap-2">
        <h3 className="font-semibold text-dikio-blue text-sm leading-snug group-hover:text-dikio-title transition-colors duration-300 line-clamp-1">
          {project.title}
        </h3>
        <span className="text-xs text-muted-foreground shrink-0 mt-0.5">{project.category.split(' ')[0]}</span>
      </div>
    </Link>
  );
};

export default ProjectCard;
