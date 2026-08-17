import { useTitleBar } from '../../../hooks'
import { Image, Menu } from '../../atoms'
import { ControlButtons, NavigationButtons } from '../../molecules'

export const TitleBar = () => {
  const {
    logo,
    menuItems,
    handleHome,
    handleGoBack,
    handleMinimize,
    handleMaximize,
    handleClose,
  } = useTitleBar()

  return (
    <div className="w-full h-full flex items-center justify-between drag-region select-none px-2">
      <div className="flex items-center gap-3 no-drag-region">
        <Image
          src={logo}
          alt="WND"
          width={24}
          height={24}
          className="cursor-pointer hover:opacity-85 transition-opacity"
          onClick={handleHome}
        />
        <NavigationButtons handleHome={handleHome} handleGoBack={handleGoBack} />
        <div className="ml-1.5">
          <Menu items={menuItems} />
        </div>
      </div>

      <div className="flex items-center no-drag-region">
        <ControlButtons
          handleMinimize={handleMinimize}
          handleMaximize={handleMaximize}
          handleClose={handleClose}
        />
      </div>
    </div>
  )
}
