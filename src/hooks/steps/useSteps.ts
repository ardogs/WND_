import { useState } from 'react'
import { StepsProps } from '../../components/organisms/steps/types'
import { Form } from '../../components/atoms'

export interface StepsContent {
  title: string
  content: React.ReactNode
  fieldsToValidate?: string[]
}

export const useSteps = (steps: StepsContent[]) => {
  const form = Form.useFormInstance()

  const [status, setStatus] = useState<StepsProps['status']>('wait')
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [direction, setDirection] = useState<number>(1)

  const next = () => {
    setDirection(1)
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
    setStatus('wait')
  }

  const previous = () => {
    setDirection(-1)
    setCurrentStep((prev) => Math.max(prev - 1, 0))
    setStatus('finish')
  }

  const handleNext = async () => {
    if (!form) {
      next()
      return
    }

    try {
      const currentStepConfig = steps[currentStep]
      if (
        currentStepConfig?.fieldsToValidate &&
        currentStepConfig.fieldsToValidate.length > 0
      ) {
        await form.validateFields(currentStepConfig.fieldsToValidate)
      }
      next()
    } catch (error) {
      console.log('Validación falló, hay campos obligatorios vacíos en este paso.', error)
    }
  }

  const items = steps.map((item) => ({ key: item.title, title: item.title }))

  return {
    status,
    currentStep,
    direction,
    items,
    next,
    previous,
    showPreviousButton: currentStep > 0 && currentStep < steps.length - 1,
    handleNext,
  }
}
