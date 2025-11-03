import instance from '@/lib/axios'
import { handleError } from '@/lib/handleError'

export const stationService = {
  getDataManageStation: async () => {
    try {
      const { data } = await instance.get('stations/manage')
      return data.data
    } catch (error) {
      throw handleError(error)
    }
  },
  getAllStations: async () => {
    try {
      const { data } = await instance.get('stations')
      return data.data
    } catch (error) {
      throw handleError(error)
    }
  },
  getRevenueStation: async (type, day, month, year) => {
    try {
      const params = { type }
      if (day) params.day = day
      if (month) params.month = month
      if (year) params.year = year

      const { data } = await instance.get('stations/revenue', { params })
      return data.data
    } catch (error) {
      throw handleError(error)
    }
  },
  getRentalOfStation: async (stationId) => {
    try {
      const { data } = await instance.get(`stations/manage/rentals?stationId=${stationId}`)
      return data.data
    } catch (error) {
      throw handleError(error)
    }
  }
}
