import { useState } from 'react'
import { Flex, Title, Text, Button } from '../../../../components/atoms'
import { AnimationProvider } from '../../../../providers/animation/AnimationProvider'
import animation from '../../../../assets/animations/file_transfer.json'
import { useQuotationStore } from '../../../../store/quotation/useQuotationStore'
import { useAuthStore } from '../../../../store/settings/useAuthStore'
import { downloadQuotationExcelBlob } from '../../../../api/quotations'
import { formatKRW } from '../../../../helpers/functions'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import {
  FileSpreadsheet,
  Download,
  FolderOpen,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RefreshCw,
} from 'lucide-react'

export const QuoteGetFile = () => {
  const navigate = useNavigate()
  const token = useAuthStore((state) => state.token)
  const {
    isLoading,
    error,
    lastGeneratedQuotation,
    lastGeneratedFilePath,
    lastGeneratedFileName,
    resetQuotationCreation,
  } = useQuotationStore()

  const [isOpening, setIsOpening] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  // Manejador para abrir el archivo directamente en Electron
  const handleOpenFile = async () => {
    if (!lastGeneratedFilePath) {
      toast.error('No se encontró la ruta del archivo generado.')
      return
    }

    if (window.electronAPI?.openFile) {
      setIsOpening(true)
      try {
        const result = await window.electronAPI.openFile(lastGeneratedFilePath)
        if (result?.success) {
          toast.success('Archivo Excel abierto en su aplicación predeterminada.')
        } else {
          toast.error(result?.error || 'No se pudo abrir el archivo en el sistema operativo.')
        }
      } catch (err) {
        toast.error('Error al intentar abrir el archivo Excel.')
      } finally {
        setIsOpening(false)
      }
    } else {
      // Fallback a descarga en navegador
      handleDownloadFile()
    }
  }

  // Manejador para mostrar el archivo en el explorador de archivos
  const handleShowInFolder = async () => {
    if (!lastGeneratedFilePath) return
    if (window.electronAPI?.showInFolder) {
      try {
        await window.electronAPI.showInFolder(lastGeneratedFilePath)
        toast.success('Ubicación del archivo mostrada en el explorador.')
      } catch {
        toast.error('No se pudo abrir la carpeta contenedora.')
      }
    }
  }

  // Manejador para descargar el archivo Excel como Blob
  const handleDownloadFile = async () => {
    if (!lastGeneratedQuotation?._id) {
      toast.error('ID de cotización no disponible para descargar.')
      return
    }

    setIsDownloading(true)
    try {
      const blob = await downloadQuotationExcelBlob(token, lastGeneratedQuotation._id)
      if (blob instanceof Blob) {
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download =
          lastGeneratedFileName ||
          `Cotizacion_${lastGeneratedQuotation.customer || lastGeneratedQuotation._id}.xlsx`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
        toast.success('Archivo Excel descargado con éxito.')
      } else {
        toast.error('Error al descargar el archivo de cotización.')
      }
    } catch {
      toast.error('Error durante la descarga del archivo.')
    } finally {
      setIsDownloading(false)
    }
  }

  const handleCreateNew = () => {
    resetQuotationCreation()
    window.location.reload()
  }

  // 1. Estado de Carga
  if (isLoading) {
    return (
      <Flex vertical align="center" justify="center" className="w-full py-8 space-y-4">
        <Title level={2} text="Generando archivo Excel..." />
        <Text description="Completando plantilla según proveedor y registrando datos en MongoDB. Por favor espere un momento." />
        <AnimationProvider animation={animation} height={260} />
        <Button
          type="primary"
          loading={true}
          disabled={true}
          text="Procesando documento..."
          className="min-w-[200px]"
        />
      </Flex>
    )
  }

  // 2. Estado de Error
  if (error && !lastGeneratedQuotation) {
    return (
      <div className="w-full max-w-xl mx-auto py-8 space-y-6 text-center">
        <div className="p-6 rounded-2xl border border-destructive/30 bg-destructive/10 flex flex-col items-center gap-3">
          <AlertCircle className="w-12 h-12 text-destructive animate-bounce" />
          <Title level={3} text="Error al procesar la cotización" className="text-destructive" />
          <p className="text-sm text-foreground/80">{error}</p>
        </div>
        <Flex justify="center" gap={12}>
          <Button
            type="primary"
            icon={<RefreshCw className="w-4 h-4 mr-2" />}
            text="Intentar de nuevo"
            onClick={handleCreateNew}
          />
        </Flex>
      </div>
    )
  }

  // 3. Estado sin cotización generada
  if (!lastGeneratedQuotation) {
    return (
      <div className="w-full max-w-xl mx-auto py-8 space-y-6 text-center">
        <div className="p-6 rounded-2xl border border-border bg-card flex flex-col items-center gap-3 shadow-sm">
          <FileSpreadsheet className="w-12 h-12 text-muted-foreground opacity-50" />
          <Title level={3} text="Ninguna cotización generada" />
          <p className="text-sm text-muted-foreground">
            Por favor completa los campos del formulario y confirma el envío en el paso de Resumen para emitir la cotización.
          </p>
        </div>
        <Flex justify="center" gap={12}>
          <Button
            type="default"
            text="Ver historial de cotizaciones"
            onClick={() => navigate('/quotations')}
          />
          <Button
            type="primary"
            icon={<RefreshCw className="w-4 h-4 mr-2" />}
            text="Crear nueva cotización"
            onClick={handleCreateNew}
          />
        </Flex>
      </div>
    )
  }

  // 4. Estado de Éxito
  return (
    <div className="w-full max-w-2xl mx-auto py-4 space-y-6">
      {/* Banner de éxito */}
      <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 dark:bg-emerald-950/30 flex items-center gap-4 shadow-sm">
        <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
          <CheckCircle2 className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-bold text-foreground">
            ¡Cotización generada y guardada con éxito!
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            El archivo Excel se ha completado según la plantilla y el registro se ha guardado en MongoDB.
          </p>
        </div>
      </div>

      {/* Resumen del documento generado */}
      {lastGeneratedQuotation && (
        <div className="p-5 rounded-2xl border border-border bg-card shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-border/50 pb-3">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-primary" />
              <span className="font-semibold text-sm text-foreground">
                {lastGeneratedFileName || `${lastGeneratedQuotation._id}.xlsx`}
              </span>
            </div>
            <span className="text-xs font-mono bg-muted text-muted-foreground px-2.5 py-1 rounded-md">
              ID: {lastGeneratedQuotation._id}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-muted-foreground block">Cliente:</span>
              <span className="font-medium text-foreground text-sm">
                {lastGeneratedQuotation.customer || '-'}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground block">Concepto de trabajo:</span>
              <span className="font-medium text-foreground text-sm">
                {lastGeneratedQuotation.work_concept || '-'}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground block">Proveedor / Registro:</span>
              <span className="font-medium text-foreground">
                {lastGeneratedQuotation.comercial_name} ({lastGeneratedQuotation.registration_number})
              </span>
            </div>
            <div>
              <span className="text-muted-foreground block">Monto Total:</span>
              <span className="font-bold text-primary text-base">
                {formatKRW(lastGeneratedQuotation.total_price_number || 0)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Botones de acción principales */}
      <div className="p-5 rounded-2xl border border-border bg-card shadow-sm space-y-4">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Acciones con el archivo
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {window.electronAPI?.openFile && (
            <Button
              type="primary"
              loading={isOpening}
              onClick={handleOpenFile}
              className="w-full flex items-center justify-center gap-2 h-11"
              icon={<FileSpreadsheet className="w-4 h-4" />}
              text="Abrir archivo en Excel"
            />
          )}

          <Button
            type="default"
            loading={isDownloading}
            onClick={handleDownloadFile}
            className="w-full flex items-center justify-center gap-2 h-11"
            icon={<Download className="w-4 h-4" />}
            text="Descargar copia Excel"
          />

          {window.electronAPI?.showInFolder && (
            <Button
              type="default"
              onClick={handleShowInFolder}
              className="w-full flex items-center justify-center gap-2 h-11"
              icon={<FolderOpen className="w-4 h-4" />}
              text="Ver en carpeta"
            />
          )}

          <Button
            type="default"
            onClick={() => navigate('/quotations')}
            className="w-full flex items-center justify-center gap-2 h-11"
            icon={<ArrowRight className="w-4 h-4" />}
            text="Ver historial de cotizaciones"
          />
        </div>
      </div>
    </div>
  )
}

