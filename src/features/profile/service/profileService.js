import instance from '@/lib/axios'
import { handleError } from '@/lib/handleError'

export const profileService = {
  viewReservationsHistory: async (email, filterParams = {}) => {
    try {
      const { data } = await instance.post(`/reservations/email`, {
        status: filterParams.status || [],
        page: filterParams.page || 1,
        limit: filterParams.limit || 10,
        search: filterParams.search || '',
        email: email
      })
      return {
        data: data.data.content,
        totalPages: data.data.totalPages
      }
    } catch (error) {
      throw handleError(error)
    }
  },
  viewRentalsHistory: async (email, filterParams = {}) => {
    try {
      const { data } = await instance.post(`/rentals/email`, {
        status: filterParams.status || [],
        page: filterParams.page || 1,
        limit: filterParams.limit || 10,
        search: filterParams.search || '',
        email: email
      })
      return {
        data: data.data.content,
        totalPages: data.data.totalPages
      }
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
  getContract: async (rentalId) => {
    try {
      const { data } = await instance.get(`/contracts/view/${rentalId}`, { rentalId })
      return data.data
    } catch (error) {
      throw handleError(error)
    }
  },
  extendReservation: async (reservationCode, newReturnTime) => {
    try {
      const formatLocalDateTime = (date) => {
        const pad = (num) => String(num).padStart(2, '0')
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
      }

      const formattedDateTime = formatLocalDateTime(newReturnTime)

      const { data } = await instance.post(
        `/reservations/${reservationCode}/extend`,
        formattedDateTime,
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
  },
  extendRental: async (rentalId, newReturnTime) => {
    try {
      const formatLocalDateTime = (date) => {
        const pad = (num) => String(num).padStart(2, '0')
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
      }

      const formattedDateTime = formatLocalDateTime(newReturnTime)

      const { data } = await instance.post(`/rentals/${rentalId}/extend`, formattedDateTime, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      return data.data
    } catch (error) {
      throw handleError(error)
    }
  }
}
