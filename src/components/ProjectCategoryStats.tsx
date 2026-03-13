
import React from 'react';
interface CategoryStat {
  name: string;
  count: number;
  emoji: string;
}
interface ProjectCategoryStatsProps {
  stats: CategoryStat[];
}
const ProjectCategoryStats: React.FC<ProjectCategoryStatsProps> = ({
  stats
}) => {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 mx-auto max-w-5xl px-4">
      {stats.map((category, index) => (
        <div 
          key={index} 
          className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md p-5 md:p-7 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-100 hover:border-dikio-accent/30 w-full sm:w-[45%] md:w-[30%] lg:w-1/4"
        >
          <div className="bg-dikio-accent/10 inline-flex items-center justify-center rounded-full p-3 mb-4 text-dikio-accent">
            <span className="text-3xl md:text-4xl">{category.emoji}</span>
          </div>
          <h3 className="font-semibold mb-2 text-sm md:text-base text-dikio-title">{category.name}</h3>
          <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-dikio-title to-dikio-subtitle bg-clip-text text-transparent">{category.count}</p>
          <p className="text-xs md:text-sm text-gray-500 mt-1">projets</p>
        </div>
      ))}
    </div>
  );
};
export default ProjectCategoryStats;
