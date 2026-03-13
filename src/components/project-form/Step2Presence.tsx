import React from 'react';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { UseFormReturn } from 'react-hook-form';

// Step 2 schema
export const step2Schema = z.object({
  hasWebsite: z.enum(["no", "yes_rebuild", "yes_optimize"]),
  hasBranding: z.enum(["no", "partially", "yes"]),
  usesDigitalTools: z.boolean().default(false),
  digitalToolsDetails: z.string().optional(),
});

export type Step2FormData = z.infer<typeof step2Schema>;

interface Step2Props {
  form: UseFormReturn<Step2FormData>;
}

const Step2Presence: React.FC<Step2Props> = ({ form }) => {
  return (
    <div className="animate-fade-in">
      <Form {...form}>
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <FormField
            control={form.control}
            name="hasWebsite"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>4. Avez-vous déjà un site web ?</FormLabel>
                <FormControl>
                  <RadioGroup 
                    onValueChange={field.onChange} 
                    value={field.value} 
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="website_no" />
                      <Label htmlFor="website_no" className="cursor-pointer">Non</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes_rebuild" id="website_rebuild" />
                      <Label htmlFor="website_rebuild" className="cursor-pointer">Oui, et je veux le refaire</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes_optimize" id="website_optimize" />
                      <Label htmlFor="website_optimize" className="cursor-pointer">Oui, je veux l'optimiser</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hasBranding"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>5. Avez-vous un logo, un branding ou une identité visuelle ?</FormLabel>
                <FormControl>
                  <RadioGroup 
                    onValueChange={field.onChange} 
                    value={field.value} 
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="branding_no" />
                      <Label htmlFor="branding_no" className="cursor-pointer">Non</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="partially" id="branding_partially" />
                      <Label htmlFor="branding_partially" className="cursor-pointer">Oui, partiellement</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="branding_yes" />
                      <Label htmlFor="branding_yes" className="cursor-pointer">Oui, je suis satisfait(e)</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-3">
            <h3 className="text-sm font-medium">
              6. Utilisez-vous déjà des outils digitaux ? (CRM, newsletter, automatisation, analytics...)
            </h3>
            
            <div className="flex items-center space-x-6 mt-2">
              <FormField
                control={form.control}
                name="usesDigitalTools"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="usesDigitalTools"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel htmlFor="usesDigitalTools" className="cursor-pointer">
                        Oui
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="usesDigitalTools"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={!field.value}
                        onCheckedChange={(checked) => field.onChange(!checked)}
                        id="doesNotUseDigitalTools"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel htmlFor="doesNotUseDigitalTools" className="cursor-pointer">
                        Non
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {form.watch("usesDigitalTools") && (
              <FormField
                control={form.control}
                name="digitalToolsDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lesquels ?</FormLabel>
                    <FormControl>
                      <Input placeholder="Vos outils digitaux" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Step2Presence;
