
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface Category {
  id: string;
  name: string;
}

interface CategoryFilterProps {
  categories: Category[];
  activeFilter: string;
  onFilterChange: (value: string) => void;
  children: React.ReactNode;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  categories, 
  activeFilter, 
  onFilterChange, 
  children 
}) => {
  return (
    <Tabs defaultValue="all" value={activeFilter} onValueChange={onFilterChange} className="w-full">
      <div className="mb-8 overflow-x-auto pb-2 flex justify-center">
        <TabsList className="inline-flex h-auto p-1 min-w-full md:min-w-0">
          {categories.map((category) => (
            <TabsTrigger 
              key={category.id} 
              value={category.id}
              className="text-sm md:text-base px-3 py-2 data-[state=active]:text-dikio-accent data-[state=active]:bg-dikio-accent/10"
            >
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      <TabsContent value={activeFilter}>
        {children}
      </TabsContent>
    </Tabs>
  );
};

export default CategoryFilter;
