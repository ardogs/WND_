import { Outlet } from 'react-router-dom';
import { Title } from '../../components/atoms';
import { AnimatedPage } from '../../components/layout';

export const Companies = () => {
  return (
    <AnimatedPage>
      <div className='quotationsDiv'>
        <Title level={1} text="Mis empresas" style={{ marginBottom: "25px" }} />
        <Outlet />
      </div>
    </AnimatedPage>
  )
}
