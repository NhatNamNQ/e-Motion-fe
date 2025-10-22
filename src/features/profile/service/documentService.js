import instance from '@/lib/axios'
import { handleError } from '@/lib/handleError'

export const documentService = {
  createDoc: async (docData) => {
    try {
      const { data } = await instance.post('/documents', docData)
      return data
    } catch (error) {
      throw handleError(error)
    }
  },
  deleteDoc: async (docId) => {
    try {
      const { data } = await instance.delete(`/documents/${docId}`)
      return data
    } catch (error) {
      throw handleError(error)
    }
  }
}
