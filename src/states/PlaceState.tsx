import { createStateLink } from '@hookstate/core'

import { PlaceService } from 'services'
import { Place } from 'types'

type PlaceStateType = {
  places: Place[],
  search: string,
  placeTypes: string[],
  selected: Place | null
}

const defaultState: PlaceStateType = {
  places: [],
  search: '',
  placeTypes: [],
  selected: null
}

export const PlaceState = createStateLink(defaultState)

export const getPlaces = async () => {
  try {
    const currentState = PlaceState.get()
    const { search, placeTypes } = currentState
    const places = await PlaceService.getPlaces({ search, placeTypes })
    PlaceState.set({ ...currentState, places })
  } catch (e) {
    console.log('Error getting places', e)
  }
}

export const setSearch = (search: string) => {
  PlaceState.set({ ...PlaceState.get(), search })
  getPlaces()
}

export const setSelected = (selected: Place | null) => {
  PlaceState.set({ ...PlaceState.get(), selected })
}

export const setPlaceTypes = (placeTypes: string[]) => {
  PlaceState.set({ ...PlaceState.get(), placeTypes })
  getPlaces()
}

getPlaces()
