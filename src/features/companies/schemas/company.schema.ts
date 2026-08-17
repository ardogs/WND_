import { z } from 'zod'

export const companySchema = z.object({
  registration_number: z.string().min(1, 'El número de registro es obligatorio'),
  comercial_name: z.string().min(1, 'El nombre comercial es obligatorio'),
  legal_representative: z.string().optional().default(''),
  address: z.string().optional().default(''),
  type_of_business: z.string().optional().default(''),
  category: z.string().optional().default(''),
  tel_fax: z.string().optional().default(''),
  website: z.string().optional().default(''),
  img: z.string().optional().default(''),
  quotation_fields_config: z.record(z.string(), z.boolean()).optional().default({}),
  quotation_excel_mapping: z.record(z.string(), z.string()).optional().default({}),
})

export type CompanyFormData = z.infer<typeof companySchema>
