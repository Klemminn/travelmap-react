import React from 'react'
import { useStateLink } from '@hookstate/core'

import { PhotoUtils } from 'utils'
import { PlaceState, setHover, setSelected, setSearch } from 'states'
import { Input } from 'components'

import './PlaceSidebar.scss'

type PlaceSidebarProps = {
  [rest:string]: any
}

const PlaceSidebar = ({ ...rest }: PlaceSidebarProps) => {
  const { places } = useStateLink(PlaceState).get()

  return (
    <div className='place-sidebar-component'>
      <Input
        className='search-input'
        placeholder='Search by name'
        onChange={(value) => setSearch(value)}
        timeout={500}
      />
      {places.map((place) => (
        <div
          key={place.code}
          className='place-tile'
          onMouseEnter={() => setHover(place.code)}
          onMouseLeave={() => setHover('')}
          onClick={() => setSelected(place)}
        >
          <div className='info'>
            <div className='name'>
              {place.name}
            </div>
            <div className='type'>
              {place.placeTypeName}
            </div>
            <div className='address'>
              {place.address}
            </div>
          </div>
          <div className='image' style={{ backgroundImage: `url(${PhotoUtils.getImage(place.files[0]?.image || '', 'small')})` }} />
        </div>
      ))}
    </div>
  )
}

export default PlaceSidebar
