
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Rocket, Users, Target, Package, Coins, Mail } from 'lucide-react';

interface FormProgressBarProps {
  steps: string[];
  currentStep: number;
}

// Step icons for gamification
const stepIcons = [
  Rocket,  // Project
  Package, // Presence
  Target,  // Target
  Users,   // Needs
  Coins,   // Budget
  Mail     // Contact
];

const FormProgressBar: React.FC<FormProgressBarProps> = ({ steps, currentStep }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2 relative">
        {/* Progress line */}
        <div className="absolute left-0 top-5 h-1 bg-gray-200 w-full -z-10"></div>
        <motion.div 
          className="absolute left-0 top-5 h-1 bg-dikio-accent w-0"
          initial={{ width: "0%" }}
          animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
        
        {steps.map((step, index) => {
          const StepIcon = stepIcons[index];
          const isActive = currentStep === index;
          const isCompleted = currentStep > index;
          
          return (
            <motion.div 
              key={index} 
              className={`relative flex flex-col items-center ${index > 0 ? 'flex-1' : ''}`}
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ 
                scale: isActive ? 1.1 : 1, 
                opacity: isActive || isCompleted ? 1 : 0.7 
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                  isActive 
                    ? 'bg-dikio-accent text-white shadow-lg shadow-dikio-accent/30'
                    : isCompleted 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {isCompleted ? (
                  <Check size={20} />
                ) : (
                  <StepIcon size={20} />
                )}
              </motion.div>
              <div className="text-xs mt-2 text-center hidden md:block font-medium">
                {step}
              </div>
            </motion.div>
          );
        })}
      </div>
      <motion.p 
        key={currentStep} // Key helps with animation when step changes
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center font-medium text-dikio-title text-xl mt-6 mb-2"
      >
        {steps[currentStep]}
      </motion.p>
    </div>
  );
};

export default FormProgressBar;
