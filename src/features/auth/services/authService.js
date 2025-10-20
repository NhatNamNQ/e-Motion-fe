import instance from '@/lib/axios'
import { handleError } from '@/lib/handleError'

export const authService = {
  login: async (credentials) => {
    try {
      const { data } = await instance.post('/auth/login', {
        email: credentials.email,
        password: credentials.password
      })
      return data
    } catch (error) {
      throw handleError(error)
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
      throw handleError(error)
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
      throw handleError(error)
    }
  },
  resendOtp: async (email) => {
    try {
      const { data } = await instance.post('/auth/resend', {
        email
      })
      return data
    } catch (error) {
      handleError(error)
    }
  },
  getCurrentUser: async () => {
    try {
      const { data } = await instance.get('/users/me')
      return data
    } catch (error) {
      throw handleError(error)
    }
  },
  logout: async () => {
    try {
      const { data } = instance.post('/auth/logout')
      return data
    } catch (error) {
      throw handleError(error)
    }
  },
  updateProfile: async (profileData) => {
    try {
      const { data } = await instance.post('/users/me/update-profile', {
        fullName: profileData.fullName,
        phone: profileData.phone
      })
      return data
    } catch (error) {
      throw handleError(error)
    }
  }
}
