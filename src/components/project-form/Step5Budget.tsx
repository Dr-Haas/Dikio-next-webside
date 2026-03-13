import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { UseFormReturn } from 'react-hook-form';

// Step 5 schema
export const step5Schema = z.object({
  budget: z.enum(["low", "medium", "high", "very_high", "unknown"]),
  startTime: z.enum(["immediately", "this_month", "2_3_months", "later"]),
});

export type Step5FormData = z.infer<typeof step5Schema>;

interface Step5Props {
  form: UseFormReturn<Step5FormData>;
}

const Step5Budget: React.FC<Step5Props> = ({ form }) => {
  return (
    <div className="animate-fade-in">
      <Form {...form}>
        <form className="space-y-6">
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>11. Quel budget prévoyez-vous pour ce projet ?</FormLabel>
                <FormControl>
                  <RadioGroup 
                    onValueChange={field.onChange} 
                    defaultValue={field.value} 
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="low" id="low" />
                      <Label htmlFor="low" className="cursor-pointer">{"< 1 000 €"}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="medium" />
                      <Label htmlFor="medium" className="cursor-pointer">1 000 – 3 000 €</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="high" id="high" />
                      <Label htmlFor="high" className="cursor-pointer">3 000 – 5 000 €</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="very_high" id="very_high" />
                      <Label htmlFor="very_high" className="cursor-pointer">{"> 5 000 €"}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="unknown" id="budget_unknown" />
                      <Label htmlFor="budget_unknown" className="cursor-pointer">Je ne sais pas encore</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>12. Quand souhaitez-vous démarrer ?</FormLabel>
                <FormControl>
                  <RadioGroup 
                    onValueChange={field.onChange} 
                    defaultValue={field.value} 
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="immediately" id="immediately" />
                      <Label htmlFor="immediately" className="cursor-pointer">Immédiatement</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="this_month" id="this_month" />
                      <Label htmlFor="this_month" className="cursor-pointer">Ce mois-ci</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2_3_months" id="2_3_months" />
                      <Label htmlFor="2_3_months" className="cursor-pointer">Dans 2-3 mois</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="later" id="later" />
                      <Label htmlFor="later" className="cursor-pointer">Plus tard</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default Step5Budget;
