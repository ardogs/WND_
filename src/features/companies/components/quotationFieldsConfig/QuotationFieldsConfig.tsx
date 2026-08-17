import { useMemo, useState, useEffect, useCallback } from 'react'
import {
  Building2,
  FileText,
  Layers,
  Calculator,
  CheckCheck,
  Square,
  RotateCcw,
  Sliders,
  Info,
} from 'lucide-react'
import { Form, Checkbox } from '../../../../components/atoms'
import {
  QUOTATION_FIELD_SECTIONS,
  ALL_QUOTATION_FIELD_KEYS,
  QuotationFieldSection,
  getDefaultQuotationFieldsConfig,
} from '../../constants/quotationFields.config'
import { companyDataSelectorMode } from '../../types'
import { cn } from '@/lib/utils'

interface Props {
  mode: companyDataSelectorMode
}

export const QuotationFieldsConfig = ({ mode }: Props) => {
  const isEditable = mode === 'edit'
  const form = Form.useFormInstance()

  const rawWatchedConfig = Form.useWatch({
    name: 'quotation_fields_config',
    control: form.control,
  })

  const getMergedConfig = useCallback((incoming?: Record<string, boolean> | null) => {
    const defaults = getDefaultQuotationFieldsConfig()
    const val = incoming || (form.getFieldValue('quotation_fields_config') as Record<string, boolean> | undefined)
    return {
      ...defaults,
      ...(val || {}),
    }
  }, [form])

  const [configState, setConfigState] = useState<Record<string, boolean>>(() =>
    getMergedConfig(rawWatchedConfig)
  )

  useEffect(() => {
    if (rawWatchedConfig && typeof rawWatchedConfig === 'object') {
      setConfigState(getMergedConfig(rawWatchedConfig))
    }
  }, [rawWatchedConfig, getMergedConfig])

  const currentConfig = configState

  const activeCount = useMemo(() => {
    return ALL_QUOTATION_FIELD_KEYS.filter((key) => {
      const val = currentConfig[key]
      return val !== false
    }).length
  }, [currentConfig])

  const totalCount = ALL_QUOTATION_FIELD_KEYS.length

  const updateConfig = (newConfig: Record<string, boolean>) => {
    setConfigState(newConfig)
    form.setValue('quotation_fields_config' as any, newConfig, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
  }

  const handleFieldToggle = (key: string, nextChecked: boolean) => {
    if (!isEditable) return
    const updated = {
      ...currentConfig,
      [key]: nextChecked,
    }
    updateConfig(updated)
  }

  const handleSelectAll = () => {
    if (!isEditable) return
    const allTrue: Record<string, boolean> = {}
    ALL_QUOTATION_FIELD_KEYS.forEach((key) => {
      allTrue[key] = true
    })
    updateConfig(allTrue)
  }

  const handleDeselectAll = () => {
    if (!isEditable) return
    const allFalse: Record<string, boolean> = {}
    ALL_QUOTATION_FIELD_KEYS.forEach((key) => {
      allFalse[key] = false
    })
    updateConfig(allFalse)
  }

  const handleResetDefaults = () => {
    if (!isEditable) return
    updateConfig(getDefaultQuotationFieldsConfig())
  }

  const handleToggleSection = (section: QuotationFieldSection, enable: boolean) => {
    if (!isEditable) return
    const updated = { ...currentConfig }
    section.fields.forEach((field) => {
      updated[field.key] = enable
    })
    updateConfig(updated)
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
        return <Sliders className="w-5 h-5 text-primary" />
    }
  }

  return (
    <div className="w-full space-y-6">
      {/* Header Info & Actions Banner */}
      <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-xs p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0 mt-0.5">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h3 className="text-base font-semibold text-foreground">
                Configuración de Visibilidad de Campos
              </h3>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/15 text-primary border border-primary/20">
                {activeCount} de {totalCount} campos visibles
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Selecciona qué campos se incluirán y renderizarán en los formularios y documentos de cotización generados para esta empresa.
            </p>
          </div>
        </div>

        {isEditable && (
          <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end pt-2 md:pt-0 border-t md:border-t-0 border-border/60">
            <button
              type="button"
              onClick={handleSelectAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-secondary/80 hover:bg-secondary text-secondary-foreground transition-colors cursor-pointer border border-border/50"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              Marcar todos
            </button>
            <button
              type="button"
              onClick={handleDeselectAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-secondary/80 hover:bg-secondary text-secondary-foreground transition-colors cursor-pointer border border-border/50"
            >
              <Square className="w-3.5 h-3.5" />
              Desmarcar todos
            </button>
            <button
              type="button"
              onClick={handleResetDefaults}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-secondary/80 hover:bg-secondary text-secondary-foreground transition-colors cursor-pointer border border-border/50"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Predeterminados
            </button>
          </div>
        )}
      </div>

      {/* Sections List */}
      <div className="space-y-6">
        {QUOTATION_FIELD_SECTIONS.map((section) => {
          const sectionActiveCount = section.fields.filter(
            (f) => currentConfig[f.key] !== false
          ).length
          const isAllSectionActive = sectionActiveCount === section.fields.length

          return (
            <div
              key={section.id}
              className="rounded-2xl border border-border bg-card shadow-xs overflow-hidden"
            >
              {/* Section Header */}
              <div className="px-5 py-4 bg-muted/30 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-card border border-border/60 shadow-xs">
                    {getSectionIcon(section.id)}
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-foreground">
                      {section.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">{section.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-center">
                  <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-muted text-muted-foreground border border-border/50">
                    {sectionActiveCount}/{section.fields.length} activos
                  </span>
                  {isEditable && (
                    <button
                      type="button"
                      onClick={() => handleToggleSection(section, !isAllSectionActive)}
                      className="text-xs text-primary hover:underline font-medium cursor-pointer ml-1"
                    >
                      {isAllSectionActive ? 'Desmarcar sección' : 'Marcar sección'}
                    </button>
                  )}
                </div>
              </div>

              {/* Section Fields Grid */}
              <div className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {section.fields.map((field) => {
                  const isChecked = currentConfig[field.key] !== false

                  return (
                    <div
                      key={field.key}
                      className={cn(
                        'relative flex items-start gap-3 p-3.5 rounded-xl border transition-all select-none',
                        isChecked
                          ? 'border-primary/30 bg-primary/5 hover:border-primary/50'
                          : 'border-border/60 bg-muted/10 opacity-70 hover:opacity-100',
                        isEditable && 'cursor-pointer'
                      )}
                      onClick={() => {
                        if (!isEditable) return
                        handleFieldToggle(field.key, !isChecked)
                      }}
                    >
                      <div
                        className="mt-0.5 shrink-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Checkbox
                          checked={isChecked}
                          disabled={!isEditable}
                          onChange={(e) => {
                            handleFieldToggle(field.key, e.target.checked)
                          }}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-semibold text-foreground truncate">
                            {field.label}
                          </span>
                          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground border border-border/50 shrink-0">
                            {field.key}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                          {field.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer Info Notice */}
      <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-muted/40 border border-border/60 text-xs text-muted-foreground">
        <Info className="w-4 h-4 text-muted-foreground shrink-0" />
        <span>
          Los cambios se guardarán automáticamente en la ficha de este proveedor al hacer clic en <strong>Actualizar</strong>.
        </span>
      </div>
    </div>
  )
}
