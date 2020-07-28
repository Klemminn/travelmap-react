import React from 'react'
import { useStateLink } from '@hookstate/core'
import { FaMonument, FaHome, FaLandmark, FaWater, FaHiking, FaMapMarkedAlt } from 'react-icons/fa'

import './TypeSelector.scss'
import { PlaceState, setPlaceTypes } from 'states'

type Subtype = {
  name: string,
  placeTypeCodes: string[],
  display: boolean,
  selected: boolean
}

type Type = {
  icon: any,
  name: string,
  subtypes: Subtype[]
}

const types: Type[] = [
  {
    icon: FaHome,
    name: 'Towns',
    subtypes: [
      {
        name: 'Towns',
        placeTypeCodes: ['town'],
        display: false,
        selected: false
      }
    ]
  },
  {
    icon: FaMonument,
    name: 'Landmarks',
    subtypes: [
      {
        name: 'Canyons & Cliffs',
        placeTypeCodes: ['canyon', 'cliff'],
        display: true,
        selected: false
      },
      {
        name: 'Beaches',
        placeTypeCodes: ['beach'],
        display: true,
        selected: false
      },
      {
        name: 'Waterfalls',
        placeTypeCodes: ['waterfall'],
        display: true,
        selected: false
      }
    ]
  },
  {
    icon: FaLandmark,
    name: 'Museums',
    subtypes: [
      {
        name: 'Museums',
        placeTypeCodes: ['museum'],
        display: false,
        selected: false
      }
    ]
  },
  {
    icon: FaWater,
    name: 'Pools',
    subtypes: [
      {
        name: 'Public',
        placeTypeCodes: ['public_pool'],
        display: true,
        selected: false
      },
      {
        name: 'Natural',
        placeTypeCodes: ['natural_pool'],
        display: true,
        selected: false
      }
    ]
  },
  {
    icon: FaHiking,
    name: 'Activities',
    subtypes: [
      {
        name: 'Golf',
        placeTypeCodes: ['golf'],
        display: true,
        selected: false
      },
      {
        name: 'Tours',
        placeTypeCodes: ['tour'],
        display: true,
        selected: false
      }
    ]
  },
  {
    icon: FaMapMarkedAlt,
    name: 'Points of Interests',
    subtypes: [
      {
        name: 'Sculptures',
        placeTypeCodes: ['sculptures'],
        display: true,
        selected: false
      }
    ]
  }
]

const TypeSelector = ({ ...rest }) => {
  const { placeTypes } = useStateLink(PlaceState).get()

  const toggleType = (type: Type) => {
    const typeCodes = type.subtypes.map((subtype) => subtype.placeTypeCodes).flat()
    if (type.subtypes.every((subtype) => subtype.selected)) {
      type.subtypes.forEach((subtype) => (subtype.selected = false))
      setPlaceTypes(placeTypes.filter((code) => typeCodes.indexOf(code) < 0))
    } else {
      type.subtypes.forEach((subtype) => (subtype.selected = true))
      setPlaceTypes([...placeTypes, ...typeCodes.filter((code) => placeTypes.indexOf(code) < 0)])
    }
  }

  const toggleSubtype = (subtype: Subtype) => {
    subtype.selected = !subtype.selected
    if (subtype.selected) {
      setPlaceTypes([...placeTypes, ...subtype.placeTypeCodes])
    } else {
      setPlaceTypes(placeTypes.filter((code) => subtype.placeTypeCodes.indexOf(code) < 0))
    }
  }

  return (
    <div className='type-selector-component' {...rest}>
      {types.map((type: Type) => {
        const typeClasses = ['place-type']
        const isAllSelected = type.subtypes.every((subtype) => subtype.selected)
        if (isAllSelected) {
          typeClasses.push('selected')
        }
        return (
          <div
            className={typeClasses.join(' ')}
            key={type.name}
            onClick={() => toggleType(type)}
          >
            <type.icon />
            <div className='name'>
              {type.name}
            </div>
            {!!type.subtypes.filter((t) => t.display).length && (
              <div className='subtypes'>
                {type.subtypes.map((subtype) => (
                  <div
                    key={subtype.name}
                    className={`${subtype.selected ? 'selected' : ''}`}
                    onClick={(event) => {
                      event.stopPropagation()
                      toggleSubtype(subtype)
                    }}
                  >
                    {subtype.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default TypeSelector
