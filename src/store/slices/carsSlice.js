import { createSlice } from '@reduxjs/toolkit'
import { calculateBookingFees, getCarDetail, getCars } from '../actions/carsActions'

const initialState = {
  cars: [],
  fees: {
    booking: null,
    vat: null,
    deposit: null,
    holdCar: null,
    total: null
  },
  selectedCar: null,
  loading: {
    cars: false,
    carDetail: true
  },
  error: null
}

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCars.pending, (state) => {
        state.loading.cars = true
        state.error = null
      })
      .addCase(getCars.fulfilled, (state, action) => {
        state.loading.cars = false
        state.cars = action.payload
      })
      .addCase(getCars.rejected, (state, action) => {
        state.loading.cars = false
        state.error = action.payload
      })
      .addCase(getCarDetail.pending, (state) => {
        state.loading.carDetail = true
        state.error = null
      })
      .addCase(getCarDetail.fulfilled, (state, action) => {
        state.loading.carDetail = false
        state.selectedCar = action.payload
      })
      .addCase(getCarDetail.rejected, (state, action) => {
        state.loading.carDetail = false
        state.error = action.payload
      })
      .addCase(calculateBookingFees.pending, (state) => {
        state.loading.carDetail = true
      })
      .addCase(calculateBookingFees.fulfilled, (state, action) => {
        state.loading.carDetail = false
        const feesData = action.payload

        feesData.forEach((fee) => {
          switch (fee.feeType) {
            case 'BOOKING_FEE':
              state.fees.booking = fee.value
              break
            case 'VAT':
              state.fees.vat = fee.value
              break
            case 'DEPOSIT':
              state.fees.deposit = fee.value
              break
            case 'HOLD_CAR':
              state.fees.holdCar = fee.value
              break
            case 'TOTAL_AMOUNT':
              state.fees.total = fee.value
              break
          }
        })
      })
      .addCase(calculateBookingFees.rejected, (state) => {
        state.loading.carDetail = false
      })
  }
})

export default carsSlice.reducer
