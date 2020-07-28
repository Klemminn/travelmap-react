import React from 'react'
import { useStateLink } from '@hookstate/core'

import { Map, PlaceSidebar, PlaceModal, TypeSelector } from 'components'
import { PlaceState, setSelected } from 'states'

import './Home.scss'

const Home = () => {
  const { selected } = useStateLink(PlaceState).get()

  return (
    <>
      <PlaceSidebar />
      <TypeSelector />
      <Map />
      <PlaceModal toggle={() => setSelected(null)} place={selected} />
    </>
  )
}

export default Home
