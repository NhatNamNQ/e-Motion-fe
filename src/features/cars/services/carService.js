import instance from '@/lib/axios'
import { handleError } from '@/lib/handleError'

export const carService = {
  getCars: async () => {
    try {
      const { data } = await instance.get('/vehicles')
      return data
    } catch (error) {
      throw handleError(error)
    }
  },
  getCarById: async (id) => {
    try {
      const { data } = await instance.get(`/vehicles/id/${id}`)
      return data
    } catch (error) {
      throw handleError(error)
    }
  },
  searchCars: async (searchValues) => {
    try {
      const [availableRes, unavailableRes] = await Promise.all([
        instance.post('/vehicles/filter/available', searchValues),
        instance.post('/vehicles/filter/unavailable', searchValues)
      ])

      return {
        data: {
          content: {
            availableVehicles: availableRes.data.data.content || [],
            unavailableVehicles: unavailableRes.data.data.content || []
          },
          totalPages: Math.max(
            availableRes.data.data.totalPages || 1,
            unavailableRes.data.data.totalPages || 1
          )
        }
      }
    } catch (error) {
      throw handleError(error)
    }
  },
  calculateFees: async ({ id, startTime, endTime, rental }) => {
    try {
      const { data } = await instance.post('/vehicles/booking', {
        vehicleId: id,
        startTime: startTime,
        endTime: endTime,
        rental: rental
      })
      return data
    } catch (error) {
      throw handleError(error)
    }
  },
  getCarQuantityEachStatusOfStation: async (stationId) => {
    try {
      const { data } = await instance.get(`/vehicles/status/${stationId}`)
      return data.data
    } catch (error) {
      throw handleError(error)
    }
  },
  viewCarSchedule: async (id) => {
    try {
      const { data } = await instance.get(`/vehicles/${id}/schedule`)
      return data.data
    } catch (error) {
      throw handleError(error)
    }
  },
  getManageCars: async (page, limit, statusList, search, stationId, startTime, endTime) => {
    try {
      const { data } = await instance.post('vehicles/manage', {
        page: page,
        limit: limit,
        status: statusList,
        search: search,
        stationId: stationId,
        startTime: startTime,
        endTime: endTime
      })
      return data.data
    } catch (error) {
      throw handleError(error)
    }
  },
  addNewCar: async (carData) => {
    try {
      const { data } = await instance.post('vehicles/create', {
        name: carData.name,
        description: carData.description,
        category: carData.category,
        brand: carData.brand,
        depositFee: carData.depositFee,
        point: carData.point,
        seats: carData.seats,
        pricePer4Hours: carData.pricePer4Hours,
        consumptionRate: carData.consumptionRate,
        batteryLevel: carData.batteryLevel,
        batteryCapacity: carData.batteryCapacity,
        plateNumber: carData.plateNumber,
        stationId: carData.stationId,
        images: carData.images
      })
      return data.data
    } catch (error) {
      throw handleError(error)
    }
  },
  getUpdateCar: async (id) => {
    try {
      const { data } = await instance.get(`/vehicles/update/${id}`)
      return data.data
    } catch (error) {
      throw handleError(error)
    }
  },
  updateCar: async (carData) => {
    try {
      const { data } = await instance.put('/vehicles/update', {
        id: carData.id,
        name: carData.name,
        description: carData.description,
        category: carData.category,
        brand: carData.brand,
        seats: carData.seats,
        depositFee: carData.depositFee,
        point: carData.point,
        pricePer4Hours: carData.pricePer4Hours,
        consumptionRate: carData.consumptionRate,
        batteryCapacity: carData.batteryCapacity,
        batteryLevel: carData.batteryLevel,
        plateNumber: carData.plateNumber,
        stationId: carData.stationId,
        images: carData.images
      })
      return data.data
    } catch (error) {
      throw handleError(error)
    }
  },
  deleteCar: async (id) => {
    try {
      await instance.delete(`/vehicles/${id}`)
    } catch (error) {
      throw handleError(error)
    }
  }
}
