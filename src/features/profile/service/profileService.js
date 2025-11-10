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
  },
  getReservationDetail: async (id) => {
    try {
      const { data } = await instance.get(`/reservations/me/${id}`)
      return data.data
    } catch (error) {
      throw handleError(error)
    }
  },
  getRentalDetail: async (id) => {
    try {
      const { data } = await instance.get(`/rentals/me/details/${id}`)
      return data.data
    } catch (error) {
      throw handleError(error)
    }
  },
  cancelReservation: async (code) => {
    try {
      const { data } = await instance.post(`/reservations/${code}/cancel`, code)
      return data.data
    } catch (error) {
      throw handleError(error)
    }
  },
  getVehicleSchedule: async (vehicleId) => {
    try {
      const { data } = await instance.get(`/vehicles/${vehicleId}/schedule`)
      return data.data
    } catch (error) {
      throw handleError(error)
    }
  },
  extendReservation: async (reservationCode, newReturnTime) => {
    try {
      const { data } = await instance.post(
        `/reservations/${reservationCode}/extend`,
        {
          newReturnTime: newReturnTime
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      return data.data
    } catch (error) {
      throw handleError(error)
    }
  }
}
