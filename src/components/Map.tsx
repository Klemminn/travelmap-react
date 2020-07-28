import React from 'react'
import ReactMapboxGl from 'react-mapbox-gl'
import { useStateLink } from '@hookstate/core'

import { Marker } from 'components'

import { Place } from 'types'
import { PlaceState } from 'states'

import MapStyle from './MapStyle.json'

const MapFactory = ReactMapboxGl({
  accessToken: 'pk.eyJ1Ijoia2xlbWVuemhyYWZuIiwiYSI6ImNrYzZreXRpODBzdm0yc28wc2xoc25pZnIifQ._5XM9iO5bmCXlnj0cPQ2Zg',
})

type MapProps = {
  [rest:string]: any
}

const Map = ({ ...rest }: MapProps) => {
  const { places } = useStateLink(PlaceState).get()

  return (
    <MapFactory
      className='map-component'
      style={MapStyle}
      containerStyle={{
        height: '100vh',
        width: '100vw'
      }}
      fitBounds={[[-27, 62], [-11, 67.5]]}
      {...rest}
    >
      {places.map((place: Place) => (
        <Marker
          key={place.id}
          place={place}
        />
      ))}
    </MapFactory>
  )
}

export default Map
