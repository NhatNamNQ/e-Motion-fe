import { authService } from '@/features/auth/services/authService'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await authService.login(credentials)
      return res.data
    } catch (error) {
      return rejectWithValue(error.message || 'Đăng nhập thất bại')
    }
  }
)

export const logoutUser = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await authService.logout()
    localStorage.removeItem('token')
  } catch (error) {
    // quăng lỗi khi token hết hạn
    localStorage.removeItem('token')
    return rejectWithValue(error.message || 'Đăng xuất thất bại')
  }
})
