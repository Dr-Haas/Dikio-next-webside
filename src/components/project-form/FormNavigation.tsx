
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, Loader2, Home } from 'lucide-react';

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  isSubmitting: boolean;
  isSuccess?: boolean;
  onBack: () => void;
  onNext: () => void;
}

const FormNavigation: React.FC<FormNavigationProps> = ({ 
  currentStep, 
  totalSteps, 
  isSubmitting,
  isSuccess = false,
  onBack, 
  onNext 
}) => {
  if (isSuccess) {
    return (
      <div className="flex justify-center mt-8 pt-4 border-t border-gray-200">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            type="button"
            onClick={() => window.location.href = "/"}
            className="bg-dikio-accent hover:bg-dikio-accent-light text-white px-8 py-2 rounded-lg shadow-lg shadow-dikio-accent/30 transition-all duration-300"
          >
            <Home className="mr-2" size={18} />
            Retour à l'accueil
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={currentStep === 0}
          className="px-6 py-2 rounded-lg transition-all duration-300 hover:bg-gray-100 flex items-center"
        >
          <ChevronLeft className="mr-1" size={18} />
          Retour
        </Button>
      </motion.div>
      
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          type="button"
          onClick={onNext}
          disabled={isSubmitting}
          className="bg-dikio-accent hover:bg-dikio-accent-light text-white px-6 py-2 rounded-lg shadow-lg shadow-dikio-accent/30 transition-all duration-300 flex items-center"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Envoi en cours...
            </>
          ) : currentStep === totalSteps - 1 ? (
            'Envoyer 🚀'
          ) : (
            <>
              Suivant 
              <ChevronRight className="ml-1" size={18} />
            </>
          )}
        </Button>
      </motion.div>
    </div>
  );
};

export default FormNavigation;
