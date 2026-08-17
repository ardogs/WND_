import { IconButton, Flex } from '../../atoms'
import { IconButtonMenu } from '../iconButtonMenu'
import { ListdataSource } from '../../atoms/list/types'
import { Minus, Square, X } from 'lucide-react'

interface Props {
  handleMinimize: () => void
  handleMaximize: () => void
  handleClose: () => void
  content?: ListdataSource[]
  title?: string
}

export const ControlButtons = ({
  handleMinimize,
  handleMaximize,
  handleClose,
}: Props) => {
  return (
    <Flex
      align="center"
      justify="center"
      className="border-l border-border/60 pl-2 ml-2 gap-1"
    >
      <IconButtonMenu />
      <IconButton
        icon={<Minus className="w-3.5 h-3.5" />}
        className="white"
        onClick={handleMinimize}
        title="Minimizar"
      />
      <IconButton
        icon={<Square className="w-3.5 h-3.5" />}
        className="white"
        onClick={handleMaximize}
        title="Maximizar"
      />
      <IconButton
        icon={<X className="w-4 h-4" />}
        className="red"
        onClick={handleClose}
        title="Cerrar"
      />
    </Flex>
  )
}
