// src/store/useStepperStore.ts
import { create } from 'zustand';

interface StepperState {
    currentStep: number;
    totalSteps: number; 
}

interface StepperStateActions {
    nextStep: () => void;
    prevStep: () => void;
    setStep: (step: number) => void;
    setTotalSteps: (total: number) => void;
}

export const useStepperStore = create<StepperState & StepperStateActions>((set) => ({
    currentStep: 0,
    totalSteps: 0, // Inicia en 0

    nextStep: () => {
        set((state) => {
            // 3. Usa el 'totalSteps' del estado
            // El índice máximo es totalSteps - 1
            const maxStepIndex = state.totalSteps - 1;
            return {
                currentStep: state.currentStep >= maxStepIndex
                    ? maxStepIndex
                    : state.currentStep + 1,
            };
        });
    },

    prevStep: () => {
        set((state) => ({
            currentStep: state.currentStep <= 0 ? 0 : state.currentStep - 1,
        }));
    },

    setStep: (step) => {
        set({ currentStep: step });
    },

    // 4. Esta es la acción clave
    setTotalSteps: (total) => {
        set({ totalSteps: total });
    }
}));