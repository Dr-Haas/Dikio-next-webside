'use client';


import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard, { ProjectData } from './ProjectCard';

gsap.registerPlugin(ScrollTrigger);

interface ProjectsGridProps {
  projects: ProjectData[];
}

// Group projects by year (projects have optional year field)
function groupByYear(projects: ProjectData[]): { year: string; items: ProjectData[] }[] {
  const grouped: Record<string, ProjectData[]> = {};

  projects.forEach((p) => {
    const year = (p as any).year || 'Non daté';
    if (!grouped[year]) grouped[year] = [];
    grouped[year].push(p);
  });

  // Sort years descending (most recent first), "Non daté" at end
  const sortedKeys = Object.keys(grouped).sort((a, b) => {
    if (a === 'Non daté') return 1;
    if (b === 'Non daté') return -1;
    return Number(b) - Number(a);
  });

  return sortedKeys.map((year) => ({ year, items: grouped[year] }));
}

interface YearGroupProps {
  year: string;
  items: ProjectData[];
  startIndex: number;
}

const YearGroup: React.FC<YearGroupProps> = ({ year, items, startIndex }) => {
  const groupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!groupRef.current) return;
    const ctx = gsap.context(() => {
      const cards = groupRef.current!.querySelectorAll('.portfolio-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: groupRef.current,
            start: 'top 85%',
          },
        }
      );
    }, groupRef);
    return () => ctx.revert();
  }, [items]);

  const renderLayout = () => {
    const rows: React.ReactNode[] = [];
    let i = 0;
    let rowIndex = 0;

    while (i < items.length) {
      const pattern = rowIndex % 4;

      if (pattern === 0 && items[i]) {
        rows.push(
          <div key={`row-${rowIndex}`} className="grid grid-cols-1">
            <ProjectCard project={items[i]} size="hero" index={startIndex + i} />
          </div>
        );
        i += 1;
      } else if (pattern === 1) {
        rows.push(
          <div key={`row-${rowIndex}`} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {items[i] && <ProjectCard project={items[i]} size="large" index={startIndex + i} />}
            {items[i + 1] && <ProjectCard project={items[i + 1]} size="large" index={startIndex + i + 1} />}
          </div>
        );
        i += 2;
      } else if (pattern === 2 && items[i]) {
        rows.push(
          <div key={`row-${rowIndex}`} className="grid grid-cols-1">
            <ProjectCard project={items[i]} size="hero" index={startIndex + i} />
          </div>
        );
        i += 1;
      } else {
        rows.push(
          <div key={`row-${rowIndex}`} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {items.slice(i, i + 3).map((project, j) => (
              <ProjectCard key={project.id} project={project} size="medium" index={startIndex + i + j} />
            ))}
          </div>
        );
        i += 3;
      }

      rowIndex++;
    }

    return rows;
  };

  return (
    <div ref={groupRef} className="space-y-4 md:space-y-6">
      {/* Year label */}
      <div className="flex items-center gap-5 pt-4">
        <span className="text-[clamp(2.5rem,6vw,4.5rem)] font-black text-dikio-title/15 leading-none tabular-nums select-none">
          {year}
        </span>
        <div className="flex-1 h-px bg-dikio-title/10" />
        <span className="text-xs font-mono text-dikio-blue/30 tracking-widest uppercase shrink-0">
          {items.length} projet{items.length > 1 ? 's' : ''}
        </span>
      </div>

      {renderLayout()}
    </div>
  );
};

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects }) => {
  if (projects.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-lg text-muted-foreground">Aucun projet à afficher pour le moment.</p>
      </div>
    );
  }

  const groups = groupByYear(projects);

  // Compute cumulative start indexes for correct GSAP stagger per group
  const cumulativeIndexes: number[] = [];
  let acc = 0;
  groups.forEach((g) => {
    cumulativeIndexes.push(acc);
    acc += g.items.length;
  });

  return (
    <div className="space-y-16 md:space-y-24">
      {groups.map((group, idx) => (
        <YearGroup
          key={group.year}
          year={group.year}
          items={group.items}
          startIndex={cumulativeIndexes[idx]}
        />
      ))}
    </div>
  );
};

export default ProjectsGrid;
