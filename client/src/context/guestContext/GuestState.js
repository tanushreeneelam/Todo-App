import React , { useReducer } from 'react'
import GuestContext from './guestContext';
import guestReducer from './guestReducer';
import {
    TOGGLE_FILTER,
    SEARCH_GUEST,
    CLEAR_SEARCH,
    ADD_GUEST,
    REMOVE_GUEST,
    UPDATE_GUEST,
    EDIT_GUEST,
    CLEAR_EDIT,
    GET_GUESTS,
    GUESTS_ERROR,
    CLEAR_GUESTS
} from '../types';
import axios from 'axios';
import setToken from '../../utils/setToken';

const GuestState= (props) => {
    
    const initialState= {
        filterGuest:false,
        search:null,
        edit:null,
        guests:[],
        errors : null
    }

    const [state,dispatch] = useReducer(guestReducer,initialState);

    // get guests
    const getGuests = async () => {
        if(localStorage.token){
            setToken(localStorage.token)
        }
        try {
        const res = await axios.get('/guests')
        dispatch({
            type: GET_GUESTS,
            payload: res.data
        })
        } catch (err) {
        dispatch({
            type: GUESTS_ERROR,
            payload: err.response.msg
        })
        }
    }

    const addGuest = async(guest) => {
        // guest.id=Date.now(); will come from backend
        const config = {
            'Content-Type': 'application/json'
        }
        try {
            // guest.isconfirmed=false; will come from backendl
            const res = await axios.post('/guests', guest, config)
            dispatch({
                type: ADD_GUEST,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: GUESTS_ERROR,
                payload: err.response.msg
            })
        }
    }

    const removeGuest = async(id) => {
        try {
            await axios.delete(`/guests/${id}`)
            dispatch({
              type: REMOVE_GUEST,
              payload: id
            })
          } catch (err) {
            dispatch({
              type: GUESTS_ERROR,
              payload: err.response.msg
            })
          }
    }

    //isconfirmed 
    const updateGuest = async(guest) => {
        const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          }
          try {
            const res = await axios.put(`/guests/${guest._id}`, guest, config)
            dispatch({
              type: UPDATE_GUEST,
              payload: res.data
            })
            getGuests()
      
          } catch (err) {
            dispatch({
              type: GUESTS_ERROR,
              payload: err.response
            })
          }
    }

    //editing name and ph etc
    const editGuest = (guest) => {
        dispatch({
            type:EDIT_GUEST,
            payload:guest
        })
    }

    const clearEdit = () => {
        dispatch({
            type:CLEAR_EDIT
        })
    }

    const clearGuests = () => {
        dispatch({
            type:CLEAR_GUESTS
        })
    }

    const toggleFilter = () => {
        dispatch({
            type:TOGGLE_FILTER
        })
    }
    // console.log(state.filterGuest);

    const searchGuest = (guest) => {
        dispatch({
            type:SEARCH_GUEST,
            payload: guest
        })
    }

    const clearSearch = () => {
        dispatch({
            type:CLEAR_SEARCH
        })
    }

    return (
        <GuestContext.Provider 
            value={{
                guests: state.guests,
                filterGuest: state.filterGuest,
                toggleFilter,
                search: state.search,
                searchGuest,
                clearSearch,
                addGuest,
                removeGuest,
                updateGuest,
                editGuest,
                clearEdit,
                edit: state.edit,
                getGuests,
                clearGuests
                }}>
            {props.children}
        </GuestContext.Provider>
    )
}

export default GuestState;
