import instance from '@/lib/axios'
import { handleError } from '@/lib/handleError'

export const adminService = {
  getDataDashboard: async () => {
    try {
      const { data } = await instance.get('/users/admin-dashboard')
      return data.data
    } catch (error) {
      throw handleError(error)
    }
  },
  getReports: async (filters = {}) => {
    try {
      const { data } = await instance.post('/reports/search', {
        title: filters.title || '',
        type: filters.type || null,
        status: filters.status || null
      })
      return data.data
    } catch (error) {
      throw handleError(error)
    }
  },
  updateReportStatus: async (reportData) => {
    try {
      const { data } = await instance.post('/reports/update-status', reportData)
      return data.data
    } catch (error) {
      throw handleError(error)
    }
  }
}
