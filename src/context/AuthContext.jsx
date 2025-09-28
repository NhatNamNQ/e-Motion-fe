import { authService } from '@/features/auth/services/authService'
import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('accessToken')
      if (token) {
        try {
          const userData = await authService.getCurrentUser()
          setUser(userData)
          setIsAuthenticated(true)
        } catch (error) {
          console.log(error)
          localStorage.removeItem('accessToken')
        }
      }
    }
    checkAuth()
  }, [])

  const value = {
    user,
    isAuthenticated
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
