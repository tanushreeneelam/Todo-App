import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../../context/authContext/authContext';

//renaming component as Component
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { userAuth } = useContext(AuthContext);

  return (
    // if user present then render Home else Redirect to Login page
    <Route
      {...rest}
      render={props =>
        !localStorage.token? (<Redirect to='/login' />) : (<Component {...props} />) }
    />
  );
};

export default PrivateRoute;