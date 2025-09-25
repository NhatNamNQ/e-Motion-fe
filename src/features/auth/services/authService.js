import axios from '@/lib/axios'

export const authService = {
  login: async (credentials) => {
    console.log(credentials)
    try {
      const { data } = await axios.post('/auth/login', {
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
      const { data } = await axios.post('/auth/register', {
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
      const { data } = await axios.post('/auth/verify', {
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
  }
}
