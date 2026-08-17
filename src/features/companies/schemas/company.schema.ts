import { z } from 'zod'

export const companySchema = z.object({
  registration_number: z.string().min(1, 'El número de registro es obligatorio'),
  comercial_name: z.string().min(1, 'El nombre comercial es obligatorio'),
  legal_representative: z.string().min(1, 'El representante legal es obligatorio'),
  address: z.string().min(1, 'La dirección legal es obligatoria'),
  type_of_business: z.string().min(1, 'El tipo de negocio es obligatorio'),
  category: z.string().min(1, 'La categoría es obligatoria'),
  tel_fax: z.string().min(1, 'El teléfono/fax es obligatorio'),
  website: z.string().min(1, 'El sitio web es obligatorio'),
  img: z.string().optional().default(''),
})

export type CompanyFormData = z.infer<typeof companySchema>
