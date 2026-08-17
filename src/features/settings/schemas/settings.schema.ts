import { z } from 'zod';

export const apiUrlSchema = z.object({
  apiURL: z
    .string()
    .min(1, 'La URL del API es requerida')
    .regex(
      /^(https?:\/\/)?[\w.-]+(:\d+)?(\/[\w\-._~:/?#[\]@!$&'()*+,;=.]*)?$/i,
      'Ingresa una dirección URL válida (ej: http://localhost:3000)'
    ),
});

export type ApiUrlFormData = z.infer<typeof apiUrlSchema>;

export const apiAuthSchema = z.object({
  apiPWD: z.string().min(1, 'La contraseña es requerida'),
});

export type ApiAuthFormData = z.infer<typeof apiAuthSchema>;
