import * as z from 'zod'

export const checkInSchema = z.object({
  type: z.string().default('CHECK_IN'),
  currentBattery: z
    .number()
    .min(0, 'Battery percentage must be at least 0')
    .max(100, 'Battery percentage must be at most 100'),
  img: z.string().min(1, 'Image is required'),
  maintain: z.boolean().default(true)
})

export const checkOutSchema = z.object({
  type: z.string().default('CHECK_OUT'),
  currentBattery: z
    .number()
    .min(0, 'Battery percentage must be at least 0')
    .max(100, 'Battery percentage must be at most 100'),
  img: z.string().min(1, 'Image is required'),
  maintain: z.boolean().default(true)
})
