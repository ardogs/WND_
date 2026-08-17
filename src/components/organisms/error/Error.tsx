import { AnimationProvider } from '../../../providers/animation/AnimationProvider'
import { Button, Flex } from '../../atoms'
import { useTitleBar } from '../../../hooks'
import { AnimatedPage } from '../../layout'
import { useRouteError, isRouteErrorResponse } from 'react-router-dom'
import { ArrowLeft, Home as HomeIcon, AlertCircle } from 'lucide-react'
import animation from '../../../assets/animations/404Error.json'
import './styles.scss'

export const Error = () => {
  const { handleHome, handleGoBack } = useTitleBar()
  const error = useRouteError()

  let errorMessage = 'La página o recurso que buscas no existe o ha sido movido.'
  let errorStatus = '404'

  if (isRouteErrorResponse(error)) {
    errorStatus = String(error.status)
    errorMessage = error.statusText || errorMessage
  } else if (typeof error === 'object' && error !== null && 'message' in error) {
    errorMessage = String((error as { message?: string }).message || errorMessage)
    errorStatus = '500'
  }

  return (
    <AnimatedPage>
      <div className="min-h-[520px] w-full flex flex-col items-center justify-center py-10 px-4">
        <div className="max-w-md w-full flex flex-col items-center text-center space-y-5">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
            {errorStatus === '404' ? (
              <span>Error {errorStatus}</span>
            ) : (
              <>
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Error del sistema</span>
              </>
            )}
          </div>

          {/* Lottie Animation */}
          <div className="w-full max-w-[280px] h-[190px] flex items-center justify-center">
            <AnimationProvider animation={animation} height={180} />
          </div>

          {/* Texts */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              {errorStatus === '404'
                ? 'Página no encontrada'
                : 'Ocurrió un problema inesperado'}
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {errorMessage}
            </p>
          </div>

          {/* Actions */}
          <Flex gap={12} justify="center" className="pt-3 w-full sm:w-auto">
            <Button
              type="default"
              icon={<ArrowLeft className="w-4 h-4" />}
              text="Regresar"
              onClick={handleGoBack}
            />
            <Button
              type="primary"
              icon={<HomeIcon className="w-4 h-4" />}
              text="Volver al inicio"
              onClick={handleHome}
            />
          </Flex>
        </div>
      </div>
    </AnimatedPage>
  )
}
