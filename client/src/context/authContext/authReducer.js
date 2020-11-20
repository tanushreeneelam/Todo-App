import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SET_ERROR,
    CLEAR_ERROR,
    SET_USER,
    AUTH_ERROR,
    LOGOUT
  } from '../types'
  
  export default (state, action) => {
    switch (action.type) {
      case SET_USER:
        return{
          ...state,
          user: action.payload,
          userAuth:true,
          errors:null
        }
      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
          localStorage.setItem('token',action.payload.token)
          return{
              ...state,
              userAuth:true,
              errors:null
          }
      case LOGIN_FAIL:
      case REGISTER_FAIL:
      case LOGOUT:
      case AUTH_ERROR:
          // console.log("action.payload>>>>>",action.payload);
          localStorage.removeItem('token')
          return{
              ...state,
              userAuth:null,
              errors:action.payload
          }
      case SET_ERROR:
        return{
          ...state,
          errors: action.payload
        }
      case CLEAR_ERROR:
        return{
          ...state,
          errors: null
        }
      default:
        return state
    }
  }