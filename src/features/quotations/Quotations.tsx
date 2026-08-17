import { Outlet } from 'react-router-dom'
import { AnimatedPage } from '../../components/layout'
import './styles.scss'

export const Quotations = () => {
  return (
    <AnimatedPage>
      <div className="quotationsDiv w-full">
        <Outlet />
      </div>
    </AnimatedPage>
  )
}
