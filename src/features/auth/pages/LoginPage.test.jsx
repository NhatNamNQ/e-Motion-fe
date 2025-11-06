import { beforeEach, describe, expect, test, vi } from 'vitest'
import LoginPage from './LoginPage'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from '@/store'

vi.mock('../services/authService')

const renderWithProviders = (component) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  )
}

describe('LoginPage', () => {
  //reset all mock before testing
  beforeEach(() => {
    vi.resetAllMocks()
  })

  test('renders email, password inputs and login button', () => {
    localStorage.getItem.mockReturnValue(null)
    renderWithProviders(<LoginPage />)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/mật khẩu/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument()
  })
})
