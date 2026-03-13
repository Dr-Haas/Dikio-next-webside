
import { z } from 'zod';
import { step1Schema } from './Step1ProjectInfo';
import { step2Schema } from './Step2Presence';
import { step3Schema } from './Step3Target';
import { step4Schema } from './Step4Needs';
import { step5Schema } from './Step5Budget';
import { step6Schema } from './Step6Contact';

// Define the type for the complete form data
export type ProjectFormData = {
  // Step 1
  projectName?: string;
  projectStage?: 'idea' | 'prototype' | 'ready' | 'active';
  objective?: 'launch' | 'visibility' | 'structure' | 'delegate' | 'other';
  objectiveOther?: string;
  
  // Step 2
  hasWebsite?: 'no' | 'yes_rebuild' | 'yes_optimize';
  hasBranding?: 'no' | 'partially' | 'yes';
  usesDigitalTools?: boolean;
  digitalToolsDetails?: string;
  
  // Step 3
  targetAudience?: 'public' | 'b2b' | 'both' | 'unknown';
  idealClient?: string;
  currentlySelling?: 'not_yet' | 'online' | 'physical' | 'both';
  
  // Step 4
  needs?: {
    website?: boolean;
    salesFunnel?: boolean;
    branding?: boolean;
    automation?: boolean;
    ads?: boolean;
    googleReviews?: boolean;
    strategy?: boolean;
    coaching?: boolean;
  };
  
  // Step 5
  budget?: 'low' | 'medium' | 'high' | 'very_high' | 'unknown';
  startTime?: 'immediately' | 'this_month' | '2_3_months' | 'later';
  
  // Step 6
  fullName?: string;
  email?: string;
  phone?: string;
  contactPreference?: 'email' | 'phone' | 'whatsapp' | 'any';
  additionalInfo?: string;
}

// Combined schema for data submission
export const projectFormSchema = {
  step1: step1Schema,
  step2: step2Schema,
  step3: step3Schema,
  step4: step4Schema,
  step5: step5Schema,
  step6: step6Schema
};

export type ProjectFormSchemaType = typeof projectFormSchema;
