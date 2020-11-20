import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/authContext/authContext';
import GuestContext from '../../context/guestContext/guestContext';

function Navbar() {

    const {userAuth, logout,clearError, user} = useContext(AuthContext);
    const {clearGuests} = useContext(GuestContext);

    const onLogout = () => {
        logout();
        clearGuests();
        clearError();
        
    }

    const authLinks = (
        <Fragment>
          {/* similar to -> if user ? user.name : '' */}
          <li>Hello, {user && user.name}</li> 
          <span className="sm-hide">|</span>
          <li><a href='#!' onClick={onLogout}><span className="sm-hide">Logout</span> <i className="fas fa-sign-out-alt"></i></a></li>
        </Fragment>
      );
    
      const guestLinks = (
        <Fragment>
          <li>
            <Link to='/register'>Register</Link>
          </li>
          <span className="sm-hide">|</span>
          <li>
            <Link to='/login'>Login</Link>
          </li>
        </Fragment>
      );

    return (
        <div className="navbar">
            <div className="logo">
                <h1><i className='fas fa-glass-cheers' />Party RSVP</h1>
                <p> Made by Tanushree Neelam</p>
            </div>

            <ul>
                {userAuth ? authLinks : guestLinks}
            </ul>

        </div>
    )
}

export default Navbar
