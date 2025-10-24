import type { Step } from '@/types'
import { Check } from 'lucide-react';

const ProgressSteps = ({currentStep, steps}:{
    currentStep: number,
    steps: Step[],
}) => {
  return (
    <div className='flex justify-between items-center'>{
      steps.map((step,index) => {
        const Icon = step.icon;
        const isCompleted =  index< currentStep;
        const isCurrent = index === currentStep; 

        return (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isCompleted ? 'bg-primary text-primary-foreground': isCurrent ? 'bg-primary text-primary-foreground': 'bg-gray-200 text-gray-500'}`}>

              {isCompleted ?(
                <Check className='w-5 h-5' />
              ):(
                <Icon className='w-5 h-5' />
              )}
              </div>
              <span className='text-xs mt-2 font-medium'>{step.name}</span>
            </div>
          </div>
        )
      })
    }</div>
  )
}

export default ProgressSteps