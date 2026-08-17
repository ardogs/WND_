import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button, Flex } from '../../atoms'
import { PopConfirm } from '../../organisms'
import { StepsContent, useSteps, useTitleBar } from '../../../hooks'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import './styles.scss'

interface Props {
  stepsArray: StepsContent[]
}

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 35 : -35,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction > 0 ? -35 : 35,
    opacity: 0,
  }),
}

export const Steps = ({ stepsArray }: Props) => {
  const { currentStep, direction, items, previous, showPreviousButton, handleNext, next } =
    useSteps(stepsArray)
  const { handleHome } = useTitleBar()

  return (
    <div className="w-full flex-1 flex flex-col min-h-0">
      {/* Stepper Header */}
      <div className="w-full max-w-2xl py-2 px-2 mb-4 flex-shrink-0 mx-auto">
        <div className="flex items-center justify-between relative">
          {items.map((item, index) => {
            const isCompleted = index < currentStep
            const isCurrent = index === currentStep

            return (
              <React.Fragment key={item.key || index}>
                <div className="flex flex-col items-center z-10">
                  <div
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 border',
                      isCompleted
                        ? 'bg-primary text-primary-foreground border-primary'
                        : isCurrent
                        ? 'bg-primary text-primary-foreground border-primary ring-4 ring-primary/20 shadow-md scale-105'
                        : 'bg-muted text-muted-foreground border-border'
                    )}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
                  </div>
                  <span
                    className={cn(
                      'text-xs mt-2 text-center font-medium max-w-[120px] transition-colors',
                      isCurrent
                        ? 'text-foreground font-semibold'
                        : isCompleted
                        ? 'text-foreground/80'
                        : 'text-muted-foreground'
                    )}
                  >
                    {item.title}
                  </span>
                </div>

                {index < items.length - 1 && (
                  <div
                    className={cn(
                      'flex-1 h-[2px] mx-2 -mt-6 transition-all duration-300',
                      index < currentStep ? 'bg-primary' : 'bg-border'
                    )}
                  />
                )}
              </React.Fragment>
            )
          })}
        </div>
      </div>

      {/* Step Content with Motion */}
      <div className="content-step w-full flex-1 min-h-0 overflow-y-auto px-1 py-2 scroll relative">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 340, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="w-full"
          >
            {stepsArray[currentStep].content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Controls (Fixed at bottom) */}
      <div className="controlbuttons-wrapper w-full flex-shrink-0 pt-4 pb-2 mt-auto border-t border-border/50">
        <Flex className="controlbuttons w-full" justify="center" gap={12}>
          {(currentStep === 0 || currentStep === items.length - 1) && (
            <Button
              type="default"
              text="Volver al inicio"
              onClick={handleHome}
              className="min-w-[140px]"
            />
          )}
          {showPreviousButton && (
            <Button
              type="primary"
              text="Anterior"
              onClick={previous}
              className="min-w-[140px]"
            />
          )}
          {currentStep >= 0 && currentStep < items.length - 2 && (
            <Button
              type="primary"
              htmlType="button"
              text="Siguiente"
              onClick={handleNext}
              className="min-w-[140px]"
            />
          )}
          {currentStep === items.length - 2 && (
            <PopConfirm
              title="Enviar cotización"
              description="¿Desea enviar esta información?"
              buttonText="Enviar"
              next={next}
            />
          )}
        </Flex>
      </div>
    </div>
  )
}


