import { z } from 'zod'

export const documentSchema = z.object({
  documentNumber: z
    .string()
    .length(12, { message: 'Số giấy tờ phải đúng 12 ký tự' })
    .regex(/^\d+$/, { message: 'Số giấy tờ chỉ được chứa số' })
})
