import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Target, 
  Users, 
  Zap, 
  CheckCircle2, 
  Clock,
  AlertCircle,
  Send
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface BriefData {
  project_title?: string;
  description?: string;
  problem_solved?: string;
  target_audience?: string;
  features?: Array<{ name: string; description?: string; priority?: string }>;
  labels?: string[];
  complexity?: 'simple' | 'moderate' | 'complex';
  timeline?: { estimated_weeks?: number; phases?: string[] };
  budget_indication?: string;
  benchmark_suggestions?: Array<{ name: string; url?: string; reason?: string }>;
}

interface BriefSummaryPanelProps {
  brief: BriefData;
  onSubmit: () => void;
}

const BriefSummaryPanel = ({ brief, onSubmit }: BriefSummaryPanelProps) => {
  const getComplexityConfig = (complexity?: string) => {
    switch (complexity) {
      case 'simple':
        return { label: 'Simple', color: 'bg-emerald-500' };
      case 'moderate':
        return { label: 'Modéré', color: 'bg-amber-500' };
      case 'complex':
        return { label: 'Complexe', color: 'bg-rose-500' };
      default:
        return { label: 'À définir', color: 'bg-muted-foreground' };
    }
  };

  const getPriorityBadge = (priority?: string) => {
    switch (priority?.toLowerCase()) {
      case 'essential':
      case 'essentiel':
        return <Badge variant="destructive" className="ml-2 text-xs">Essentiel</Badge>;
      case 'important':
        return <Badge variant="outline" className="ml-2 text-xs border-amber-500 text-amber-600">Important</Badge>;
      case 'nice-to-have':
      case 'optionnel':
        return <Badge variant="secondary" className="ml-2 text-xs">Optionnel</Badge>;
      default:
        return null;
    }
  };

  const complexityConfig = getComplexityConfig(brief.complexity);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-card border rounded-xl shadow-lg overflow-hidden h-full flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b bg-muted/30">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Résumé du projet</h3>
          </div>
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium text-white ${complexityConfig.color}`}>
            <span className="w-1.5 h-1.5 bg-white rounded-full" />
            {complexityConfig.label}
          </div>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-5">
          {/* Title & Description */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-2">
              {brief.project_title || 'Nouveau projet'}
            </h4>
            {brief.description && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {brief.description}
              </p>
            )}
          </div>

          {/* Labels */}
          {brief.labels && brief.labels.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {brief.labels.map((label, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {label}
                </Badge>
              ))}
            </div>
          )}

          {/* Problem Solved */}
          {brief.problem_solved && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <AlertCircle className="w-4 h-4 text-primary" />
                Problème résolu
              </div>
              <p className="text-sm text-muted-foreground pl-6 leading-relaxed">
                {brief.problem_solved}
              </p>
            </div>
          )}

          {/* Target Audience */}
          {brief.target_audience && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Users className="w-4 h-4 text-primary" />
                Public cible
              </div>
              <p className="text-sm text-muted-foreground pl-6 leading-relaxed">
                {brief.target_audience}
              </p>
            </div>
          )}

          {/* Features */}
          {brief.features && brief.features.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Zap className="w-4 h-4 text-primary" />
                Fonctionnalités
              </div>
              <div className="space-y-2 pl-6">
                {brief.features.map((feature, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                      <span className="text-sm font-medium text-foreground">
                        {feature.name}
                      </span>
                      {getPriorityBadge(feature.priority)}
                    </div>
                    {feature.description && (
                      <p className="text-xs text-muted-foreground ml-6">
                        {feature.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timeline */}
          {brief.timeline && brief.timeline.estimated_weeks && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Clock className="w-4 h-4 text-primary" />
                Délai estimé
              </div>
              <p className="text-sm text-muted-foreground pl-6">
                ~{brief.timeline.estimated_weeks} semaines
              </p>
            </div>
          )}

          {/* Benchmarks */}
          {brief.benchmark_suggestions && brief.benchmark_suggestions.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Target className="w-4 h-4 text-primary" />
                Références suggérées
              </div>
              <div className="space-y-1 pl-6">
                {brief.benchmark_suggestions.map((bench, index) => (
                  <div key={index} className="text-sm">
                    {bench.url ? (
                      <a 
                        href={bench.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {bench.name}
                      </a>
                    ) : (
                      <span className="text-muted-foreground">{bench.name}</span>
                    )}
                    {bench.reason && (
                      <span className="text-muted-foreground"> - {bench.reason}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Footer with Submit Button */}
      <div className="p-4 border-t bg-muted/30">
        <Button onClick={onSubmit} className="w-full" size="lg">
          <Send className="w-4 h-4 mr-2" />
          Soumettre mon projet
        </Button>
        <p className="text-xs text-muted-foreground text-center mt-2">
          Vous pourrez ajouter vos coordonnées à l'étape suivante
        </p>
      </div>
    </motion.div>
  );
};

export default BriefSummaryPanel;
