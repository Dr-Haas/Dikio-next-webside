import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { z } from 'zod';
import { UseFormReturn } from 'react-hook-form';

// Step 4 schema
export const step4Schema = z.object({
  needs: z.object({
    website: z.boolean().default(false),
    salesFunnel: z.boolean().default(false),
    branding: z.boolean().default(false),
    automation: z.boolean().default(false),
    ads: z.boolean().default(false),
    googleReviews: z.boolean().default(false),
    strategy: z.boolean().default(false),
    coaching: z.boolean().default(false),
  }),
});

export type Step4FormData = z.infer<typeof step4Schema>;

interface Step4Props {
  form: UseFormReturn<Step4FormData>;
}

const Step4Needs: React.FC<Step4Props> = ({ form }) => {
  return (
    <div className="animate-fade-in">
      <Form {...form}>
        <form className="space-y-6">
          <FormItem>
            <FormLabel className="text-lg font-medium">10. Cochez les besoins qui vous intéressent aujourd'hui :</FormLabel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <FormField
                control={form.control}
                name="needs.website"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="website"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel htmlFor="website" className="cursor-pointer">
                        Création de site internet
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="needs.salesFunnel"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="salesFunnel"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel htmlFor="salesFunnel" className="cursor-pointer">
                        Funnel de vente
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="needs.branding"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="branding"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel htmlFor="branding" className="cursor-pointer">
                        Branding / logo / identité
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="needs.automation"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="automation"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel htmlFor="automation" className="cursor-pointer">
                        Automatisation & IA
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="needs.ads"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="ads"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel htmlFor="ads" className="cursor-pointer">
                        Campagnes Ads (Google, Meta, TikTok)
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="needs.googleReviews"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="googleReviews"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel htmlFor="googleReviews" className="cursor-pointer">
                        Réputation & avis Google
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="needs.strategy"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="strategy"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel htmlFor="strategy" className="cursor-pointer">
                        Positionnement stratégique
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="needs.coaching"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="coaching"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel htmlFor="coaching" className="cursor-pointer">
                        Accompagnement global
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </FormItem>
        </form>
      </Form>
    </div>
  );
};

export default Step4Needs;
