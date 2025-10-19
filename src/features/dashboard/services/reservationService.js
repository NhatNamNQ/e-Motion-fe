import instance from '@/lib/axios'

export const reservationService = {
  getReservationByCode: async (code) => {
    const res = await instance.get(`/reservations/${code}`)
    return res.data.data
  }
}
