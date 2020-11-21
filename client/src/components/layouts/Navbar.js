import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/authContext/authContext';
import TodoContext from '../../context/todoContext/todoContext';

function Navbar() {

    const {userAuth, logout,clearError, user} = useContext(AuthContext);
    const {clearTodos} = useContext(TodoContext);

    const onLogout = () => {
        logout();
        clearTodos();
        clearError();
        
    }

    const authLinks = (
        <Fragment>
          {/* similar to -> if user ? user.name : '' */}
          <li>Hello , {user && user.name}</li> 
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
    
      // var padding_style={
      //   padding-left:'2px';
      // }

    return (
        <div className="navbar">
            <div className="logo">
                <h1><i className='fas fa-tasks' />Todo App</h1>
                <span className="sm-hide">{!userAuth ? <p> Made by Tanushree Neelam</p> : '' }</span>
            </div>

            <ul>
                {userAuth ? authLinks : guestLinks}
            </ul>

        </div>
    )
}

export default Navbar
