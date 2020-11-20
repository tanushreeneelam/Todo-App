import React from 'react';
import {
    ADD_GUEST,
    REMOVE_GUEST,
    CLEAR_SEARCH,
    SEARCH_GUEST,
    TOGGLE_FILTER,
    UPDATE_GUEST,
    EDIT_GUEST,
    CLEAR_EDIT,
    GET_GUESTS,
    GUESTS_ERROR,
    CLEAR_GUESTS
} from '../types';

function guestReducer(state,action) {
    const {type,payload} = action;

    switch(type){
        case GET_GUESTS:
            return{
                ...state,
                guests:payload
            }
        case GUESTS_ERROR:
            return{
                ...state,
                guests:[],
                errors:payload
            }
        case CLEAR_GUESTS:
            return{
                ...state,
                filterGuest:false,
                search:null,
                edit:null,
                guests:[],
                errors : null
            }
        case ADD_GUEST:
            return {
                ...state,
                guests: [...state.guests, payload]
            }
        case REMOVE_GUEST:
            return {
                ...state,
                guests : state.guests.filter(guest => guest._id !== payload)
            }
        
        //isconfirmed
        case UPDATE_GUEST: 
            return {
                ...state,
                guests : state.guests.map(guest => guest._id === payload._id ? payload : guest )
            }
        
        case EDIT_GUEST:
            return {
                ...state,
                edit:payload
            }
        case CLEAR_EDIT:
            return {
                ...state,
                edit:null
            }
        case SEARCH_GUEST:
            const reg= new RegExp(`${payload}`,'gi');
            return {
                ...state,
                search: state.guests.filter(guest => guest.name.match(reg))
            }
        case CLEAR_SEARCH:
            return {
                ...state,
                search: null
            }

        case TOGGLE_FILTER:
            return {
                ...state,
                filterGuest: !state.filterGuest
            }

        default:
            return state
    }
    
}

export default guestReducer
