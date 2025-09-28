import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './features/home/pages/HomePage'
import MainLayout from './layout/MainLayout'
import LoginPage from './features/auth/pages/LoginPage'
import RegisterPage from './features/auth/pages/RegisterPage' // Assuming the file is still named SignupPage.jsx
import OtpPage from './features/auth/pages/OtpPage'
import ForgotPasswordPage from './features/auth/pages/ForgotPasswordPage'
import ResetPasswordPage from './features/auth/pages/ResetPasswordPage'
import CarListPage from './features/cars/pages/CarListPage'
import { AuthProvider } from './context/AuthContext'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/auth/login',
        element: <LoginPage />
      },
      {
        path: '/auth/register',
        element: <RegisterPage />
      },
      {
        path: '/auth/verify-otp',
        element: <OtpPage />
      },
      {
        path: '/auth/forgot-password',
        element: <ForgotPasswordPage />
      },
      {
        path: '/auth/reset-password',
        element: <ResetPasswordPage />
      },
      {
        path: '/cars',
        element: <CarListPage />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)
