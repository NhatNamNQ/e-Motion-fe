import instance from '@/lib/axios'
import { handleError } from '@/lib/handleError'

export const rentalService = {
  createRentalFromReservation: async (code, staffId) => {
    try {
      const { data } = await instance.post('/rentals/reservation', {
        reservationCode: code,
        staffId: staffId
      })
      return data.data
    } catch (error) {
      throw handleError(error)
    }
  },
  getRentalById: async (id) => {
    try {
      const { data } = await instance.get(`/rentals/${id}/details`)
      return data.data
    } catch (error) {
      throw handleError(error)
    }
  },
  getRentals: async () => {
    try {
      const { data } = await instance.get('/rentals')
      return data.data
    } catch (error) {
      throw handleError(error)
    }
  },
  checkInRental: async (id) => {
    try {
      const { data } = await instance.post(`/rentals/${id}/check-inpayment`, id)
      return data.data
    } catch (error) {
      throw handleError(error)
    }
  },
  searchRentals: async (searchQuery) => {
    try {
      const { data } = await instance.get('/rentals/search', {
        params: searchQuery
      })
      return data.data
    } catch (error) {
      throw handleError(error)
    }
  }
}
