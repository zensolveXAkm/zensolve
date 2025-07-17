
"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { applyForJob } from "@/app/actions";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Loader2, User, Home, GraduationCap, Briefcase, Sparkles, Send } from "lucide-react";
import { Label } from "@/components/ui/label";

const applicationSchema = z.object({
  // Step 1
  fullName: z.string().min(2, "Full name is required."),
  dob: z.string().optional(),
  gender: z.string().optional(),
  mobile: z.string().min(10, "A valid mobile number is required."),
  email: z.string().email("A valid email address is required."),
  whatsapp: z.string().optional(),
  permanentAddress: z.string().optional(),
  currentAddress: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  pincode: z.string().optional(),
  
  // Step 2
  highestQualification: z.string().optional(),
  yearOfPassing: z.string().optional(),
  university: z.string().optional(),
  specialization: z.string().optional(),
  hasExperience: z.enum(["yes", "no"]).default("no"),
  previousCompany: z.string().optional(),
  designation: z.string().optional(),
  yearsOfExperience: z.coerce.number().optional(),
  linkedin: z.string().url("Please enter a valid URL.").optional().or(z.literal('')),
  
  // Step 3
  technicalSkills: z.string().optional(),
  softSkills: z.string().optional(),
  certifications: z.string().optional(),
  languages: z.array(z.string()).optional(),
  preferredRole: z.string().optional(),
  preferredLocation: z.string().optional(),
  expectedSalary: z.string().optional(),
  noticePeriod: z.string().optional(),
  readyToRelocate: z.enum(["yes", "no"]).default("no"),
  whyShouldWeHireYou: z.string().min(20, "Please provide a more detailed answer.").optional(),
  confirmInfo: z.boolean().refine(val => val === true, { message: "You must confirm the information is true." }),
  agreeTerms: z.boolean().refine(val => val === true, { message: "You must agree to the terms." }),
});


export default function ApplyJobPage({ params }: { params: { jobId: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof applicationSchema>>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      fullName: "",
      mobile: "",
      email: "",
      hasExperience: "no",
      readyToRelocate: "no",
      languages: [],
      confirmInfo: false,
      agreeTerms: false,
    },
  });

  const { watch, trigger } = form;
  const hasExperience = watch("hasExperience");

  const steps = [
    { title: "Personal Details", fields: ["fullName", "mobile", "email", "dob", "gender", "whatsapp", "permanentAddress", "currentAddress", "city", "state", "pincode"] },
    { title: "Education & Experience", fields: ["highestQualification", "yearOfPassing", "university", "specialization", "hasExperience", "previousCompany", "designation", "yearsOfExperience", "linkedin"] },
    { title: "Skills & Preferences", fields: ["technicalSkills", "softSkills", "certifications", "languages", "preferredRole", "preferredLocation", "expectedSalary", "noticePeriod", "readyToRelocate", "whyShouldWeHireYou", "confirmInfo", "agreeTerms"] },
  ];

  const handleNext = async () => {
    const fieldsToValidate = steps[currentStep].fields;
    const isValid = await trigger(fieldsToValidate as any, { shouldFocus: true });
    if (isValid) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  async function onSubmit(values: z.infer<typeof applicationSchema>) {
    setIsSubmitting(true);
    const result = await applyForJob({
      ...values,
      jobId: params.jobId,
    });

    if (result.success) {
      toast({
        title: "Application Submitted!",
        description: result.message,
      });
      router.push("/jobs");
    } else {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: result.message,
      });
    }
    setIsSubmitting(false);
  }

  const progress = ((currentStep + 1) / (steps.length + 1)) * 100;

  return (
    <div className="min-h-screen bg-secondary p-4 sm:p-8 flex items-center justify-center">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold text-center">Apply for Job</CardTitle>
          <CardDescription className="text-center">Please fill out the form below to submit your application.</CardDescription>
          <div className="pt-4">
            <Progress value={progress} className="w-full" />
            <p className="text-center text-sm text-muted-foreground mt-2">Step {currentStep + 1} of {steps.length}</p>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {currentStep === 0 && (
                <section className="space-y-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2"><User /> Personal Details</h3>
                   <div className="grid md:grid-cols-2 gap-6">
                     <FormField control={form.control} name="fullName" render={({ field }) => ( <FormItem><FormLabel>Full Name*</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem> )} />
                     <FormField control={form.control} name="dob" render={({ field }) => ( <FormItem><FormLabel>Date of Birth</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem> )} />
                   </div>
                   <FormField control={form.control} name="gender" render={({ field }) => ( <FormItem><FormLabel>Gender</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger></FormControl><SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem><SelectItem value="other">Other</SelectItem></SelectContent></Select><FormMessage /></FormItem> )} />
                   <div className="grid md:grid-cols-2 gap-6">
                     <FormField control={form.control} name="mobile" render={({ field }) => ( <FormItem><FormLabel>Mobile Number*</FormLabel><FormControl><Input placeholder="9876543210" {...field} /></FormControl><FormMessage /></FormItem> )} />
                     <FormField control={form.control} name="email" render={({ field }) => ( <FormItem><FormLabel>Email Address*</FormLabel><FormControl><Input type="email" placeholder="john.doe@example.com" {...field} /></FormControl><FormMessage /></FormItem> )} />
                   </div>
                   <FormField control={form.control} name="whatsapp" render={({ field }) => ( <FormItem><FormLabel>WhatsApp Number</FormLabel><FormControl><Input placeholder="9876543210" {...field} /></FormControl><FormMessage /></FormItem> )} />

                   <h3 className="text-lg font-semibold flex items-center gap-2 pt-4"><Home /> Address Details</h3>
                   <FormField control={form.control} name="permanentAddress" render={({ field }) => ( <FormItem><FormLabel>Permanent Address</FormLabel><FormControl><Textarea placeholder="123 Main St..." {...field} /></FormControl><FormMessage /></FormItem> )} />
                   <FormField control={form.control} name="currentAddress" render={({ field }) => ( <FormItem><FormLabel>Current Address</FormLabel><FormControl><Textarea placeholder="456 Park Ave..." {...field} /></FormControl><FormMessage /></FormItem> )} />
                   <div className="grid md:grid-cols-3 gap-6">
                     <FormField control={form.control} name="city" render={({ field }) => ( <FormItem><FormLabel>City</FormLabel><FormControl><Input placeholder="New York" {...field} /></FormControl><FormMessage /></FormItem> )} />
                     <FormField control={form.control} name="state" render={({ field }) => ( <FormItem><FormLabel>State</FormLabel><FormControl><Input placeholder="NY" {...field} /></FormControl><FormMessage /></FormItem> )} />
                     <FormField control={form.control} name="pincode" render={({ field }) => ( <FormItem><FormLabel>Pincode</FormLabel><FormControl><Input placeholder="10001" {...field} /></FormControl><FormMessage /></FormItem> )} />
                   </div>
                </section>
              )}

              {currentStep === 1 && (
                <section className="space-y-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2"><GraduationCap /> Education Details</h3>
                   <FormField control={form.control} name="highestQualification" render={({ field }) => ( <FormItem><FormLabel>Highest Qualification</FormLabel><FormControl><Input placeholder="e.g., B.Tech in Computer Science" {...field} /></FormControl><FormMessage /></FormItem> )} />
                   <div className="grid md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="yearOfPassing" render={({ field }) => ( <FormItem><FormLabel>Year of Passing</FormLabel><FormControl><Input type="number" placeholder="2024" {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={form.control} name="university" render={({ field }) => ( <FormItem><FormLabel>University/Board</FormLabel><FormControl><Input placeholder="e.g., University of Delhi" {...field} /></FormControl><FormMessage /></FormItem> )} />
                   </div>
                   <FormField control={form.control} name="specialization" render={({ field }) => ( <FormItem><FormLabel>Specialization/Stream</FormLabel><FormControl><Input placeholder="e.g., Computer Science" {...field} /></FormControl><FormMessage /></FormItem> )} />

                  <h3 className="text-lg font-semibold flex items-center gap-2 pt-4"><Briefcase /> Work Experience</h3>
                  <FormField control={form.control} name="hasExperience" render={({ field }) => (
                    <FormItem className="space-y-3"><FormLabel>Do you have work experience?</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                          <FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="yes" /></FormControl><FormLabel className="font-normal">Yes</FormLabel></FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="no" /></FormControl><FormLabel className="font-normal">No</FormLabel></FormItem>
                        </RadioGroup>
                      </FormControl><FormMessage />
                    </FormItem>
                  )} />
                  {hasExperience === 'yes' && (
                    <div className="space-y-6 border-l-2 border-primary pl-4">
                      <FormField control={form.control} name="previousCompany" render={({ field }) => ( <FormItem><FormLabel>Previous Company Name</FormLabel><FormControl><Input placeholder="Tech Corp" {...field} /></FormControl><FormMessage /></FormItem> )} />
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="designation" render={({ field }) => ( <FormItem><FormLabel>Designation</FormLabel><FormControl><Input placeholder="Software Engineer" {...field} /></FormControl><FormMessage /></FormItem> )} />
                        <FormField control={form.control} name="yearsOfExperience" render={({ field }) => ( <FormItem><FormLabel>Years of Experience</FormLabel><FormControl><Input type="number" placeholder="3" {...field} /></FormControl><FormMessage /></FormItem> )} />
                      </div>
                    </div>
                  )}
                  <FormField control={form.control} name="linkedin" render={({ field }) => ( <FormItem><FormLabel>LinkedIn Profile URL</FormLabel><FormControl><Input placeholder="https://linkedin.com/in/johndoe" {...field} /></FormControl><FormMessage /></FormItem> )} />
                </section>
              )}

              {currentStep === 2 && (
                <section className="space-y-6">
                   <h3 className="text-lg font-semibold flex items-center gap-2"><Sparkles /> Skills & Preferences</h3>
                   <FormField control={form.control} name="technicalSkills" render={({ field }) => ( <FormItem><FormLabel>Technical Skills</FormLabel><FormControl><Textarea placeholder="e.g., React, Node.js, Python" {...field} /></FormControl><FormMessage /></FormItem> )} />
                   <FormField control={form.control} name="softSkills" render={({ field }) => ( <FormItem><FormLabel>Soft Skills</FormLabel><FormControl><Textarea placeholder="e.g., Communication, Teamwork" {...field} /></FormControl><FormMessage /></FormItem> )} />
                   <div className="grid md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="certifications" render={({ field }) => ( <FormItem><FormLabel>Certifications</FormLabel><FormControl><Input placeholder="e.g., AWS Certified Developer" {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormItem>
                      <FormLabel>Language Proficiency</FormLabel>
                      <div className="flex gap-4">
                        {['English', 'Hindi', 'Other'].map(lang => (
                          <FormField key={lang} control={form.control} name="languages"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(lang)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...(field.value || []), lang])
                                        : field.onChange(field.value?.filter((value) => value !== lang))
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">{lang}</FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                   </div>
                   <div className="grid md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="preferredRole" render={({ field }) => ( <FormItem><FormLabel>Preferred Job Role</FormLabel><FormControl><Input placeholder="e.g., Frontend Developer" {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={form.control} name="preferredLocation" render={({ field }) => ( <FormItem><FormLabel>Preferred Location</FormLabel><FormControl><Input placeholder="e.g., Remote, New York" {...field} /></FormControl><FormMessage /></FormItem> )} />
                   </div>
                   <div className="grid md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="expectedSalary" render={({ field }) => ( <FormItem><FormLabel>Expected Salary (LPA)</FormLabel><FormControl><Input placeholder="e.g., 15" {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={form.control} name="noticePeriod" render={({ field }) => ( <FormItem><FormLabel>Notice Period</FormLabel><FormControl><Input placeholder="e.g., 30 days, Immediate" {...field} /></FormControl><FormMessage /></FormItem> )} />
                   </div>
                   <FormField control={form.control} name="readyToRelocate" render={({ field }) => (
                      <FormItem className="space-y-3"><FormLabel>Are you ready to relocate?</FormLabel>
                        <FormControl>
                          <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                            <FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="yes" /></FormControl><FormLabel className="font-normal">Yes</FormLabel></FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="no" /></FormControl><FormLabel className="font-normal">No</FormLabel></FormItem>
                          </RadioGroup>
                        </FormControl><FormMessage />
                      </FormItem>
                    )} />
                   <FormField control={form.control} name="whyShouldWeHireYou" render={({ field }) => ( <FormItem><FormLabel>Why should we hire you?</FormLabel><FormControl><Textarea placeholder="Tell us about your strengths and how you can contribute to our team." className="min-h-[120px]" {...field} /></FormControl><FormMessage /></FormItem> )} />

                   <div className="space-y-4 pt-4">
                      <FormField control={form.control} name="confirmInfo" render={({ field }) => (<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><div className="space-y-1 leading-none"><FormLabel>I confirm that the information provided is true to the best of my knowledge.</FormLabel></div></FormItem>)} />
                      <FormField control={form.control} name="agreeTerms" render={({ field }) => (<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><div className="space-y-1 leading-none"><FormLabel>I agree to the company’s terms and conditions.</FormLabel></div></FormItem>)} />
                   </div>
                </section>
              )}

              <div className="flex justify-between pt-8">
                {currentStep > 0 && (
                  <Button type="button" variant="outline" onClick={handlePrev}>
                    Previous
                  </Button>
                )}
                {currentStep < steps.length - 1 ? (
                  <Button type="button" onClick={handleNext} className="ml-auto">
                    Next
                  </Button>
                ) : (
                  <Button type="submit" className="ml-auto" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                    Submit Application
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
