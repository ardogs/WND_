import { SettingsCard } from '../../settingsCard'
import { APIAccessForm } from './APIAccessForm'
import { APIConnectionStatus } from './APIConnectionStatus'
import { APIInputForm } from './APIInputForm'

export const APIConnection = () => {
  return (
    <div className="space-y-4">
      <SettingsCard title="URL del API" description="Configura el URL para realizar la conexión con el API">
        <APIInputForm />
      </SettingsCard>

      <SettingsCard title="Autenticación del API" description="Contraseña de autenticación al API">
        <APIAccessForm />
      </SettingsCard>

      <SettingsCard title="Probar conexión" description="Monitorea el estado de la conexión al API">
        <APIConnectionStatus />
      </SettingsCard>
    </div>
  )
}
