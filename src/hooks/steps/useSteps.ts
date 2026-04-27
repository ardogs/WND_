
import { useState } from "react"
import { StepsProps } from "../../components/organisms/steps/types"
import { Form } from "../../components/atoms";

export interface StepsContent {
    title: string,
    content: React.ReactNode,
    fieldsToValidate?: string[];
}

export const useSteps = (steps: StepsContent[]) => {

    const form = Form.useFormInstance();

    const [status, setStatus] = useState<StepsProps['status']>('wait')
    const [currentStep, setCurrentStep] = useState<number>(0);

    const next = () => {
        setCurrentStep(prev => prev + 1)
        setStatus('wait')
    }

    const previous = () => {
        setCurrentStep(prev => prev - 1)
        setStatus('finish')
    }

    const handleNext = async () => {
        if (!form) {
            return;
        }

        try {
            await form.validateFields();

            if (currentStep <= steps.length - 3) {
                next();
            }
        } catch (error) {
            console.log('Validación falló, hay campos obligatorios vacíos.', error);
        }
    };

    const items = steps.map(item => ({ key: item.title, title: item.title }));

    return {
        status,
        currentStep,
        items,
        next,
        previous,
        showPreviousButton: (currentStep > 0 && (currentStep < steps.length - 1)),
        handleNext,
    }
}
