import { SettingsCard } from '../../settingsCard'
import { APIAccessForm } from './APIAccessForm'
import { APIConnectionStatus } from './APIConnectionStatus'
import { APIInpuForm } from './APIInpuForm'

export const APIConnection = () => {
  return (
    <div>
      <SettingsCard title='URL del API' description='Configura el url para realizar la conexión con el API'>
        <APIInpuForm />
      </SettingsCard>

      <SettingsCard title='Autenticación del API' description='Contraseña de autenticación al API'>
        <APIAccessForm />
      </SettingsCard>

      <SettingsCard title='Probar conexión' description='Monitorea el estado de la conexión al API'>
        <APIConnectionStatus />
      </SettingsCard>

    </div>
  )
}


// </Space.Compact>
