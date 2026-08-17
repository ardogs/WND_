import { useMemo, useState, useEffect, useCallback } from 'react'
import {
  Building2,
  FileText,
  Layers,
  Calculator,
  RotateCcw,
  Eraser,
  FileSpreadsheet,
  Info,
} from 'lucide-react'
import { Form, Input, Button } from '../../../../components/atoms'
import {
  QUOTATION_FIELD_SECTIONS,
  ALL_QUOTATION_FIELD_KEYS,
  QuotationFieldKey,
  QuotationFieldSection,
  DEFAULT_EXCEL_CELL_MAPPING,
  getDefaultExcelMappingConfig,
} from '../../constants/quotationFields.config'
import { companyDataSelectorMode } from '../../types'
import { cn } from '@/lib/utils'

interface Props {
  mode: companyDataSelectorMode
}

export const QuotationExcelMappingConfig = ({ mode }: Props) => {
  const isEditable = mode === 'edit'
  const form = Form.useFormInstance()

  const rawWatchedMapping = Form.useWatch({
    name: 'quotation_excel_mapping',
    control: form.control,
  })

  const getMergedMapping = useCallback((incoming?: Record<string, string> | null) => {
    const defaults = getDefaultExcelMappingConfig()
    const val = incoming || (form.getFieldValue('quotation_excel_mapping') as Record<string, string> | undefined)
    return {
      ...defaults,
      ...(val || {}),
    }
  }, [form])

  const [mappingState, setMappingState] = useState<Record<string, string>>(() =>
    getMergedMapping(rawWatchedMapping)
  )

  useEffect(() => {
    if (rawWatchedMapping && typeof rawWatchedMapping === 'object') {
      setMappingState(getMergedMapping(rawWatchedMapping))
    }
  }, [rawWatchedMapping, getMergedMapping])

  const currentMapping = mappingState

  const configuredCount = useMemo(() => {
    return ALL_QUOTATION_FIELD_KEYS.filter((key) => {
      const val = currentMapping[key]
      return val && val.trim() !== ''
    }).length
  }, [currentMapping])

  const totalCount = ALL_QUOTATION_FIELD_KEYS.length

  const updateMapping = (newMapping: Record<string, string>) => {
    setMappingState(newMapping)
    form.setValue('quotation_excel_mapping' as any, newMapping, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
  }

  const handleCellChange = (key: string, value: string) => {
    if (!isEditable) return
    const updated = {
      ...currentMapping,
      [key]: value.trim().toUpperCase(),
    }
    updateMapping(updated)
  }

  const handleResetDefaults = () => {
    if (!isEditable) return
    updateMapping(getDefaultExcelMappingConfig())
  }

  const handleClearAll = () => {
    if (!isEditable) return
    const emptyMapping: Record<string, string> = {}
    ALL_QUOTATION_FIELD_KEYS.forEach((key) => {
      emptyMapping[key] = ''
    })
    updateMapping(emptyMapping)
  }

  const getSectionIcon = (id: string) => {
    switch (id) {
      case 'company':
        return <Building2 className="w-5 h-5 text-primary" />
      case 'general':
        return <FileText className="w-5 h-5 text-primary" />
      case 'items':
        return <Layers className="w-5 h-5 text-primary" />
      case 'totals':
        return <Calculator className="w-5 h-5 text-primary" />
      default:
        return <FileSpreadsheet className="w-5 h-5 text-primary" />
    }
  }

  return (
    <div className="w-full max-w-6xl 2xl:max-w-7xl mx-auto space-y-6">
      {/* Barra superior de estado y acciones rápidas */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">
              Posiciones en la Plantilla de Excel
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Define la celda o columna exacta donde se insertará cada dato al generar el archivo .xlsx
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
          <div className="px-3 py-1.5 rounded-xl bg-muted/60 text-xs font-semibold text-foreground border border-border/80">
            <span className="text-primary font-bold">{configuredCount}</span> / {totalCount} mapeados
          </div>

          {isEditable && (
            <>
              <Button
                type="default"
                size="middle"
                onClick={handleResetDefaults}
                className="text-xs font-medium flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restablecer</span>
              </Button>
              <Button
                type="default"
                size="middle"
                onClick={handleClearAll}
                className="text-xs font-medium flex items-center gap-1.5 text-destructive hover:text-destructive"
              >
                <Eraser className="w-3.5 h-3.5" />
                <span>Limpiar</span>
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Nota informativa de ayuda */}
      <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-3.5 flex items-start gap-2.5 text-xs text-blue-700 dark:text-blue-300">
        <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <div>
          <span className="font-semibold">Guía de coordenadas:</span> Para datos generales y totales, usa coordenadas de celda (ej: <code className="font-mono font-bold bg-blue-500/15 px-1 py-0.5 rounded">G2</code>, <code className="font-mono font-bold bg-blue-500/15 px-1 py-0.5 rounded">B3</code>, <code className="font-mono font-bold bg-blue-500/15 px-1 py-0.5 rounded">H30</code>). Para las columnas de la tabla de ítems, usa la letra de la columna (ej: <code className="font-mono font-bold bg-blue-500/15 px-1 py-0.5 rounded">A</code>, <code className="font-mono font-bold bg-blue-500/15 px-1 py-0.5 rounded">C</code>, <code className="font-mono font-bold bg-blue-500/15 px-1 py-0.5 rounded">H</code>).
        </div>
      </div>

      {/* Secciones de campos agrupadas */}
      <div className="space-y-6">
        {QUOTATION_FIELD_SECTIONS.map((section: QuotationFieldSection) => {
          const sectionConfiguredCount = section.fields.filter(
            (f) => currentMapping[f.key] && currentMapping[f.key].trim() !== ''
          ).length

          return (
            <div
              key={section.id}
              className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm"
            >
              {/* Encabezado de la sección */}
              <div className="px-5 sm:px-6 py-4 bg-muted/30 border-b border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-background border border-border/80 shadow-xs">
                    {getSectionIcon(section.id)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{section.title}</h4>
                    <p className="text-xs text-muted-foreground">{section.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-medium text-muted-foreground bg-background px-2.5 py-1 rounded-md border border-border">
                    {sectionConfiguredCount} de {section.fields.length} celdas
                  </span>
                </div>
              </div>

              {/* Grid de campos con Input de celda */}
              <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {section.fields.map((field) => {
                  const defaultVal = DEFAULT_EXCEL_CELL_MAPPING[field.key as QuotationFieldKey] || ''
                  const cellValue = currentMapping[field.key] ?? defaultVal

                  return (
                    <div
                      key={field.key}
                      className={cn(
                        'flex items-center justify-between gap-3 p-3.5 rounded-xl border transition-all duration-150',
                        'bg-background hover:bg-muted/30 border-border'
                      )}
                    >
                      <div className="min-w-0 flex-1 space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-foreground">
                            {field.label}
                          </span>
                          <span className="text-[10px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded border border-border/60">
                            {field.key}
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground truncate">
                          {field.description}
                        </p>
                      </div>

                      <div className="w-24 sm:w-28 flex-shrink-0">
                        <Input
                          value={cellValue}
                          disabled={!isEditable}
                          placeholder={defaultVal}
                          className="font-mono text-center uppercase font-bold text-xs h-8"
                          onChange={(e) => handleCellChange(field.key, e.target.value)}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
