import { Title } from '../../components/atoms/title/Title';
import { Tabs } from '../../components/atoms/tabs/Tabs';
import { TabsProps } from "../../components/atoms/tabs/types";
import { System } from './components/settingsTabs/system';
import { APIConnection } from './components/settingsTabs/apiConnection';
import { AnimatedPage } from '../../components/layout';
import { About } from './components/settingsTabs/about';


const items: TabsProps['items'] = [
  {
    label: "Sistema",
    key: '0',
    children: <System/>

  },
  {
    label: "Conexión al API",
    key: '1',
    children: <APIConnection/>

  },
  {
    label: "Acerca de",
    key: '2',
    children: <About/>
  },
]

export const Settings = () => {
  return (
    <AnimatedPage>
      <Title level={1} text='Configuración' />
      <div style={{ marginTop: '5%' }}>
        <Tabs tabPosition='left' items={items} />
      </div>
    </AnimatedPage>
  )
}
