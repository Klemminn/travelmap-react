import { PlaceFile } from 'types'

export type Place = {
  id: number,
  address: string,
  code: string,
  description: string,
  googleMapsUrl?: string,
  tripadvisorUrl?: string,
  websiteUrl?: string,
  latitude: number,
  longitude: number,
  name: string,
  placeType: string,
  files: PlaceFile[]
}
