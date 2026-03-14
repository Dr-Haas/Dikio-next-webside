'use client';


import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';

// Import form steps components
import Step1ProjectInfo, { step1Schema, Step1FormData } from './project-form/Step1ProjectInfo';
import Step2Presence, { step2Schema, Step2FormData } from './project-form/Step2Presence';
import Step3Target, { step3Schema, Step3FormData } from './project-form/Step3Target';
import Step4Needs, { step4Schema, Step4FormData } from './project-form/Step4Needs';
import Step5Budget, { step5Schema, Step5FormData } from './project-form/Step5Budget';
import Step6Contact, { step6Schema, Step6FormData } from './project-form/Step6Contact';
import SuccessStep from './project-form/SuccessStep';

// Import UI components
import FormProgressBar from './project-form/FormProgressBar';
import FormNavigation from './project-form/FormNavigation';

// Import types
import { ProjectFormData } from './project-form/FormTypes';

const ProjectFormSteps = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ProjectFormData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Shorter titles for steps with emojis for gamification
  const steps = [
    "Projet",
    "Présence",
    "Cible",
    "Besoins",
    "Budget",
    "Contact"
  ];

  // Step forms initialization with proper type definitions
  const step1Form = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      projectName: "",
      projectStage: undefined,
      objective: undefined,
      objectiveOther: "",
    },
  });

  const step2Form = useForm<Step2FormData>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      hasWebsite: undefined,
      hasBranding: undefined,
      usesDigitalTools: false,
      digitalToolsDetails: "",
    },
  });

  const step3Form = useForm<Step3FormData>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      targetAudience: undefined,
      idealClient: "",
      currentlySelling: undefined,
    },
  });

  const step4Form = useForm<Step4FormData>({
    resolver: zodResolver(step4Schema),
    defaultValues: {
      needs: {
        website: false,
        salesFunnel: false,
        branding: false,
        automation: false,
        ads: false,
        googleReviews: false,
        strategy: false,
        coaching: false,
      },
    },
  });

  const step5Form = useForm<Step5FormData>({
    resolver: zodResolver(step5Schema),
    defaultValues: {
      budget: undefined,
      startTime: undefined,
    },
  });

  const step6Form = useForm<Step6FormData>({
    resolver: zodResolver(step6Schema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      contactPreference: undefined,
      additionalInfo: "",
    },
  });

  const handleNext = () => {
    switch (currentStep) {
      case 0:
        step1Form.handleSubmit((data) => {
          setFormData(prev => ({ ...prev, ...data }));
          setCurrentStep(prev => prev + 1);
        })();
        break;
      case 1:
        step2Form.handleSubmit((data) => {
          setFormData(prev => ({ ...prev, ...data }));
          setCurrentStep(prev => prev + 1);
        })();
        break;
      case 2:
        step3Form.handleSubmit((data) => {
          setFormData(prev => ({ ...prev, ...data }));
          setCurrentStep(prev => prev + 1);
        })();
        break;
      case 3:
        step4Form.handleSubmit((data) => {
          setFormData(prev => ({ ...prev, ...data }));
          setCurrentStep(prev => prev + 1);
        })();
        break;
      case 4:
        step5Form.handleSubmit((data) => {
          setFormData(prev => ({ ...prev, ...data }));
          setCurrentStep(prev => prev + 1);
        })();
        break;
      case 5:
        step6Form.handleSubmit(async (data) => {
          const finalFormData = { ...formData, ...data };
          console.log("Form submitted", finalFormData);
          
          try {
            setIsSubmitting(true);
            
            // Format the data for Supabase
            const submission = {
              // Step 1
              project_name: finalFormData.projectName,
              project_stage: finalFormData.projectStage,
              objective: finalFormData.objective,
              objective_other: finalFormData.objectiveOther,
              
              // Step 2
              has_website: finalFormData.hasWebsite,
              has_branding: finalFormData.hasBranding,
              uses_digital_tools: finalFormData.usesDigitalTools,
              digital_tools_details: finalFormData.digitalToolsDetails,
              
              // Step 3
              target_audience: finalFormData.targetAudience,
              ideal_client: finalFormData.idealClient,
              currently_selling: finalFormData.currentlySelling,
              
              // Step 4
              need_website: finalFormData.needs?.website || false,
              need_sales_funnel: finalFormData.needs?.salesFunnel || false,
              need_branding: finalFormData.needs?.branding || false,
              need_automation: finalFormData.needs?.automation || false,
              need_ads: finalFormData.needs?.ads || false,
              need_google_reviews: finalFormData.needs?.googleReviews || false,
              need_strategy: finalFormData.needs?.strategy || false,
              need_coaching: finalFormData.needs?.coaching || false,
              
              // Step 5
              budget: finalFormData.budget,
              start_time: finalFormData.startTime,
              
              // Step 6
              full_name: finalFormData.fullName,
              email: finalFormData.email,
              phone: finalFormData.phone,
              contact_preference: finalFormData.contactPreference,
              additional_info: finalFormData.additionalInfo
            };
            
            // Save data to Supabase
            const { error } = await supabase.from('project_submissions' as any).insert([submission]);
            
            if (error) {
              throw error;
            }
            
            // Send notification emails via edge function
            try {
              await supabase.functions.invoke('send-notification', {
                body: {
                  projectName: finalFormData.projectName,
                  fullName: finalFormData.fullName,
                  email: finalFormData.email,
                  phone: finalFormData.phone,
                  objective: finalFormData.objective,
                  budget: finalFormData.budget,
                },
              });
            } catch (emailError) {
              console.error("Failed to send notification email:", emailError);
              // Don't fail the submission if email fails
            }
            
            toast.success("Votre projet a été soumis avec succès! Nous vous contacterons bientôt.");
            
            // Show success step instead of redirecting
            setIsSuccess(true);
            
          } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("Une erreur est survenue lors de la soumission du formulaire. Veuillez réessayer.");
          } finally {
            setIsSubmitting(false);
          }
        })();
        break;
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0 && !isSuccess) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Calculate progress percentage
  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  const renderStepContent = () => {
    // Show success step after submission
    if (isSuccess) {
      return <SuccessStep />;
    }

    // Show regular form steps
    switch(currentStep) {
      case 0:
        return <Step1ProjectInfo form={step1Form} />;
      case 1:
        return <Step2Presence form={step2Form} />;
      case 2:
        return <Step3Target form={step3Form} />;
      case 3:
        return <Step4Needs form={step4Form} />;
      case 4:
        return <Step5Budget form={step5Form} />;
      case 5:
        return <Step6Contact form={step6Form} />;
      default:
        return null;
    }
  };

  // Animation variants for the form card
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="max-w-3xl mx-auto mb-10"
    >
      <div className="relative bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Gradient background effect inspired by the Hero component */}
        <div className="absolute inset-0 bg-gradient-to-br from-dikio-accent/10 to-dikio-subtitle/10 rounded-xl transform -rotate-1 scale-105 z-0"></div>
        
        <div className="relative z-10 p-8">
          {/* Progress indicator - hide on success */}
          {!isSuccess && <FormProgressBar steps={steps} currentStep={currentStep} />}
          
          {/* Progress text */}
          {!isSuccess && (
            <div className="flex justify-between text-sm text-gray-500 mb-8">
              <span>Étape {currentStep + 1} sur {steps.length}</span>
              <span>{Math.round(progressPercentage)}% complété</span>
            </div>
          )}

          {/* Form content */}
          <div className="min-h-[400px] bg-white p-6 rounded-lg shadow-inner">
            {renderStepContent()}
          </div>
          
          {/* Navigation buttons */}
          <FormNavigation 
            currentStep={currentStep}
            totalSteps={steps.length}
            isSubmitting={isSubmitting}
            isSuccess={isSuccess}
            onBack={handleBack}
            onNext={handleNext}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectFormSteps;
