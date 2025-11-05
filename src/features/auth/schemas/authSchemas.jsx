import { z } from 'zod'

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,50}$/
const passwordMessage = 'Mật khẩu phải bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt'

const phoneRegex = /^(03|05|07|08|09)\d{8}$/
const phoneMessage = 'Số điện thoại không hợp lệ'

const emailValidation = z.email({ message: 'Email không hợp lệ' })
const passwordValidation = z
  .string()
  .min(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự' })
  .regex(passwordRegex, {
    message: passwordMessage
  })
const phoneValidation = z.string().regex(phoneRegex, {
  message: phoneMessage
})

export const loginSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
  rememberMe: z.boolean().default(false).optional()
})

export const registerSchema = z
  .object({
    fullName: z.string().min(2, 'Họ và tên phải có ít nhất 2 ký tự'),
    phone: phoneValidation,
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

export const otpSchema = z.object({
  verificationCode: z.string().min(6, {
    message: 'Mã OTP phải có 6 ký tự.'
  })
})

export const forgotPasswordSchema = z.object({
  email: emailValidation
})

export const resetPasswordSchema = z
  .object({
    password: passwordValidation,
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu không khớp',
    path: ['confirmPassword']
  })

export const changePasswordSchema = z
  .object({
    currentPassword: passwordValidation,
    newPassword: passwordValidation,
    confirmPassword: z.string()
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Mật khẩu không khớp',
    path: ['confirmPassword']
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    message: 'Mật khẩu mới phải khác mật khẩu cũ',
    path: ['newPassword']
  })

export const addUserSchema = z
  .object({
    fullName: z.string().min(2, 'Họ và tên phải có ít nhất 2 ký tự'),
    phone: phoneValidation,
    email: emailValidation,
    password: passwordValidation,
    confirmPassword: z.string().optional(),
    role: z.string(),
    stationId: z.number()
  })
  .refine(
    (data) => {
      if (data.password) {
        return data.password === data.confirmPassword
      }
      return true
    },
    {
      message: 'Mật khẩu không khớp',
      path: ['confirmPassword']
    }
  )

export const editUserSchema = addUserSchema.safeExtend({
  password: z.string().refine(
    (val) => {
      if (!val) return true
      return val.length >= 8 && passwordRegex.test(val)
    },
    { message: passwordMessage }
  )
})
