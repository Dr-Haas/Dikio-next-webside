import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { UseFormReturn } from 'react-hook-form';

// Step 6 schema
export const step6Schema = z.object({
  fullName: z.string().min(2, "Votre nom est requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().optional(),
  contactPreference: z.enum(["email", "phone", "whatsapp", "any"]),
  additionalInfo: z.string().optional(),
});

export type Step6FormData = z.infer<typeof step6Schema>;

interface Step6Props {
  form: UseFormReturn<Step6FormData>;
}

const Step6Contact: React.FC<Step6Props> = ({ form }) => {
  return (
    <div className="animate-fade-in">
      <Form {...form}>
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>13. Prénom / Nom</FormLabel>
                <FormControl>
                  <Input placeholder="Votre nom complet" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>14. Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="votre@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>15. Téléphone (facultatif)</FormLabel>
                <FormControl>
                  <Input placeholder="Votre numéro de téléphone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactPreference"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>16. Comment préférez-vous qu'on vous contacte ?</FormLabel>
                <FormControl>
                  <RadioGroup 
                    onValueChange={field.onChange} 
                    value={field.value} 
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="email" id="contact_email" />
                      <Label htmlFor="contact_email" className="cursor-pointer">Mail</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="phone" id="contact_phone" />
                      <Label htmlFor="contact_phone" className="cursor-pointer">Téléphone</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="whatsapp" id="contact_whatsapp" />
                      <Label htmlFor="contact_whatsapp" className="cursor-pointer">WhatsApp</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="any" id="contact_any" />
                      <Label htmlFor="contact_any" className="cursor-pointer">Pas de préférence</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="additionalInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>17. Une dernière chose à nous dire ?</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Informations supplémentaires" 
                    className="min-h-[100px]" 
                    {...field} 
                  />
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

export default Step6Contact;
