import React from 'react';
import {
    ADD_TODO,
    REMOVE_TODO,
    CLEAR_SEARCH,
    SEARCH_TODO,
    TOGGLE_FILTER,
    UPDATE_TODO,
    EDIT_TODO,
    CLEAR_EDIT,
    GET_TODOS,
    TODOS_ERROR,
    CLEAR_TODOS
} from '../types';

function todoReducer(state,action) {
    const {type,payload} = action;

    switch(type){
        case GET_TODOS:
            return{
                ...state,
                todos:payload
            }
        case TODOS_ERROR:
            return{
                ...state,
                todos:[],
                errors:payload
            }
        case CLEAR_TODOS:
            return{
                ...state,
                filterTodo:false,
                search:null,
                edit:null,
                todos:[],
                errors : null
            }
        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, payload]
            }
        case REMOVE_TODO:
            return {
                ...state,
                todos : state.todos.filter(todo => todo._id !== payload)
            }
        
        //iscompleted
        case UPDATE_TODO: 
            return {
                ...state,
                todos : state.todos.map(todo => todo._id === payload._id ? payload : todo )
            }
        
        case EDIT_TODO:
            return {
                ...state,
                edit:payload
            }
        case CLEAR_EDIT:
            return {
                ...state,
                edit:null
            }
        case SEARCH_TODO:
            const reg= new RegExp(`${payload}`,'gi');
            return {
                ...state,
                search: state.todos.filter(todo => todo.name.match(reg))
            }
        case CLEAR_SEARCH:
            return {
                ...state,
                search: null
            }

        case TOGGLE_FILTER:
            return {
                ...state,
                filterTodo: !state.filterTodo
            }

        default:
            return state
    }
    
}

export default todoReducer
