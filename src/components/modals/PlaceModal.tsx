import React from 'react'
import { FaGoogle, FaTripadvisor, FaLink, FaHeart } from 'react-icons/fa'

import { PhotoUtils } from 'utils'
import { Link, Modal } from 'components'
import { Place } from 'types'

import './PlaceModal.scss'

type PlaceModalProps = {
  place: Place | null,
  [rest:string]: any
}

const PlaceModal = ({ place, ...rest }: PlaceModalProps) => {
  const isLiked = true
  return (
    <Modal
      className='place-modal-component'
      isOpen={!!place}
      size='xl'
      {...rest}
    >
      <div className='content-container'>
        <div
          className='header-container'
          style={{ backgroundImage: `url(${PhotoUtils.getImage(place?.files[0].image || '', 'large')}`}}
        >
          <div className='name'>{place?.name}</div>
          <div className='actions'>
            <div
              className='toggle-like'
              // onClick={() => isLiked ? removeFromItinerary(place) : addToItinerary(place)}
            >
              <FaHeart className='toggle-icon' />
              {isLiked ? 'Remove from Favorites' : 'Add to Favorites'}
            </div>
            <div className='links'>
              {place?.googleMapsUrl && (
                <Link link={place.googleMapsUrl}>
                  <FaGoogle />
                  <span className='name'>Google Maps</span>
                </Link>
              )}
              {place?.tripadvisorUrl && (
                <Link link={place.tripadvisorUrl}>
                  <FaTripadvisor />
                  <span className='name'>TripAdvisor</span>
                </Link>
              )}
              {place?.websiteUrl && (
                <Link link={place.websiteUrl}>
                  <FaLink />
                  <span className='name'>Website</span>
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className='info-container'>
          <div className='title'>Description</div>
          {place?.address && (
            <div className='address'>
              {place.address}
            </div>
          )}
          <div className='description'>
            {place?.description}
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default PlaceModal
