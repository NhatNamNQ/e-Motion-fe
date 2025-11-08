import instance from '@/lib/axios'
import { handleError } from '@/lib/handleError'

export const chatService = {
  sendMessage: async (message) => {
    try {
      const { data } = await instance.post('/chat/message', {
        message: message
      })
      return data.data
    } catch (error) {
      throw handleError(error)
    }
  }
}
