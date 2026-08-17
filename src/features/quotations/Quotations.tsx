import { Outlet } from 'react-router-dom'
import { AnimatedPage } from '../../components/layout'

export const Quotations = () => {
  return (
    <AnimatedPage>
      <div className="w-full h-full flex flex-col">
        <Outlet />
      </div>
    </AnimatedPage>
  )
}
