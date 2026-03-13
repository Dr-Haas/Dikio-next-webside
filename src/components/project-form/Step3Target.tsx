import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { UseFormReturn } from 'react-hook-form';

// Step 3 schema
export const step3Schema = z.object({
  targetAudience: z.enum(["public", "b2b", "both", "unknown"]),
  idealClient: z.string().min(5, "Veuillez décrire votre client idéal"),
  currentlySelling: z.enum(["not_yet", "online", "physical", "both"]),
});

export type Step3FormData = z.infer<typeof step3Schema>;

interface Step3Props {
  form: UseFormReturn<Step3FormData>;
}

const Step3Target: React.FC<Step3Props> = ({ form }) => {
  return (
    <div className="animate-fade-in">
      <Form {...form}>
        <form className="space-y-6">
          <FormField
            control={form.control}
            name="targetAudience"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>7. À qui s'adresse votre projet ?</FormLabel>
                <FormControl>
                  <RadioGroup 
                    onValueChange={field.onChange} 
                    defaultValue={field.value} 
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="public" id="public" />
                      <Label htmlFor="public" className="cursor-pointer">Grand public</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="b2b" id="b2b" />
                      <Label htmlFor="b2b" className="cursor-pointer">Professionnels (B2B)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="both" id="both" />
                      <Label htmlFor="both" className="cursor-pointer">Les deux</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="unknown" id="unknown" />
                      <Label htmlFor="unknown" className="cursor-pointer">Je ne sais pas encore</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="idealClient"
            render={({ field }) => (
              <FormItem>
                <FormLabel>8. Décrivez brièvement votre client idéal</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Description de votre client idéal" 
                    {...field} 
                    className="min-h-[100px]" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currentlySelling"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>9. Vendez-vous déjà quelque chose ?</FormLabel>
                <FormControl>
                  <RadioGroup 
                    onValueChange={field.onChange} 
                    defaultValue={field.value} 
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="not_yet" id="not_yet" />
                      <Label htmlFor="not_yet" className="cursor-pointer">Pas encore</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="online" id="online" />
                      <Label htmlFor="online" className="cursor-pointer">Oui, en ligne</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="physical" id="physical" />
                      <Label htmlFor="physical" className="cursor-pointer">Oui, physiquement</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="both" id="selling_both" />
                      <Label htmlFor="selling_both" className="cursor-pointer">Les deux</Label>
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

export default Step3Target;
