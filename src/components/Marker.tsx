import React from 'react'
import { Marker as MapboxMarker } from 'react-mapbox-gl'
import { useStateLink } from '@hookstate/core'

import { Place } from 'types'
import { PhotoUtils } from 'utils'
import { HoverState, setSelected } from 'states'

import './Marker.scss'

type MarkerProps = {
  place: Place,
}

const Marker = ({ place }: MarkerProps) => {
  const hover = useStateLink(HoverState).get()
  const iconClasses = ['icon']
  if (hover === place.code) {
    iconClasses.push('hover')
  }

  return (
    <MapboxMarker
      key={place.id}
      className='marker-component'
      coordinates={[place.longitude, place.latitude]}
      onClick={() => setSelected(place)}
    >
      <div
        className={iconClasses.join(' ')}
        style={{ backgroundImage: `url(${PhotoUtils.getImage(place.files[0].image, 'small')}` }}
      >
        <div className='name'>
          {place.name}
        </div>
      </div>
    </MapboxMarker>
  )
}

export default Marker
