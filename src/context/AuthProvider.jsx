import { authService } from '@/features/auth/services/authService'
import { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('accessToken')
      if (token) {
        try {
          const userData = await authService.getCurrentUser()
          setUser(userData)
        } catch (error) {
          console.error(error)
          localStorage.removeItem('accessToken')
        }
      }
      setIsLoading(false)
    }
    checkAuth()
  }, [])

  const login = async (credentials) => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await authService.login(credentials)
      localStorage.setItem('accessToken', res.data.token)
      const userData = await authService.getCurrentUser()
      setUser(userData)

      return res.data
    } catch (error) {
      setError(error.message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }
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

  const logout = async () => {
    try {
      setIsLoading(true)
      await authService.logout()
      setUser(null)
      localStorage.removeItem('accessToken')
    } catch (error) {
      setError(error.message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    isLoading,
    error
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
