import instance from '@/lib/axios'

export const authService = {
  login: async (credentials) => {
    try {
      const { data } = await instance.post('/auth/login', {
        email: credentials.email,
        password: credentials.password
      })
      return data
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Đăng nhập thất bại'
      const errorCode = error.response?.data?.status

      throw {
        message: errorMessage,
        code: errorCode
      }
    }
  },
  register: async (userData) => {
    try {
      const { data } = await instance.post('/auth/register', {
        fullName: userData.fullName,
        userPassword: userData.password,
        email: userData.email,
        phone: userData.phone
      })
      return data
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Đăng ký thất bại'
      const errorCode = error.response?.data?.status

      throw {
        message: errorMessage,
        code: errorCode
      }
    }
  },
  verifyOtp: async (otpData) => {
    try {
      const { data } = await instance.post('/auth/verify', {
        email: otpData.email,
        verificationCode: otpData.verificationCode
      })
      return data
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Xác thực OTP thất bại'
      const errorCode = error.response?.data?.status

      throw {
        message: errorMessage,
        code: errorCode
      }
    }
  },
  getCurrentUser: async () => {
    try {
      const res = await instance.get('/users/me')
      return res.data
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Lấy thông tin người dùng thất bại'
      const errorCode = error.response?.data?.status

      throw {
        message: errorMessage,
        code: errorCode
      }
    }
  }
}
