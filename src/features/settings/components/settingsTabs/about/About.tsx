import Logo from '../../../../../assets/img/logo_2.webp'
import { Image } from '../../../../../components/atoms'
import { useSettings } from '../../../../../hooks'
import { Server, Layers, AppWindow, Cpu, Monitor, Globe } from 'lucide-react'

export const About = () => {
  const {
    apiVersion,
    uiVersion,
    electronVersion,
    chromeVersion,
    osType,
    osVersion,
    osArch,
  } = useSettings()

  const specs = [
    {
      label: 'Versión de la UI',
      value: uiVersion !== '-' ? `v${uiVersion}` : '-',
      icon: <Layers className="w-3.5 h-3.5" />,
      isMono: true,
    },
    {
      label: 'Versión del backend',
      value: apiVersion !== '-' ? `v${apiVersion}` : '-',
      icon: <Server className="w-3.5 h-3.5" />,
      isMono: true,
    },
    {
      label: 'Motor Electron',
      value: electronVersion !== '-' ? `v${electronVersion}` : '-',
      icon: <AppWindow className="w-3.5 h-3.5" />,
      isMono: true,
    },
    {
      label: 'Motor Chromium',
      value: chromeVersion !== '-' ? `v${chromeVersion}` : '-',
      icon: <Globe className="w-3.5 h-3.5" />,
      isMono: true,
    },
    {
      label: 'Sistema operativo',
      value: osType !== '-' ? osType : '-',
      icon: <Monitor className="w-3.5 h-3.5" />,
      isMono: false,
    },
    {
      label: 'Arquitectura y build',
      value:
        osArch !== '-' && osVersion !== '-'
          ? `${osArch} (${osVersion})`
          : osArch !== '-'
          ? osArch
          : '-',
      icon: <Cpu className="w-3.5 h-3.5" />,
      isMono: false,
    },
  ]

  return (
    <div className="w-full">
      <div className="w-full max-w-[680px] bg-card text-card-foreground border border-border rounded-xl p-6 mb-4 shadow-sm">
        {/* Header con Logo y Título */}
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-[58px] h-[58px] rounded-xl bg-background border border-border p-2 shrink-0">
            <Image src={Logo} alt="WND Logo" width={42} className="object-contain" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h3 className="text-base font-semibold text-foreground tracking-tight">
                Plataforma de control W&D's
              </h3>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                v{uiVersion !== '-' ? uiVersion : '1.0.0'}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
              Sistema de gestión integral para administración, cotización y control de ventanas y puertas.
            </p>
          </div>
        </div>

        {/* Separador */}
        <div className="my-5 border-t border-border/60" />

        {/* Sección de especificaciones técnicas */}
        <div>
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Información del sistema
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {specs.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2.5 sm:px-3.5 rounded-lg bg-secondary/40 border border-border/60 hover:bg-secondary/70 transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="flex items-center justify-center w-[26px] h-[26px] rounded-md bg-background border border-border/80 text-primary shrink-0">
                    {item.icon}
                  </div>
                  <span className="text-xs font-medium text-muted-foreground truncate">
                    {item.label}
                  </span>
                </div>
                <span
                  className={`text-xs font-semibold text-foreground shrink-0 pl-2 ${
                    item.isMono ? 'font-mono' : ''
                  }`}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer con Copyright */}
        <div className="mt-6 pt-4 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>Copyright © 2025 Windows & Doors</span>
          <span>Todos los derechos reservados</span>
        </div>
      </div>
    </div>
  )
}
