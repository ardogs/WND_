import { z } from 'zod'

export const quotationItemSchema = z.object({
  description: z.string().min(1, 'Descripción obligatoria'),
  product_especification: z.string().min(1, 'Especificación obligatoria'),
  unit: z.string().min(1, 'Unidad obligatoria'),
  amount: z.coerce.number().min(1, 'La cantidad debe ser mayor a 0'),
  unit_price: z.coerce.number().min(1, 'El precio unitario debe ser mayor a 0'),
  supply_price: z.coerce.number().min(0, 'El precio de suministro debe ser mayor o igual a 0'),
  vat: z.coerce.number().min(0, 'El IVA debe ser mayor o igual a 0'),
  observations: z.string().optional().default(''),
})

export const quotationSchema = z.object({
  registration_number: z.string().optional().default(''),
  comercial_name: z.string().optional().default(''),
  legal_representative: z.string().optional().default(''),
  address: z.string().optional().default(''),
  type_of_business: z.string().optional().default(''),
  category: z.string().optional().default(''),
  tel_fax: z.string().optional().default(''),
  website: z.string().optional().default(''),

  date: z.union([z.string(), z.date()]).optional(),
  customer: z.string().min(1, 'El cliente es obligatorio'),
  work_concept: z.string().min(1, 'El concepto de trabajo es obligatorio'),
  duration_of_work: z.string().min(1, 'La duración del trabajo es obligatoria'),

  quotation_item: z.array(quotationItemSchema).min(1, 'Debe tener al menos un insumo'),

  price_before_taxes: z.coerce.number().default(0),
  vat_total: z.coerce.number().default(0),
  total_price_letter: z.string().optional().default(''),
  total_price_number: z.coerce.number().default(0),
})

export type QuotationSchemaType = z.infer<typeof quotationSchema>
