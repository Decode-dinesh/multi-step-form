import { billingInfoSchema, personalInfoSchema, professionalSchema, type Step, type StepFormData } from "@/types";
import { Briefcase, CreditCard, User } from "lucide-react";
import { useState } from "react";


const StepSchemas = [
    personalInfoSchema,
    professionalSchema,
    billingInfoSchema,

]
export const steps: Step[] = [
    {id:'personal', name: 'personal info', icon: User},
    {id:'professional', name: 'professional info', icon: Briefcase},
    {id:'billing', name: 'billing info', icon: CreditCard}

]

export function useMultiStepForm(){
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<Partial<StepFormData>>({})
    const [isSubmitted, setIsSubmitted] = useState(false);

    const isFirstStep = currentStep === 0;
    const isLastStep = currentStep === steps.length-1;

    // returns the schema for the current step
    const getCurrentStepSchema = () => StepSchemas[currentStep];

    // goto next step
    const goToNextStep = () => {
        if(!isLastStep) setCurrentStep((prev) => prev + 1);
    }

    const goToPreviousStep = () => {
        if(!isFirstStep) setCurrentStep((prev) => prev -1);
    }

    const updateFormData = (newData: Partial<StepFormData>) => {
        setFormData((prev) => ({...prev, ...newData}));
    }

    const submitForm = (data: StepFormData) => {
        console.log("final submitted data" , data);
        setIsSubmitted(true);
    }

    // reset form

    const resetForm = () => {
        setFormData({}),
        setCurrentStep(0),
        setIsSubmitted(false)
    }

    return {
        currentStep,
        formData,
        isSubmitted,
        isFirstStep,
        isLastStep,
        steps,

        getCurrentStepSchema,
        goToNextStep,
        goToPreviousStep,
        updateFormData,
        submitForm
    }

}