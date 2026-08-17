import { TitleWithDescription } from '../../components/molecules'
import { Tabs } from '../../components/atoms/tabs/Tabs'
import { TabsProps } from '../../components/atoms/tabs/types'
import { System } from './components/settingsTabs/system'
import { APIConnection } from './components/settingsTabs/apiConnection'
import { AnimatedPage } from '../../components/layout'
import { About } from './components/settingsTabs/about'
import { Sliders, Server, Info } from 'lucide-react'

const items: TabsProps['items'] = [
  {
    label: 'Sistema',
    key: '0',
    icon: <Sliders className="w-4 h-4" />,
    children: <System />,
  },
  {
    label: 'Conexión al API',
    key: '1',
    icon: <Server className="w-4 h-4" />,
    children: <APIConnection />,
  },
  {
    label: 'Acerca de',
    key: '2',
    icon: <Info className="w-4 h-4" />,
    children: <About />,
  },
]

export const Settings = () => {
  return (
    <AnimatedPage>
      <div className="space-y-6">
        <TitleWithDescription
          title="Configuración"
          description="Personaliza las preferencias del sistema, conectividad y apariencia"
        />
        <div className="mt-6">
          <Tabs tabPosition="left" items={items} />
        </div>
      </div>
    </AnimatedPage>
  )
}
