import instance from '@/lib/axios'
import { handleError } from '@/lib/handleError'

export const adminService = {
  getDashboardSummary: async () => {
    try {
      const { data } = await instance.get('users/admin-dashboard/summary')
      return data.data
    } catch (error) {
      handleError(error)
    }
  },
  getDashboardStationDetail: async () => {
    try {
      const { data } = await instance.get('users/admin-dashboard/station-detail')
      return data.data
    } catch (error) {
      handleError(error)
    }
  }
}
