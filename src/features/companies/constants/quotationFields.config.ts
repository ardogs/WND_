export type QuotationCompanyFieldKey =
  | 'registration_number'
  | 'comercial_name'
  | 'legal_representative'
  | 'address'
  | 'type_of_business'
  | 'category'
  | 'tel_fax'
  | 'website'

export type QuotationGeneralFieldKey =
  | 'date'
  | 'customer'
  | 'work_concept'
  | 'duration_of_work'

export type QuotationItemFieldKey =
  | 'description'
  | 'product_especification'
  | 'unit'
  | 'amount'
  | 'unit_price'
  | 'supply_price'
  | 'vat'
  | 'observations'

export type QuotationSummaryFieldKey =
  | 'price_before_taxes'
  | 'vat_total'
  | 'total_price_letter'
  | 'total_price_number'

export type QuotationFieldKey =
  | QuotationCompanyFieldKey
  | QuotationGeneralFieldKey
  | QuotationItemFieldKey
  | QuotationSummaryFieldKey

export interface QuotationFieldMeta {
  key: QuotationFieldKey
  label: string
  description: string
  fieldType: 'string' | 'number' | 'date'
}

export interface QuotationFieldSection {
  id: string
  title: string
  description: string
  fields: QuotationFieldMeta[]
}

export const QUOTATION_FIELD_SECTIONS: QuotationFieldSection[] = [
  {
    id: 'company',
    title: '1. Datos de la Empresa (Supplier)',
    description: 'Información fiscal y de contacto de la empresa proveedora',
    fields: [
      {
        key: 'registration_number',
        label: 'Número de Registro',
        description: 'Identificador fiscal / número de registro de la empresa',
        fieldType: 'string',
      },
      {
        key: 'comercial_name',
        label: 'Nombre Comercial',
        description: 'Nombre comercial o razón social de la empresa',
        fieldType: 'string',
      },
      {
        key: 'legal_representative',
        label: 'Representante Legal',
        description: 'Nombre de la persona o representante legal',
        fieldType: 'string',
      },
      {
        key: 'address',
        label: 'Dirección Legal',
        description: 'Domicilio o ubicación registrada de la empresa',
        fieldType: 'string',
      },
      {
        key: 'type_of_business',
        label: 'Tipo de Negocio',
        description: 'Giro de negocio o actividad económica principal',
        fieldType: 'string',
      },
      {
        key: 'category',
        label: 'Categoría',
        description: 'Rubro o clasificación comercial de la empresa',
        fieldType: 'string',
      },
      {
        key: 'tel_fax',
        label: 'Teléfono / Fax',
        description: 'Número de teléfono o fax de contacto comercial',
        fieldType: 'string',
      },
      {
        key: 'website',
        label: 'Sitio Web',
        description: 'Enlace web o portal oficial de la empresa',
        fieldType: 'string',
      },
    ],
  },
  {
    id: 'general',
    title: '2. Información de Cotización',
    description: 'Datos generales del cliente, fecha y alcance de la cotización',
    fields: [
      {
        key: 'date',
        label: 'Fecha de Cotización',
        description: 'Fecha de emisión del documento de cotización',
        fieldType: 'date',
      },
      {
        key: 'customer',
        label: 'Cliente / Destinatario',
        description: 'Nombre o entidad a la que va dirigida la cotización',
        fieldType: 'string',
      },
      {
        key: 'work_concept',
        label: 'Concepto de Trabajo',
        description: 'Descripción general del trabajo o proyecto cotizado',
        fieldType: 'string',
      },
      {
        key: 'duration_of_work',
        label: 'Duración del Trabajo',
        description: 'Plazo estimado de entrega o duración de la obra',
        fieldType: 'string',
      },
    ],
  },
  {
    id: 'items',
    title: '3. Columnas de Ítems / Productos',
    description: 'Columnas y datos incluidos en la tabla de productos o servicios',
    fields: [
      {
        key: 'description',
        label: 'Descripción del Ítem',
        description: 'Nombre o descripción general del producto o servicio',
        fieldType: 'string',
      },
      {
        key: 'product_especification',
        label: 'Especificación del Producto',
        description: 'Detalles técnicos, dimensiones o modelo del producto',
        fieldType: 'string',
      },
      {
        key: 'unit',
        label: 'Unidad de Medida',
        description: 'Unidad de cuantificación (ej. m², pza, set)',
        fieldType: 'string',
      },
      {
        key: 'amount',
        label: 'Cantidad',
        description: 'Número de unidades o volumen cotizado',
        fieldType: 'number',
      },
      {
        key: 'unit_price',
        label: 'Precio Unitario',
        description: 'Costo unitario por cada producto o servicio',
        fieldType: 'number',
      },
      {
        key: 'supply_price',
        label: 'Precio de Suministro',
        description: 'Subtotal del ítem antes de impuestos (cantidad × precio)',
        fieldType: 'number',
      },
      {
        key: 'vat',
        label: 'IVA por Ítem',
        description: 'Impuesto al valor agregado aplicado individualmente',
        fieldType: 'number',
      },
      {
        key: 'observations',
        label: 'Observaciones',
        description: 'Notas adicionales o especificaciones particulares del ítem',
        fieldType: 'string',
      },
    ],
  },
  {
    id: 'totals',
    title: '4. Resumen y Totales',
    description: 'Cálculos finales, impuestos acumulados y totales monetarios',
    fields: [
      {
        key: 'price_before_taxes',
        label: 'Precio Antes de Impuestos',
        description: 'Suma de todos los precios de suministro antes de IVA',
        fieldType: 'number',
      },
      {
        key: 'vat_total',
        label: 'IVA Total',
        description: 'Monto total acumulado de impuestos',
        fieldType: 'number',
      },
      {
        key: 'total_price_letter',
        label: 'Total en Letras',
        description: 'Representación textual del monto total',
        fieldType: 'string',
      },
      {
        key: 'total_price_number',
        label: 'Total Numérico',
        description: 'Monto final total de la cotización',
        fieldType: 'number',
      },
    ],
  },
]

export const ALL_QUOTATION_FIELD_KEYS: QuotationFieldKey[] = QUOTATION_FIELD_SECTIONS.flatMap(
  (section) => section.fields.map((field) => field.key)
)

export const getDefaultQuotationFieldsConfig = (): Record<string, boolean> => {
  const config: Record<string, boolean> = {}
  ALL_QUOTATION_FIELD_KEYS.forEach((key) => {
    config[key] = true
  })
  return config
}

export const DEFAULT_EXCEL_CELL_MAPPING: Record<QuotationFieldKey, string> = {
  // 1. Datos de la Empresa
  registration_number: 'G2',
  comercial_name: 'G3',
  legal_representative: 'J3',
  address: 'G4',
  type_of_business: 'G5',
  category: 'J5',
  tel_fax: 'G6',
  website: 'G7',

  // 2. Información de Cotización
  date: 'B3',
  customer: 'B2',
  work_concept: 'B10',
  duration_of_work: 'H9',

  // 3. Columnas de Ítems (Letra de columna en tabla)
  description: 'A',
  product_especification: 'C',
  unit: 'D',
  amount: 'E',
  unit_price: 'F',
  supply_price: 'H',
  vat: 'J',
  observations: 'K',

  // 4. Resumen y Totales
  price_before_taxes: 'H30',
  vat_total: 'J30',
  total_price_letter: 'A8',
  total_price_number: 'C31',
}

export const getDefaultExcelMappingConfig = (): Record<string, string> => {
  return { ...DEFAULT_EXCEL_CELL_MAPPING }
}

