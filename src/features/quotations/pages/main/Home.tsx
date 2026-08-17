import { useEffect, useMemo, useState } from 'react'
import { Flex, Table, Button, Descriptions } from '../../../../components/atoms'
import { AnimatedPage } from '../../../../components/layout'
import { TitleWithDescription } from '@/components/molecules'
import { Link } from 'react-router-dom'
import {
  getQuotationTableColumns,
  QuotationTableItem,
} from '@/features/quotations/data/mockQuotations'
import { useQuotationStore, SavedQuotation } from '@/store/quotation/useQuotationStore'
import { useAuthStore } from '@/store/settings/useAuthStore'
import { downloadQuotationExcelBlob } from '@/api/quotations'
import { formatKRW, formatDateToISO, formatNumber } from '@/helpers/functions'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Plus, RefreshCw, FileSpreadsheet } from 'lucide-react'

export const Home = () => {
  const token = useAuthStore((state) => state.token)
  const {
    quotationsList,
    isLoadingList,
    errorList,
    fetchQuotationsList,
    deleteQuotation,
  } = useQuotationStore()

  const [selectedQuotation, setSelectedQuotation] = useState<SavedQuotation | null>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)

  useEffect(() => {
    fetchQuotationsList()
  }, [fetchQuotationsList])

  const handleDownload = async (item: QuotationTableItem) => {
    if (!item.id) {
      toast.error('ID de cotización no válido')
      return
    }

    try {
      toast.loading('Generando descarga del archivo Excel...', { id: 'download-toast' })
      const blob = await downloadQuotationExcelBlob(token, item.id)
      if (blob instanceof Blob) {
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `Cotizacion_${item.customer || item.id}.xlsx`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
        toast.success('Archivo Excel descargado correctamente.', { id: 'download-toast' })
      } else {
        toast.error('Error al descargar el archivo.', { id: 'download-toast' })
      }
    } catch {
      toast.error('Error de conexión al descargar.', { id: 'download-toast' })
    }
  }

  const handleView = (item: QuotationTableItem) => {
    const found = quotationsList.find((q) => q._id === item.id)
    if (found) {
      setSelectedQuotation(found)
      setIsViewOpen(true)
    }
  }

  const handleDelete = async (item: QuotationTableItem) => {
    if (!item.id) return
    const confirmed = window.confirm(`¿Estás seguro de eliminar la cotización para "${item.customer}"?`)
    if (!confirmed) return

    try {
      const ok = await deleteQuotation(item.id)
      if (ok) {
        toast.success('Cotización eliminada correctamente.')
      } else {
        toast.error('No se pudo eliminar la cotización.')
      }
    } catch {
      toast.error('Error al eliminar la cotización.')
    }
  }

  const columns = useMemo(
    () => getQuotationTableColumns(handleDownload, handleView, handleDelete),
    [handleDownload, handleView, handleDelete]
  )

  const dataSource: QuotationTableItem[] = useMemo(() => {
    return quotationsList.map((q) => ({
      key: q._id,
      id: q._id,
      company: q.comercial_name || 'Sin empresa',
      registration_number: q.registration_number,
      customer: q.customer || 'Sin cliente',
      concept: q.work_concept,
      date: q.date ? String(q.date) : (q.createdAt || ''),
      price: q.total_price_number || 0,
    }))
  }, [quotationsList])

  return (
    <AnimatedPage>
      <div className="space-y-6">
        <Flex align="center" justify="space-between" className="flex-wrap gap-4">
          <TitleWithDescription
            title="Cotizaciones"
            description="Gestiona, descarga en Excel y consulta el historial de cotizaciones emitidas"
          />
          <Flex gap={8} align="center">
            <Button
              size="middle"
              type="default"
              icon={<RefreshCw className={`w-4 h-4 mr-2 ${isLoadingList ? 'animate-spin' : ''}`} />}
              text="Actualizar"
              onClick={() => fetchQuotationsList()}
            />
            <Link to="new">
              <Button
                size="middle"
                type="primary"
                icon={<Plus className="w-4 h-4 mr-1" />}
                text="Nueva Cotización"
              />
            </Link>
          </Flex>
        </Flex>

        {errorList && (
          <div className="p-4 rounded-xl border border-destructive/30 bg-destructive/10 text-destructive flex items-center justify-between gap-3">
            <span className="text-xs font-medium">{errorList}</span>
            <Button
              size="small"
              type="destructive"
              text="Reintentar"
              onClick={() => fetchQuotationsList()}
            />
          </div>
        )}

        <div className="mt-4 bg-card border border-border rounded-2xl p-4 shadow-sm">
          <Table
            columns={columns}
            dataSource={dataSource}
            loading={isLoadingList}
            pagination={{ position: ['bottomCenter'] }}
          />
        </div>

        {/* Modal de Detalle de Cotización */}
        <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
          <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-primary" />
                Detalle de la Cotización
              </DialogTitle>
            </DialogHeader>

            {selectedQuotation && (
              <div className="space-y-4 py-2 text-sm">
                <Descriptions title="Información General" bordered layout="vertical">
                  <Descriptions.Item label="Cliente">{selectedQuotation.customer || '-'}</Descriptions.Item>
                  <Descriptions.Item label="Fecha">
                    {selectedQuotation.date ? formatDateToISO(selectedQuotation.date) : '-'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Concepto">{selectedQuotation.work_concept || '-'}</Descriptions.Item>
                  <Descriptions.Item label="Duración">{selectedQuotation.duration_of_work || '-'}</Descriptions.Item>
                </Descriptions>

                <Descriptions title="Proveedor" bordered layout="vertical">
                  <Descriptions.Item label="Registro">{selectedQuotation.registration_number}</Descriptions.Item>
                  <Descriptions.Item label="Empresa">{selectedQuotation.comercial_name}</Descriptions.Item>
                  <Descriptions.Item label="Representante">{selectedQuotation.legal_representative || '-'}</Descriptions.Item>
                  <Descriptions.Item label="Tel / Fax">{selectedQuotation.tel_fax || '-'}</Descriptions.Item>
                </Descriptions>

                <div className="space-y-2">
                  <h4 className="font-semibold text-xs text-muted-foreground uppercase">
                    Insumos ({selectedQuotation.quotation_item?.length || 0})
                  </h4>
                  <div className="border border-border rounded-lg overflow-hidden text-xs">
                    <table className="w-full text-left">
                      <thead className="bg-muted/50 text-muted-foreground">
                        <tr>
                          <th className="p-2">Descripción</th>
                          <th className="p-2 text-right">Cant.</th>
                          <th className="p-2 text-right">P. Unitario</th>
                          <th className="p-2 text-right">P. Suministro</th>
                          <th className="p-2 text-right">IVA</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {selectedQuotation.quotation_item?.map((item, idx) => (
                          <tr key={idx}>
                            <td className="p-2">{item.description}</td>
                            <td className="p-2 text-right">{formatNumber(item.amount)}</td>
                            <td className="p-2 text-right">{formatKRW(item.unit_price)}</td>
                            <td className="p-2 text-right">{formatKRW(item.supply_price)}</td>
                            <td className="p-2 text-right">{formatKRW(item.vat)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-muted/40 border border-border flex justify-between items-center">
                  <span className="font-medium text-muted-foreground">Total:</span>
                  <span className="font-bold text-lg text-primary">
                    {formatKRW(selectedQuotation.total_price_number || 0)}
                  </span>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AnimatedPage>
  )
}

