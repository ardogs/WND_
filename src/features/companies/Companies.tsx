import { Outlet } from 'react-router-dom'
import { AnimatedPage } from '../../components/layout'

export const Companies = () => {
  return (
    <AnimatedPage>
      <div className="w-full">
        <Outlet />
      </div>
    </AnimatedPage>
  )
}
