import { carService } from '@/features/cars/services/carService'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const searchCars = createAsyncThunk(
  'cars/searchCars',
  async (searchValues, { rejectWithValue }) => {
    try {
      const res = await carService.searchCars({
        city: searchValues.city,
        startTime: searchValues.startTime,
        endTime: searchValues.endTime
      })
      return res.data
    } catch (error) {
      return rejectWithValue(error.message || 'Tìm kiếm xe thất bại')
    }
  }
)
