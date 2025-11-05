import PublicRoute from './PublicRoute'
import AuthLayout from '@/layout/AuthLayout'
import LoginPage from '@/features/auth/pages/LoginPage'
import RegisterPage from '@/features/auth/pages/RegisterPage'
import OtpPage from '@/features/auth/pages/OtpPage'
import ForgotPasswordPage from '@/features/auth/pages/ForgotPasswordPage'
import ResetPasswordPage from '@/features/auth/pages/ResetPasswordPage'

const authRoutes = {
  path: '/auth',
  element: <AuthLayout />,
  children: [
    {
      path: 'login',
      element: (
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      )
    },
    {
      path: 'register',
      element: (
        <PublicRoute>
          <RegisterPage />
        </PublicRoute>
      )
    },
    {
      path: 'verify-otp',
      element: (
        <PublicRoute>
          <OtpPage />
        </PublicRoute>
      )
    },
    {
      path: 'forgot-password',
      element: (
        <PublicRoute>
          <ForgotPasswordPage />
        </PublicRoute>
      )
    },
    {
      path: 'reset-password',
      element: (
        <PublicRoute>
          <ResetPasswordPage />
        </PublicRoute>
      )
    }
  ]
}

export default authRoutes
