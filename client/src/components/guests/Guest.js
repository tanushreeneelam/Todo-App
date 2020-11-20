import React,{useContext} from 'react';
import GuestContext from '../../context/guestContext/guestContext';

const Guest = ({guest}) => {

  const {_id,name,phone,diet,isconfirmed} =guest
  // console.log(">>>>>>>>>",guest);
  // console.log(guest.name);

  const {removeGuest,updateGuest,editGuest} = useContext(GuestContext);

  const handleRemove = () => {
    removeGuest(_id);
  }

  const handleIsConfirmed = () => {
     updateGuest({...guest,isconfirmed: !isconfirmed});
  }



  return (
    <div className="guest-card">

      <div className="card-head">
        <div>
          <label className={ isconfirmed ? 'confirm' : ''}> Confirmed
              <i className={`fas fa-check-square ${isconfirmed && 'confirm'}`}>
              <input type="checkbox" onClick={handleIsConfirmed}/>
            </i>
          </label>
        </div>
        <div>
          <button onClick={() => editGuest(guest)}>
            <i className="fas fa-user-edit"></i>
          </button>
          <button onClick={handleRemove}>
            <i className="fas fa-trash-alt remove"></i>
          </button>
        </div>
      </div>

      <div className="card-body">
        <h2>{name}</h2>
        <span className={'badge '+ (diet==='veg' ? 'green' : 'red') }>{diet}</span>
        <div className="contact">
          <i className="fas fa-phone-alt" />
          <p>{phone}</p>
        </div>
      </div>
      
    </div>
  )
}

export default Guest