import { authService } from '@/features/auth/services/authService'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await authService.login(credentials)
      localStorage.setItem('accessToken', res.data.token)
      return res.data
    } catch (error) {
      return rejectWithValue(error.message || 'Đăng nhập thất bại')
    }
  }
)

export const logoutUser = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await authService.logout()
    localStorage.removeItem('accessToken')
  } catch (error) {
    // quăng lỗi khi token hết hạn
    localStorage.removeItem('accessToken')
    return rejectWithValue(error.message || 'Đăng xuất thất bại')
  }
})

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const res = await authService.getCurrentUser()
      return res.data
    } catch (error) {
      localStorage.removeItem('accessToken')
      return rejectWithValue(error.message || 'Lấy thông tin user thất bại')
    }
  }
)

export const registerUser = createAsyncThunk(
  'auth/register',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await authService.register(formData)
      return res.data
    } catch (error) {
      return rejectWithValue(error.message || 'Đăng ký thất bại')
    }
  }
)
