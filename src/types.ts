import {z} from 'zod';

export const personalInfoSchema = z.object({
    firstName: z.string().min(1, "FirstName is required"),
    lastName:z.string().min(1,"LastName is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10,"Phone number is too short"),
})

export const professionalSchema = z.object({
    company: z.string().min(1, "company is required"),
    position:z.string().min(1,"position is required"),
    experience:z.enum(['0-2', '3-5','6-10','10+']),
    industry:z.string().min(1, "Industry is required")
})

export const billingInfoSchema = z.object({
    cardNumber: z
    .string()
    .min(16," Card Number must be 16digits")
    .max(16, "cardNumber must be 16digits"),
    cardHolder: z.string().min(1, "cardholder name is required"),
    expiryDate: z.string().min(4, "invalid expiry date"),
    cvv: z.string().min(3,"invalid cvv").max(4)
})

export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type ProfessionalInfo = z.infer<typeof professionalSchema>;
export type BillingInfo = z.infer<typeof billingInfoSchema>;

export type StepFormData = PersonalInfo | ProfessionalInfo | BillingInfo;

export type AllFormFields = PersonalInfo & ProfessionalInfo & BillingInfo;

export interface Step{
    id: string,
    name: string,
    icon:React.ComponentType<{ className?: string}>
}