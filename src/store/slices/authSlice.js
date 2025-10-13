import { createSlice } from '@reduxjs/toolkit'
import { loginUser, logoutUser } from '../actions/authActions'

const initialState = {
  user: null,
  token: localStorage.getItem('accessToken'),
  isAuthenticated: !!localStorage.getItem('accessToken'),
  isLoading: false,
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.token = action.payload.token
        state.isAuthenticated = true
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.isAuthenticated = false
        state.token = null
      })
      .addCase(logoutUser.pending, (state) => {
        state.error = null
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null
        state.isAuthenticated = false
        state.error = null
      })
      .addCase(logoutUser.rejected, (state) => {
        state.token = null
        state.isAuthenticated = false
      })
  }
})

export const { clearError } = authSlice.actions
export default authSlice.reducer
