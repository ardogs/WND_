import { IconButton } from '../../atoms/'
import { ArrowLeft, Home } from 'lucide-react'

interface Props {
  handleHome: () => void
  handleGoBack: () => void
}

export const NavigationButtons = ({ handleHome, handleGoBack }: Props) => {
  return (
    <div className="flex items-center gap-1">
      <IconButton
        icon={<ArrowLeft className="w-4 h-4" />}
        onClick={handleGoBack}
        title="Regresar"
        aria-label="Volver atrás"
      />
      <IconButton
        icon={<Home className="w-4 h-4" />}
        onClick={handleHome}
        title="Inicio"
        aria-label="Ir al inicio"
      />
    </div>
  )
}
