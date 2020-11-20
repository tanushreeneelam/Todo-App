import React, { useContext, useEffect } from 'react'
import GuestContext from '../../context/guestContext/guestContext';
import Guest from './Guest'

const Guests = () => {

  const {guests,filterGuest,search,getGuests} = useContext(GuestContext);
  useEffect( () =>{
    getGuests()
    //eslint-diable next line
  }, [] )

  if (guests === null || guests.length === 0) {
    return <h3 className="no-guest">{'Loading guests...'}</h3>
  }

  return (
    <div className="guests">
      {/* if search condition exists => map on search else map on all guests */}
      { search !== null ? search.map(guest => <Guest key={guest._id} guest={guest} />) : 
              guests.filter(guest => !filterGuest || guest.isconfirmed )
                      .map(guest => <Guest key={guest._id} guest={guest} />) }
    </div>
  )
}
export default Guests