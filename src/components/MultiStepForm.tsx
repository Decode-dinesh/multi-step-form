import { useMultiStepForm } from "@/hooks/use-multistep-form";
import type { StepFormData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader } from "./ui/card";
import ProgressSteps from "./Progress-steps";
import { Button } from "./ui/button";
import {
  BillingInfoStep,
  PersonalInfoStep,
  ProfessionalInfoStep,
} from "./Steps";
import { ChevronLeft, ChevronRight } from "lucide-react";
const MultiStepForm = () => {
  const {
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
    submitForm,
  } = useMultiStepForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    reset,
  } = useForm<StepFormData>({
    resolver: zodResolver(getCurrentStepSchema()),
    mode: "onChange",
    defaultValues: formData,
  });

  useEffect(() => {
    reset(formData);
  }, [currentStep, formData, reset]);

  const onNext =async (data: StepFormData) => {
    // manual validation check 
    const isValid = await trigger()
    if(!isValid) return;

    console.log(data);
    const updatedData = {...formData, ...data}
    updateFormData(updatedData);
    // merge current step data  with previous 
    if(isLastStep){
try {
    submitForm(updatedData)
} catch (error) {
    console.error("submission Failed", error)
}
    }else{
        goToNextStep();
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <ProgressSteps currentStep={currentStep} steps={steps} />
        </CardHeader>
        <CardContent className="space-y-6">
          {currentStep === 0 && <PersonalInfoStep register={register} errors={errors} setValue={setValue} />}
          {currentStep === 1 && <ProfessionalInfoStep register={register} errors={errors} setValue={setValue} />}
          {currentStep === 2 && <BillingInfoStep register={register} errors={errors} setValue={setValue} />}

          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={goToPreviousStep}
              disabled={isFirstStep}
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> Previous
            </Button>
            <Button type="button" onClick={handleSubmit(onNext)}>
              {isLastStep ? "Submit" : "Next"}
              {!isLastStep && <ChevronRight className="w-4 h-4 ml-1" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MultiStepForm;
