import connector from './connector'

class PlaceService {
  static async getPlaces (params?: {
    placeTypes?: string[],
    search?: string
  }) {
    const { data } = await connector.get('/places/', { params })
    return data
  }
}

export default PlaceService
