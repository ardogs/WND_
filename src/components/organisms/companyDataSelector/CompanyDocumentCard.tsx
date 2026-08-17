import { useState } from 'react'
import type { DefaultOptionType } from '../../atoms/select/types'
import { Select } from '../../atoms'
import {
  Building2,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCw,
  RefreshCw,
  ExternalLink,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { companyDataSelectorMode } from '../../../features/companies/types'

interface Props {
  option: DefaultOptionType[]
  defaultValue: string
  img: string
  companyName?: string
  registrationNumber?: string
  mode: companyDataSelectorMode
  onChangeSelect: (data: string) => void
}

export const CompanyDocumentCard = ({
  defaultValue,
  img,
  companyName,
  registrationNumber,
  option,
  onChangeSelect,
  mode,
}: Props) => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)

  const hasValidImg = Boolean(img && img !== 'null' && img.trim() !== '')

  const handleOpenModal = () => {
    if (!hasValidImg) return
    setZoom(1)
    setRotation(0)
    setIsOpenModal(true)
  }

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(3, +(prev + 0.25).toFixed(2)))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(0.5, +(prev - 0.25).toFixed(2)))
  }

  const handleReset = () => {
    setZoom(1)
    setRotation(0)
  }

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360)
  }

  const handleOpenExternal = () => {
    if (hasValidImg) {
      window.open(img, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className="w-full flex flex-col items-center justify-start gap-4">
      {/* Selector de empresa */}
      <div className="w-full">
        <Select
          option={option}
          defaultValue={defaultValue}
          value={defaultValue}
          handleChange={onChangeSelect}
          disabled={mode !== 'default'}
        />
      </div>

      {/* Contenedor principal de la imagen del documento */}
      <div
        className="w-full h-[380px] sm:h-[430px] lg:h-[470px] xl:h-[520px] rounded-2xl border border-border/80 bg-background/50 shadow-inner relative overflow-hidden flex items-center justify-center"
      >
        {hasValidImg ? (
          <div
            onClick={handleOpenModal}
            className="group relative w-full h-full flex items-center justify-center cursor-pointer select-none"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handleOpenModal()
              }
            }}
            title="Haz clic para ver el documento en pantalla completa"
          >
            {/* Imagen optimizada para ocupar el mayor espacio visible sin distorsión */}
            <img
              src={img}
              alt={companyName || 'Documento de la empresa'}
              className="w-full h-full object-contain p-3.5 transition-transform duration-300 group-hover:scale-[1.02]"
              draggable={false}
            />

            {/* Badge permanente sutil en la esquina inferior */}
            <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-background/85 backdrop-blur-md text-[11px] font-medium text-muted-foreground border border-border/60 shadow-sm flex items-center gap-1.5 pointer-events-none group-hover:opacity-0 transition-opacity">
              <ZoomIn className="w-3.5 h-3.5 text-primary" />
              <span>Ampliar</span>
            </div>

            {/* Overlay interactivo en Hover */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-200 flex flex-col items-center justify-center gap-2 pointer-events-none">
              <div className="px-4 py-2 rounded-full bg-background/95 text-foreground text-xs font-semibold shadow-xl flex items-center gap-2 border border-border/80 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-200">
                <Maximize2 className="w-4 h-4 text-primary" />
                <span>Ver documento completo</span>
              </div>
              <p className="text-[11px] text-white/90 drop-shadow">Haz clic para abrir el visor interactivo</p>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground gap-3.5 p-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-muted/60 border border-border/60 flex items-center justify-center text-muted-foreground/80 shadow-sm">
              <Building2 className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-foreground/80">Sin documento digital adjunto</p>
              <p className="text-xs text-muted-foreground max-w-[260px]">
                La información de la empresa se cargará directamente en el formulario
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Modal de previsualización interactivo */}
      <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
        <DialogContent className="max-w-4xl xl:max-w-5xl 2xl:max-w-6xl w-[94vw] max-h-[92vh] flex flex-col p-0 overflow-hidden rounded-2xl border-border bg-card shadow-2xl">
          {/* Cabecera del modal con información y herramientas */}
          <DialogHeader className="p-4 sm:px-6 border-b border-border/70 flex flex-row items-center justify-between gap-4">
            <div className="min-w-0 flex-1">
              <DialogTitle className="text-base sm:text-lg font-bold truncate">
                {companyName ? `Documento - ${companyName}` : 'Documento del Proveedor'}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground truncate mt-0.5">
                {registrationNumber ? `Número de registro: ${registrationNumber}` : 'Vista previa de alta resolución'}
              </DialogDescription>
            </div>

            {/* Barra de herramientas / controles de visualización */}
            <div className="flex items-center gap-1 sm:gap-2 mr-6">
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={zoom <= 0.5}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                title="Reducir zoom (-)"
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-muted text-foreground hover:bg-muted/80 transition-colors"
                title="Restablecer tamaño (100%)"
              >
                {Math.round(zoom * 100)}%
              </button>

              <button
                type="button"
                onClick={handleZoomIn}
                disabled={zoom >= 3}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                title="Aumentar zoom (+)"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <div className="h-4 w-px bg-border mx-1" />

              <button
                type="button"
                onClick={handleRotate}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                title="Girar 90°"
              >
                <RotateCw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                title="Restablecer orientación y zoom"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleOpenExternal}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                title="Abrir en una nueva pestaña"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </DialogHeader>

          {/* Área del visor con fondo oscuro para contraste óptimo */}
          <div className="flex-1 min-h-[50vh] max-h-[72vh] overflow-auto bg-zinc-950/90 flex items-center justify-center p-4 sm:p-6 relative select-none">
            <div className="flex items-center justify-center min-w-full min-h-full transition-transform duration-200">
              <img
                src={img}
                alt={companyName || 'Documento ampliado'}
                style={{
                  transform: `scale(${zoom}) rotate(${rotation}deg)`,
                  transition: 'transform 0.2s ease-out',
                }}
                className="max-h-[68vh] max-w-full object-contain rounded-md shadow-2xl"
                draggable={false}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
