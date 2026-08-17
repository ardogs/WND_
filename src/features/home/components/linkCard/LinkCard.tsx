import { Link } from 'react-router-dom'
import { FileText, Receipt, Building2, Settings, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type LinkType = 'quotations' | 'invoices' | 'companies' | 'settings'

interface Props {
  linkTo: LinkType
  title: string
  description?: string
}

const iconsMap: Record<LinkType, React.ReactNode> = {
  quotations: <FileText className="h-6 w-6 text-primary" />,
  invoices: <Receipt className="h-6 w-6 text-primary" />,
  companies: <Building2 className="h-6 w-6 text-primary" />,
  settings: <Settings className="h-6 w-6 text-primary" />,
}

const descriptionsMap: Record<LinkType, string> = {
  quotations: 'Crear, editar y exportar cotizaciones',
  invoices: 'Gestión y control de facturas',
  companies: 'Administrar proveedores y datos fiscales',
  settings: 'Ajustes del sistema y conexión',
}

export const LinkCard = ({ linkTo, title, description }: Props) => {
  const icon = iconsMap[linkTo] || <FileText className="h-6 w-6 text-primary" />
  const desc = description || descriptionsMap[linkTo] || ''

  return (
    <Link to={linkTo} className="flex-1 min-w-[240px] max-w-sm group focus:outline-none">
      <div
        className={cn(
          'p-5 rounded-2xl border border-border/80 bg-card shadow-sm',
          'transition-all duration-200 ease-out',
          'hover:shadow-md hover:border-primary/60 hover:-translate-y-1',
          'flex flex-col justify-between h-36 relative overflow-hidden'
        )}
      >
        <div className="flex items-start justify-between">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center transition-colors group-hover:bg-primary/20">
            {icon}
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-primary" />
        </div>

        <div>
          <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
            {desc}
          </p>
        </div>
      </div>
    </Link>
  )
}
