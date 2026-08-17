import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '../../atoms'
import { usePopConfirmation } from '../../../hooks/popConfirmation/usePopConfirmation'
import { cn } from '@/lib/utils'

export interface PopConfirmProps {
  title: string
  description: string
  buttonText: string
  next?: () => void
  okText?: string
  cancelText?: string
  className?: string
}

export const PopConfirm = ({
  title,
  description,
  buttonText,
  next,
  okText = 'Confirmar',
  cancelText = 'Cancelar',
  className,
}: PopConfirmProps) => {
  const { handleOk, handleCancel, open, showPopconfirm } = usePopConfirmation(
    next ?? (() => {})
  )

  return (
    <>
      <Button
        type="primary"
        onClick={showPopconfirm}
        text={buttonText}
        className={cn('min-w-[140px]', className)}
      />
      <AlertDialog open={open} onOpenChange={(isOpen) => !isOpen && handleCancel()}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>
              {cancelText}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleOk}>
              {okText}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
