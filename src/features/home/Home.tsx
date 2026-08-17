import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Table, Title, Divider } from '../../components/atoms'
import { TitleWithDescription } from '../../components/molecules'
import { LinkCard } from './components/linkCard/LinkCard'
import { AnimatedPage } from '../../components/layout'
import {
  getQuotationTableColumns,
  MOCK_QUOTATIONS,
  QuotationTableItem,
} from '@/features/quotations/data/mockQuotations'
import { useQuotationStore } from '@/store/quotation/useQuotationStore'
import { useAuthStore } from '@/store/settings/useAuthStore'
import { downloadQuotationExcelBlob } from '@/api/quotations'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const Home = () => {
  const { t } = useTranslation('home')
  const navigate = useNavigate()
  const token = useAuthStore((state) => state.token)
  const { quotationsList, isLoadingList, fetchQuotationsList, deleteQuotation } =
    useQuotationStore()

  useEffect(() => {
    fetchQuotationsList()
  }, [fetchQuotationsList])

  const handleDownload = async (item: QuotationTableItem) => {
    if (!item.id) {
      toast.error('ID de cotización no válido')
      return
    }

    try {
      toast.loading('Generando descarga del archivo Excel...', { id: 'download-home' })
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
        toast.success('Archivo Excel descargado correctamente.', { id: 'download-home' })
      } else {
        toast.error('Error al descargar el archivo.', { id: 'download-home' })
      }
    } catch {
      toast.error('Error de conexión al descargar.', { id: 'download-home' })
    }
  }

  const handleView = () => {
    navigate('/quotations')
  }

  const handleDelete = async (item: QuotationTableItem) => {
    if (!item.id) return
    const confirmed = window.confirm(
      `¿Estás seguro de eliminar la cotización para "${item.customer}"?`
    )
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
    if (quotationsList && quotationsList.length > 0) {
      return quotationsList.slice(0, 5).map((q) => ({
        key: q._id,
        id: q._id,
        company: q.comercial_name || 'Sin empresa',
        registration_number: q.registration_number,
        customer: q.customer || 'Sin cliente',
        concept: q.work_concept,
        date: q.date ? String(q.date) : (q.createdAt || ''),
        price: q.total_price_number || 0,
      }))
    }
    return MOCK_QUOTATIONS
  }, [quotationsList])

  return (
    <AnimatedPage>
      <div className="space-y-6">
        <Title level={1} text={t('title')} />

        <div>
          <TitleWithDescription
            title="¡Bienvenido!"
            description="Por favor, selecciona una opción para iniciar"
            level={3}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 my-6">
            <LinkCard linkTo="quotations" title="Cotizaciones" />
            <LinkCard linkTo="invoices" title="Facturación" />
            <LinkCard linkTo="companies" title="Mis empresas" />
          </div>

          <Divider />

          <div className="pt-2">
            <TitleWithDescription
              title="Últimos documentos creados"
              description="Selecciona un documento para descargarlo en Excel, ver o gestionar"
              level={3}
            />
            <div className="mt-4 bg-card border border-border rounded-2xl p-4 shadow-sm">
              <Table
                columns={columns}
                dataSource={dataSource}
                loading={isLoadingList}
                pagination={{ position: ['bottomCenter'] }}
              />
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  )
}
