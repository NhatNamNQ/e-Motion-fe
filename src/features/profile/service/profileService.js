import instance from '@/lib/axios'
import { handleError } from '@/lib/handleError'

export const profileService = {
  viewReservationsHistory: async () => {
    try {
      const { data } = await instance.get('/users/me/history/reservations')
      return data.data
    } catch (error) {
      throw handleError(error)
    }
  },
  viewRentalsHistory: async () => {
    try {
      const { data } = await instance.get('/users/me/history/rentals')
      return data.data
    } catch (error) {
      throw handleError(error)
    }
  }
}
