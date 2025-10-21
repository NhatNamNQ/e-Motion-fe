import { carService } from '@/features/cars/services/carService'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const getCars = createAsyncThunk(
  'cars/getCars',
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await carService.getCars(params)
      return res.data
    } catch (error) {
      return rejectWithValue(error.message || 'Lấy danh sách xe thất bại')
    }
  }
)

export const getCarDetail = createAsyncThunk(
  'cars/getCarDetail',
  async (carId, { rejectWithValue }) => {
    try {
      const res = await carService.getCarById(carId)
      return res.data
    } catch (error) {
      return rejectWithValue(error.message || 'Lấy thông tin xe thất bại')
    }
  }
)

export const calculateBookingFees = createAsyncThunk(
  'cars/calculateFee',
  async ({ id, startTime, endTime }, { rejectWithValue }) => {
    try {
      const res = await carService.calculateFees({ id, startTime, endTime })
      return res.data
    } catch (error) {
      return rejectWithValue(error.message || 'Tính toán phí xe thất bại')
    }
  }
)

export const searchCars = createAsyncThunk(
  'cars/searchCars',
  async (searchValues, { rejectWithValue }) => {
    try {
      const res = await carService.searchCars(searchValues)
      return res.data
    } catch (error) {
      return rejectWithValue(error.message || 'Tìm kiếm xe thất bại')
    }
  }
)
