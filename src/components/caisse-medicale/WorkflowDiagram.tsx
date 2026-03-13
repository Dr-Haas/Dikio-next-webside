import { motion } from 'framer-motion';
import { 
  FolderSync, 
  FileText, 
  FileSpreadsheet, 
  Download,
  CreditCard,
  GitCompare,
  AlertTriangle,
  Users,
  RefreshCw,
  FileDown,
  ArrowRight,
  ArrowDown,
  CheckCircle2,
  Code,
  Filter,
  Mail,
  Calendar,
  Repeat,
  Trash2,
  Plus,
  Search,
  FileEdit,
  Merge,
  LayoutGrid,
  Clock,
  Send
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Types
interface WorkflowNode {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: 'google' | 'code' | 'filter' | 'edit' | 'merge' | 'loop' | 'alert' | 'output' | 'gmail';
}

interface WorkflowSection {
  id: string;
  title: string;
  subtitle: string;
  color: 'gold' | 'blue' | 'red' | 'green' | 'purple';
  nodes: WorkflowNode[];
}

// Color mappings
const nodeColors = {
  google: { bg: 'bg-emerald-500', text: 'text-emerald-500', light: 'bg-emerald-500/20' },
  code: { bg: 'bg-amber-500', text: 'text-amber-500', light: 'bg-amber-500/20' },
  filter: { bg: 'bg-violet-500', text: 'text-violet-500', light: 'bg-violet-500/20' },
  edit: { bg: 'bg-blue-500', text: 'text-blue-500', light: 'bg-blue-500/20' },
  merge: { bg: 'bg-pink-500', text: 'text-pink-500', light: 'bg-pink-500/20' },
  loop: { bg: 'bg-cyan-500', text: 'text-cyan-500', light: 'bg-cyan-500/20' },
  alert: { bg: 'bg-red-500', text: 'text-red-500', light: 'bg-red-500/20' },
  output: { bg: 'bg-green-500', text: 'text-green-500', light: 'bg-green-500/20' },
  gmail: { bg: 'bg-red-400', text: 'text-red-400', light: 'bg-red-400/20' }
};

const sectionColors = {
  gold: { border: 'border-caisse-gold/40', text: 'text-caisse-gold', bg: 'bg-caisse-gold/5' },
  blue: { border: 'border-caisse-blue/40', text: 'text-caisse-blue', bg: 'bg-caisse-blue/5' },
  red: { border: 'border-caisse-red/40', text: 'text-caisse-red', bg: 'bg-caisse-red/5' },
  green: { border: 'border-caisse-green/40', text: 'text-caisse-green', bg: 'bg-caisse-green/5' },
  purple: { border: 'border-violet-400/40', text: 'text-violet-400', bg: 'bg-violet-400/5' }
};

// Workflow data matching the n8n diagram
const workflowSections: WorkflowSection[] = [
  {
    id: 'file-processing',
    title: 'File Processing & Sorting',
    subtitle: 'Tri des fichiers par date',
    color: 'gold',
    nodes: [
      { id: 'trigger', label: 'When Executed', icon: Clock, color: 'loop' },
      { id: 'search', label: 'Search Files', icon: Search, color: 'google' },
      { id: 'if-exists', label: 'If / Fichier traité?', icon: Filter, color: 'filter' },
      { id: 'group-date', label: 'Grouper par date', icon: Code, color: 'code' },
      { id: 'output', label: 'Output données', icon: Code, color: 'code' },
      { id: 'loop', label: 'Loop / Fichiers', icon: Repeat, color: 'loop' }
    ]
  },
  {
    id: 'data-processing',
    title: 'Data Processing & Verification',
    subtitle: 'Extraction des données praticien·ne',
    color: 'blue',
    nodes: [
      { id: 'if-debiteur', label: 'If / Débiteur existe', icon: Filter, color: 'filter' },
      { id: 'download', label: 'Download File', icon: Download, color: 'google' },
      { id: 'extract', label: 'Extract from File', icon: FileText, color: 'edit' },
      { id: 'edit-fields', label: 'Edit Fields', icon: FileEdit, color: 'edit' },
      { id: 'merge', label: 'Merge / Patient', icon: Merge, color: 'merge' }
    ]
  },
  {
    id: 'aggregation',
    title: 'Fichiers Débiteur + Recettes + Actes',
    subtitle: 'Agrégation et traitement centralisé',
    color: 'purple',
    nodes: [
      { id: 'gestion', label: 'Gestion Fichiers', icon: LayoutGrid, color: 'code' },
      { id: 'aggregation', label: 'Agrégation Patient', icon: Code, color: 'code' }
    ]
  },
  {
    id: 'debtor-management',
    title: 'Debtor Management',
    subtitle: 'Gestion des débiteur·rice·s',
    color: 'red',
    nodes: [
      { id: 'get-items', label: 'Get Items / Déb', icon: Users, color: 'google' },
      { id: 'merge-deb', label: 'Merge', icon: Merge, color: 'merge' },
      { id: 'filter', label: 'Filter', icon: Filter, color: 'filter' },
      { id: 'loop-items', label: 'Loop Over Items', icon: Repeat, color: 'loop' },
      { id: 'append', label: 'Append', icon: Plus, color: 'google' },
      { id: 'delete', label: 'Suppression', icon: Trash2, color: 'alert' }
    ]
  },
  {
    id: 'tpe-verification',
    title: 'TPE Verification',
    subtitle: 'Vérification CB avec montant total',
    color: 'green',
    nodes: [
      { id: 'search-tpe', label: 'Search / TPE File', icon: Search, color: 'google' },
      { id: 'if-tpe', label: 'If / TPE existe', icon: Filter, color: 'filter' },
      { id: 'download-tpe', label: 'Download TPE', icon: Download, color: 'google' },
      { id: 'edit-tpe', label: 'Edit Fields / TPE', icon: FileEdit, color: 'edit' },
      { id: 'code-cb', label: 'Code CB Encaissés', icon: Code, color: 'code' },
      { id: 'diff', label: 'Get différentiel', icon: GitCompare, color: 'code' },
      { id: 'if-gap', label: 'If / Gap?', icon: Filter, color: 'filter' },
      { id: 'gmail', label: 'Alerte Email', icon: Mail, color: 'gmail' }
    ]
  },
  {
    id: 'closure',
    title: 'Clôture de Caisse',
    subtitle: 'Clôture caisse journalière praticien·ne',
    color: 'gold',
    nodes: [
      { id: 'cloture', label: 'Clôture comptable', icon: Code, color: 'code' },
      { id: 'append-row', label: 'Append Row', icon: Plus, color: 'google' },
      { id: 'send', label: 'Totaux quotidiens', icon: Send, color: 'output' }
    ]
  }
];

// Single node component
const WorkflowNodeComponent = ({ node }: { node: WorkflowNode }) => {
  const colors = nodeColors[node.color];
  const Icon = node.icon;

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className={cn(
        "w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center",
        colors.light,
        "border border-white/10"
      )}>
        <Icon className={cn("h-5 w-5 md:h-6 md:w-6", colors.text)} />
      </div>
      <span className="text-[10px] md:text-xs text-gray-400 text-center max-w-[70px] md:max-w-[80px] leading-tight">
        {node.label}
      </span>
    </div>
  );
};

// Arrow connector between nodes (horizontal)
const Connector = ({ className }: { className?: string }) => (
  <div className={cn("flex items-center justify-center", className)}>
    <div className="w-4 md:w-6 h-px bg-gradient-to-r from-white/20 to-white/5" />
    <ArrowRight className="h-3 w-3 text-white/20 -ml-1" />
  </div>
);

// Animated vertical flow connector between sections
const FlowConnector = ({ color = 'gold' }: { color?: 'gold' | 'blue' | 'red' | 'green' | 'purple' }) => {
  const colorMap = {
    gold: 'from-caisse-gold/60 via-caisse-gold/30 to-caisse-gold/10',
    blue: 'from-caisse-blue/60 via-caisse-blue/30 to-caisse-blue/10',
    red: 'from-caisse-red/60 via-caisse-red/30 to-caisse-red/10',
    green: 'from-caisse-green/60 via-caisse-green/30 to-caisse-green/10',
    purple: 'from-violet-400/60 via-violet-400/30 to-violet-400/10',
  };
  const dotColor = {
    gold: 'bg-caisse-gold',
    blue: 'bg-caisse-blue',
    red: 'bg-caisse-red',
    green: 'bg-caisse-green',
    purple: 'bg-violet-400',
  };

  return (
    <div className="flex justify-center items-center py-1">
      <div className="relative flex flex-col items-center h-10">
        {/* Line */}
        <div className={cn("w-px h-full bg-gradient-to-b", colorMap[color])} />
        {/* Animated dot */}
        <motion.div
          className={cn("absolute w-2 h-2 rounded-full shadow-lg", dotColor[color])}
          style={{ filter: `drop-shadow(0 0 4px currentColor)` }}
          animate={{ top: ['-4px', '100%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.5 }}
        />
        {/* Arrow */}
        <ArrowDown className="h-3 w-3 text-white/30 -mt-1" />
      </div>
    </div>
  );
};

// Section component
const WorkflowSectionComponent = ({ section }: { section: WorkflowSection }) => {
  const colors = sectionColors[section.color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "rounded-xl border p-4 md:p-5",
        colors.border,
        colors.bg
      )}
    >
      {/* Header */}
      <div className="mb-4">
        <h4 className={cn("font-mono text-xs uppercase tracking-wider", colors.text)}>
          {section.title}
        </h4>
        <p className="text-[10px] md:text-xs text-gray-500 mt-0.5">{section.subtitle}</p>
      </div>

      {/* Nodes */}
      <div className="flex items-start gap-1 md:gap-2 overflow-x-auto pb-2">
        {section.nodes.map((node, index) => (
          <div key={node.id} className="flex items-center">
            <WorkflowNodeComponent node={node} />
            {index < section.nodes.length - 1 && <Connector className="mx-0.5 md:mx-1" />}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// Main workflow diagram
const GlobalWorkflowDiagram = () => {
  return (
    <div className="bg-caisse-dark rounded-3xl p-6 md:p-8 lg:p-10 relative overflow-hidden">
      {/* Grid pattern background */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}
      />

      {/* Header */}
      <div className="relative z-10 text-center mb-8">
        <h3 className="font-fraunces text-xl md:text-2xl lg:text-3xl text-white">
          Global Cash Management Process
        </h3>
        <p className="text-gray-400 text-sm mt-2">Praticien·ne · Workflow complet n8n</p>
      </div>

      {/* Workflow sections grid */}
      <div className="relative z-10 space-y-0">
        {/* Row 1: File Processing + Clôture */}
        <div className="grid md:grid-cols-2 gap-4">
          <WorkflowSectionComponent section={workflowSections[0]} />
          <WorkflowSectionComponent section={workflowSections[5]} />
        </div>

        {/* Flow connector Row 1 → Row 2 */}
        <FlowConnector color="blue" />

        {/* Row 2: Data Processing + Aggregation */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <WorkflowSectionComponent section={workflowSections[1]} />
          </div>
          <WorkflowSectionComponent section={workflowSections[2]} />
        </div>

        {/* Flow connector Row 2 → Row 3 */}
        <FlowConnector color="red" />

        {/* Row 3: Debtor + TPE */}
        <div className="grid md:grid-cols-2 gap-4">
          <WorkflowSectionComponent section={workflowSections[3]} />
          <WorkflowSectionComponent section={workflowSections[4]} />
        </div>
      </div>

      {/* Connection indicators */}
      <div className="relative z-10 flex justify-center gap-6 mt-8 pt-6 border-t border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-emerald-500/30 border border-emerald-500/50" />
          <span className="text-xs text-gray-500">Google Services</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-amber-500/30 border border-amber-500/50" />
          <span className="text-xs text-gray-500">JS Code</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-violet-500/30 border border-violet-500/50" />
          <span className="text-xs text-gray-500">Conditions</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-red-500/30 border border-red-500/50" />
          <span className="text-xs text-gray-500">Alertes</span>
        </div>
      </div>
    </div>
  );
};

// Stats summary
const WorkflowStats = () => {
  const stats = [
    { value: '6', label: 'Modules orchestrés', color: 'text-caisse-gold' },
    { value: '40+', label: 'Nodes automatisés', color: 'text-caisse-blue' },
    { value: '0', label: 'Intervention manuelle', color: 'text-caisse-green' },
    { value: '24/7', label: 'Exécution continue', color: 'text-caisse-red' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
    >
      {stats.map((stat, index) => (
        <div 
          key={index}
          className="bg-white rounded-xl p-5 text-center border border-caisse-dark/5"
        >
          <p className={cn("font-fraunces text-3xl font-semibold", stat.color)}>
            {stat.value}
          </p>
          <p className="text-sm text-caisse-textSecondary mt-1">{stat.label}</p>
        </div>
      ))}
    </motion.div>
  );
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export const WorkflowsSection = () => {
  return (
    <section className="bg-caisse-cream py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.span variants={fadeInUp} className="font-mono text-xs uppercase tracking-widest text-caisse-gold">
            Architecture technique
          </motion.span>
          <motion.h2 variants={fadeInUp} className="font-fraunces text-3xl md:text-4xl lg:text-5xl mt-4">
            <span className="text-caisse-text">Un workflow</span>
            <br />
            <span className="text-caisse-green italic">entièrement automatisé.</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-caisse-textSecondary mt-4 max-w-2xl mx-auto">
            Basé sur n8n, notre système orchestre 6 modules interconnectés pour traiter chaque transaction, détecter chaque écart et alerter en temps réel.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-6xl mx-auto"
        >
          <GlobalWorkflowDiagram />
          <WorkflowStats />
        </motion.div>
      </div>
    </section>
  );
};

export default WorkflowsSection;
