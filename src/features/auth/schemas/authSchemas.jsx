import { z } from 'zod'

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,50}$/
const passwordMessage = 'Mật khẩu phải bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt'

const emailValidation = z.email({ message: 'Email không hợp lệ' })
const passwordValidation = z
  .string()
  .min(6, { message: 'Mật khẩu phải có ít nhất 8 ký tự' })
  .regex(passwordRegex, {
    message: passwordMessage
  })

export const loginSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
  rememberMe: z.boolean().default(false).optional()
})

export const registerSchema = z
  .object({
    fullName: z.string().min(2, 'Họ và tên phải có ít nhất 2 ký tự'),
    email: emailValidation,
    password: passwordValidation,
    confirmPassword: z.string(),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: 'Bạn phải đồng ý với điều khoản sử dụng'
    })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu không khớp',
    path: ['confirmPassword']
  })
