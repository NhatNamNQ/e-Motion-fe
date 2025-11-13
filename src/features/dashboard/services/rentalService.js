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
  getRentals: async (filterParams = {}) => {
    try {
      const { data } = await instance.post('/rentals/filter', {
        status: filterParams.status || [],
        page: filterParams.page || 0,
        limit: filterParams.limit || 10,
        search: filterParams.search || ''
      })
      return data.data
    } catch (error) {
      throw handleError(error)
    }
  },
  checkInRental: async (id) => {
    try {
      const { data } = await instance.post(`/rentals/${id}/check-inpayment`, id)
      const { url, qrCode } = data.data
      return { url, qrCode }
    } catch (error) {
      throw handleError(error)
    }
  },

  getPaymentByRentalId: async (rentalId) => {
    try {
      const { data } = await instance.get(`/payment/rental/${rentalId}`)
      return data.data
    } catch (error) {
      throw handleError(error)
    }
  },

  checkOutRental: async (id) => {
    try {
      const { data } = await instance.post(`/rentals/${id}/check-outpayment`, id)
      return data.data
    } catch (error) {
      throw handleError(error)
    }
  },
  createVehicleLog: async (formData) => {
    try {
      const { data } = await instance.post('/vehicleLogs', formData)
      return data.data
    } catch (error) {
      throw handleError(error)
    }
  },
  getVehicleLogs: async (filterParams = {}) => {
    try {
      const { data } = await instance.post('/vehicleLogs/filter', {
        page: filterParams.page || 0,
        limit: filterParams.limit || 0,
        search: filterParams.search || ''
      })
      return data.data
    } catch (error) {
      throw handleError(error)
    }
  },
  getVehicleLogDetail: async (id) => {
    try {
      const { data } = await instance.get(`/vehicleLogs/${id}`)
      return data.data
    } catch (error) {
      throw handleError(error)
    }
  },
  updateVehicleLog: async (id, formData) => {
    try {
      const { data } = await instance.put(`/vehicleLogs/${id}`, formData)
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
  }
}
