import { Outlet } from 'react-router-dom';
import { Title } from "../../components/atoms"
import { AnimatedPage } from "../../components/layout"
import "./styles.scss"


export const Quotations = () => {
  return (
    <AnimatedPage>
      <div className='quotationsDiv'>
        <Title level={1} text="Cotizaciones" style={{ marginBottom: "25px" }}/>
        <Outlet />
      </div>
    </AnimatedPage>
  )
}
