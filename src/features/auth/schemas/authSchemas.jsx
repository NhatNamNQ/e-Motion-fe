import { z } from 'zod'

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,50}$/
const passwordMessage = 'Mật khẩu phải gồm chữ hoa, chữ thường, số và ký tự đặc biệt'

export const loginSchema = z.object({
  email: z.email({ message: 'Email không hợp lệ' }),
  password: z
    .string()
    .min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
    .regex(passwordRegex, {
      message: passwordMessage
    }),
  rememberMe: z.boolean().default(false).optional()
})
