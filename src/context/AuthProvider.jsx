import { authService } from '@/features/auth/services/authService'
import { useState } from 'react'
import { AuthContext } from './AuthContext'

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const register = async (userData) => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await authService.register(userData)
      return res.data
    } catch (error) {
      setError(error.message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const value = {
    register,
    isLoading,
    error
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
