
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { submitDsr } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Loader2, ClipboardList, Car } from "lucide-react";

const dsrSchema = z.object({
  description: z.string().min(10, "Please provide a detailed description of your work."),
  hasTravelled: z.boolean().default(false),
  openingKm: z.coerce.number().optional(),
  closingKm: z.coerce.number().optional(),
}).refine(data => {
    if (data.hasTravelled) {
        return data.openingKm !== undefined && data.closingKm !== undefined && data.closingKm > data.openingKm;
    }
    return true;
}, {
    message: "Closing KM must be greater than Opening KM.",
    path: ["closingKm"],
});

type DsrFormData = z.infer<typeof dsrSchema>;

export default function DsrPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<DsrFormData>({
    resolver: zodResolver(dsrSchema),
    defaultValues: {
      description: "",
      hasTravelled: false,
    },
  });

  const { watch } = form;
  const hasTravelled = watch("hasTravelled");

  async function onSubmit(values: DsrFormData) {
    setIsSubmitting(true);
    const result = await submitDsr(values);
    if (result.success) {
      toast({
        title: "Success!",
        description: result.message,
      });
      form.reset();
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.message,
      });
    }
    setIsSubmitting(false);
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-secondary p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-3xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Daily Status Report (DSR)</h1>
          <p className="text-muted-foreground">Log your work activities for the day.</p>
        </header>

        <Card>
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Work Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the tasks you completed, clients you contacted, and any other work-related activities..."
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hasTravelled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I have travelled for a visit today.
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                {hasTravelled && (
                    <div className="space-y-4 rounded-md border p-4">
                        <h4 className="font-semibold flex items-center gap-2"><Car /> Travel Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="openingKm"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Opening KM</FormLabel>
                                    <FormControl><Input type="number" placeholder="e.g., 15000" {...field} /></FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="closingKm"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Closing KM</FormLabel>
                                    <FormControl><Input type="number" placeholder="e.g., 15100" {...field} /></FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                )}
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <ClipboardList className="mr-2 h-4 w-4" />
                  )}
                  Submit DSR
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
