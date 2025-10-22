import { createSlice } from '@reduxjs/toolkit'
import { searchCars } from '../actions/searchActions'
import { addHours, format } from 'date-fns'
import { formatDate } from '@/lib/utils'

const createDefaultTimes = () => {
  const now = new Date()
  const currentHour = now.getHours()

  const roundedUpHour = currentHour + 1
  const startTime = new Date(now)
  startTime.setHours(roundedUpHour, 0, 0, 0)

  const endTime = addHours(startTime, 4)

  return {
    startDate: format(startTime, 'dd/MM/yyyy'),
    startHour: format(startTime, 'HH:mm'),
    endDate: format(endTime, 'dd/MM/yyyy'),
    endHour: format(endTime, 'HH:mm')
  }
}

const initialState = {
  searchForm: {
    location: '',
    startDate: null,
    endDate: null,
    startHour: null,
    endHour: null
  },
  searchResults: [],
  startTime: null,
  endTime: null,
  isLoading: false,
  error: null
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchForm: (state, action) => {
      state.searchForm = { ...state.searchForm, ...action.payload }
      state.startTime = `${formatDate(state.searchForm.startDate)}T${state.searchForm.startHour}:00`
      state.endTime = `${formatDate(state.searchForm.endDate)}T${state.searchForm.endHour}:00`
    },
    clearSearchResults: (state) => {
      state.searchResults = []
    },
    setDefaultTime: (state) => {
      const defaultTimes = createDefaultTimes()
      state.searchForm = {
        ...state.searchForm,
        ...defaultTimes,
        location: 'Hồ Chí Minh'
      }
      state.startTime = `${formatDate(defaultTimes.startDate)}T${defaultTimes.startHour}:00`
      state.endTime = `${formatDate(defaultTimes.endDate)}T${defaultTimes.endHour}:00`
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchCars.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(searchCars.fulfilled, (state, action) => {
        state.isLoading = false
        state.searchResults = action.payload
      })
      .addCase(searchCars.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export const { setSearchForm, clearSearchResults, setDefaultTime } = searchSlice.actions

export default searchSlice.reducer
