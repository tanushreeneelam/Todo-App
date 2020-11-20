import React, {useContext} from 'react';
import GuestContext from '../../context/guestContext/guestContext';

const GuestCounter = () => {

  const {guests} = useContext(GuestContext);
  // console.log("-----",guests);

  const totalInvited= guests.length;

  const attending = guests.filter(guest => guest.isconfirmed);
  const totalAttending = attending.length;

  const invitedByDiet = (type) => {
    return guests.filter(guest => guest.diet===type).length;
  }

  const attendingByDiet = (type) => {
    return attending.filter(guest => guest.diet===type).length;
  }



  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Guest</th>
            <th>Invited</th>
            <th>Attending</th>
          </tr>
          <tr>
            <th>Non-Veg</th>
            <td>{invitedByDiet('non-veg')}</td>
            <td>{attendingByDiet('non-veg')}</td>
          </tr>
          <tr>
            <th>Vegan</th>
            <td>{invitedByDiet('veg')}</td>
            <td>{attendingByDiet('veg')}</td>
          </tr>
          <tr>
            <th>Total</th>
            <td>{totalInvited}</td>
            <td>{totalAttending}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default GuestCounter