import instance from '@/lib/axios'
import { handleError } from '@/lib/handleError'

export const profileService = {
  viewReservationsHistory: async (email) => {
    try {
      const { data } = await instance.get(`/reservations/email/${email}`)
      return data.data
    } catch (error) {
      throw handleError(error)
    }
  },
  viewRentalsHistory: async (email) => {
    try {
      const { data } = await instance.get(`/rentals/email/${email}`)
      return data.data
    } catch (error) {
      throw handleError(error)
    }
  }
}
