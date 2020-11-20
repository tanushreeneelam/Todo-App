import React , {useContext} from 'react'
import guestContext from '../../context/guestContext/guestContext';

const GuestFilter = () => {
  
  const {toggleFilter} = useContext(guestContext);
  // console.log(toggleFilter);

  return (
    <div className="toggle">
      <label className="switch">
        <input type="checkbox" onChange={() => toggleFilter()}/>
        <span className="slider round"></span>
      </label>
      <p className="lead">Show attending only!</p>
    </div>
  )
}

export default GuestFilter
