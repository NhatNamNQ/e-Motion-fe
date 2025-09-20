import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './features/home/pages/HomePage'
import MainLayout from './layout/MainLayout'
import LoginPage from './features/auth/pages/LoginPage'
import RegisterPage from './features/auth/pages/RegisterPage' // Assuming the file is still named SignupPage.jsx
import OtpPage from './features/auth/pages/OtpPage'

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
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
