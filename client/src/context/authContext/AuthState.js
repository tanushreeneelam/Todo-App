import React, { useReducer } from 'react'
import axios from 'axios'
import authReducer from '../authContext/authReducer'
import AuthContext from '../authContext/authContext'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SET_ERROR,
    CLEAR_ERROR,
    LOGOUT,
    SET_USER,
    AUTH_ERROR
  } from '../types'
import setToken from '../../utils/setToken'


function AuthState(props) {

    const initialState = {
        user: null,
        userAuth:null,
        errors:null
    }
    const [state, dispatch] = useReducer(authReducer, initialState)


    //get user
    const loadUser = async() => {
        if(localStorage.token){
            setToken(localStorage.token)
        }
        try{
            const res= await axios.get('/login');
            // console.log("res>>>loadUser>>>",res);
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        }catch(err){
            dispatch({
                type: AUTH_ERROR,
                payload:err
            })
        }
        
    }

    //Register User
    const register = async formData => {
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }
        // "proxy": "http://localhost:1010",
        try {
            // console.log("in try")
            const res = await axios.post("/register", formData, config)
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
            // loadUser()
        } catch (err) {
            // console.log("in catch")
            // console.log("err",err.response.request.response);
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.request.response
            })
        }
    }

    //login user
    const login = async formData => {
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/login', formData, config)
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            // loadUser()
        } catch (err) {
            // console.log("in catch");
            //console.log("err",err.response.data);  //err.response.data.error[0].msg
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data
            })
        }
    }

    // Logout
    const logout = () => dispatch({ type: LOGOUT });
    
    //to do the pswd dont match thing
    const setError = err => {
        // console.log(err);
        dispatch({
            type:SET_ERROR,
            payload:err
        })
    }

    // to enable the cross in the red error box
    const clearError = () => {
        dispatch({
            type:CLEAR_ERROR
        })
    }

    return (
        <AuthContext.Provider value={{
            user:state.user,
            userAuth:state.userAuth,
            errors:state.errors,
            register,
            login,
            setError,
            clearError,
            logout,
            loadUser
        }}>
        {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;
