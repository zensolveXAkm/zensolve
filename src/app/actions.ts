"use server";

import { z } from "zod";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy, limit } from "firebase/firestore";
import { revalidatePath } from "next/cache";


export async function getLogs() {
  try {
    const logsQuery = query(collection(db, "activityLogs"), orderBy("timestamp", "desc"), limit(10));
    const logsSnapshot = await getDocs(logsQuery);
    const logs = logsSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        timestamp: data.timestamp.toDate(),
      }
    });
    return { success: true, logs };
  } catch (error) {
    console.error("Error fetching logs:", error);
    return { success: false, logs: [] };
  }
}


const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  subject: z.string().min(5, "Subject must be at least 5 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export async function submitContactForm(data: z.infer<typeof contactFormSchema>) {
  const validatedFields = contactFormSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Invalid form data.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    console.log("Form submitted successfully:", validatedFields.data);
    
    return {
      success: true,
      message: "Thank you for your message! We will get back to you soon.",
    };
  } catch (error) {
    console.error("Error submitting form:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}

const jobSchema = z.object({
  title: z.string().min(3, "Title is required."),
  company: z.string().min(2, "Company name is required."),
  location: z.string().min(2, "Location is required."),
  type: z.string().min(1, "Job type is required."),
  workMode: z.string().min(1, "Work mode is required."),
  experienceMin: z.coerce.number().min(0).optional(),
  experienceMax: z.coerce.number().min(0).optional(),
  salaryMin: z.coerce.number().min(0).optional(),
  salaryMax: z.coerce.number().min(0).optional(),
  department: z.string().min(1, "Department is required."),
  companyType: z.string().min(1, "Company type is required."),
  roleCategory: z.string().min(1, "Role category is required."),
  education: z.string().min(1, "Education is required."),
  industry: z.string().min(1, "Industry is required."),
  description: z.string().min(10, "Description is required."),
  tags: z.string().optional(),
});


export async function addJob(data: z.infer<typeof jobSchema>) {
  const validatedFields = jobSchema.safeParse(data);

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      success: false,
      message: "Invalid job data. Please check all fields.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  try {
    const jobData = validatedFields.data;
    const tagsArray = jobData.tags ? jobData.tags.split(',').map(tag => tag.trim()) : [];
    
    await addDoc(collection(db, "jobs"), {
      ...jobData,
      tags: tagsArray,
      postedAt: serverTimestamp(),
    });

    revalidatePath("/jobs");
    revalidatePath("/admin");

    return {
      success: true,
      message: "Job added successfully!",
    };

  } catch (error) {
    console.error("Error adding job:", error);
    return {
      success: false,
      message: "Failed to add job. Please try again.",
    };
  }
}


const applicationSchema = z.object({
  jobId: z.string(),
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
  highestQualification: z.string().optional(),
  yearOfPassing: z.string().optional(),
  university: z.string().optional(),
  specialization: z.string().optional(),
  hasExperience: z.enum(["yes", "no"]),
  previousCompany: z.string().optional(),
  designation: z.string().optional(),
  yearsOfExperience: z.coerce.number().optional(),
  linkedin: z.string().optional(),
  technicalSkills: z.string().optional(),
  softSkills: z.string().optional(),
  certifications: z.string().optional(),
  languages: z.array(z.string()).optional(),
  preferredRole: z.string().optional(),
  preferredLocation: z.string().optional(),
  expectedSalary: z.string().optional(),
  noticePeriod: z.string().optional(),
  readyToRelocate: z.enum(["yes", "no"]),
  whyShouldWeHireYou: z.string().optional(),
  confirmInfo: z.boolean().refine(val => val === true, { message: "You must confirm the information is true." }),
  agreeTerms: z.boolean().refine(val => val === true, { message: "You must agree to the terms." }),
});

export async function applyForJob(data: z.infer<typeof applicationSchema>) {
  const validatedFields = applicationSchema.safeParse(data);

  if (!validatedFields.success) {
    console.error("Validation Errors:", validatedFields.error.flatten().fieldErrors);
    return {
      success: false,
      message: "Invalid application data. Please check all fields.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const applicationData = validatedFields.data;
    
    // Create a new document in the 'applications' collection
    await addDoc(collection(db, "applications"), {
      ...applicationData,
      submittedAt: serverTimestamp(),
    });

    return {
      success: true,
      message: "Application submitted successfully! We will get back to you soon.",
    };

  } catch (error) {
    console.error("Error submitting application:", error);
    return {
      success: false,
      message: "Failed to submit application. Please try again.",
    };
  }
}
