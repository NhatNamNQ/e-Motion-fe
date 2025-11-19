import { createSlice } from '@reduxjs/toolkit'

const renterSlice = createSlice({
  name: 'renter',
  initialState: {
    user: null
  },
  reducers: {
    setRenter: (state, action) => {
      state.user = action.payload
    },
    clearRenter: (state) => {
      state.user = null
    }
  }
})

export const { setRenter, clearRenter } = renterSlice.actions
export default renterSlice.reducer
