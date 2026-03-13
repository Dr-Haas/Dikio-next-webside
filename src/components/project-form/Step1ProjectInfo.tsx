
import React from 'react';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { UseFormReturn } from 'react-hook-form';

// Step 1 schema
export const step1Schema = z.object({
  projectName: z.string().min(2, "Le nom du projet est requis"),
  projectStage: z.enum(["idea", "prototype", "ready", "active"]),
  objective: z.enum(["launch", "visibility", "structure", "delegate", "other"]),
  objectiveOther: z.string().optional(),
});

export type Step1FormData = z.infer<typeof step1Schema>;

interface Step1Props {
  form: UseFormReturn<Step1FormData>;
}

const Step1ProjectInfo: React.FC<Step1Props> = ({ form }) => {
  return (
    <div className="animate-fade-in">
      <Form {...form}>
        <form className="space-y-6">
          <FormField
            control={form.control}
            name="projectName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>1. Quel est le nom de votre projet (ou idée) ?</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Nom du projet" 
                    {...field} 
                    className="focus:ring-dikio-accent" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="projectStage"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>2. À quel stade en êtes-vous ?</FormLabel>
                <FormControl>
                  <RadioGroup 
                    onValueChange={field.onChange} 
                    defaultValue={field.value} 
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="idea" id="idea" />
                      <Label htmlFor="idea" className="cursor-pointer">Juste une idée</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="prototype" id="prototype" />
                      <Label htmlFor="prototype" className="cursor-pointer">Déjà prototypé</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ready" id="ready" />
                      <Label htmlFor="ready" className="cursor-pointer">Produit/service prêt</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="active" id="active" />
                      <Label htmlFor="active" className="cursor-pointer">Déjà en ligne / en activité</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="objective"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>3. Quel est votre objectif principal avec Dikio ?</FormLabel>
                <FormControl>
                  <RadioGroup 
                    onValueChange={field.onChange} 
                    defaultValue={field.value} 
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="launch" id="launch" />
                      <Label htmlFor="launch" className="cursor-pointer">Lancer mon projet</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="visibility" id="visibility" />
                      <Label htmlFor="visibility" className="cursor-pointer">Booster ma visibilité</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="structure" id="structure" />
                      <Label htmlFor="structure" className="cursor-pointer">Mieux structurer mon activité</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="delegate" id="delegate" />
                      <Label htmlFor="delegate" className="cursor-pointer">Déléguer et automatiser</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other" className="cursor-pointer">Autre</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.watch("objective") === "other" && (
            <FormField
              control={form.control}
              name="objectiveOther"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Précisez votre objectif</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre objectif" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </form>
      </Form>
    </div>
  );
};

export default Step1ProjectInfo;
