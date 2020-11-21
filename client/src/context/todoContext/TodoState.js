import React , { useReducer } from 'react'
import TodoContext from './todoContext';
import todoReducer from './todoReducer';
import {
    TOGGLE_FILTER,
    SEARCH_TODO,
    CLEAR_SEARCH,
    ADD_TODO,
    REMOVE_TODO,
    UPDATE_TODO,
    EDIT_TODO,
    CLEAR_EDIT,
    GET_TODOS,
    TODOS_ERROR,
    CLEAR_TODOS
} from '../types';
import axios from 'axios';
import setToken from '../../utils/setToken';

const TodoState= (props) => {
    
    const initialState= {
        filterTodo:false,
        search:null,
        edit:null,
        todos:[],
        errors : null
    }

    const [state,dispatch] = useReducer(todoReducer,initialState);

    // get todos
    const getTodos = async () => {
        if(localStorage.token){
            setToken(localStorage.token)
        }
        try {
        const res = await axios.get('/todos')
        dispatch({
            type: GET_TODOS,
            payload: res.data
        })
        } catch (err) {
        dispatch({
            type: TODOS_ERROR,
            payload: err.response.msg
        })
        }
    }

    const addTodo = async(todo) => {
        // todo.id=Date.now(); will come from backend
        const config = {
            'Content-Type': 'application/json'
        }
        try {
            // todo.iscompleted=false; will come from backendl
            const res = await axios.post('/todos', todo, config)
            dispatch({
                type: ADD_TODO,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: TODOS_ERROR,
                payload: err.response.msg
            })
        }
    }

    const removeTodo = async(id) => {
        try {
            await axios.delete(`/todos/${id}`)
            dispatch({
              type: REMOVE_TODO,
              payload: id
            })
          } catch (err) {
            dispatch({
              type: TODOS_ERROR,
              payload: err.response.msg
            })
          }
    }

    //iscompleted
    const updateTodo = async(todo) => {
        const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          }
          try {
            const res = await axios.put(`/todos/${todo._id}`, todo, config)
            dispatch({
              type: UPDATE_TODO,
              payload: res.data
            })
            getTodos()
      
          } catch (err) {
            dispatch({
              type: TODOS_ERROR,
              payload: err.response
            })
          }
    }

    //editing name and desc etc
    const editTodo = (todo) => {
        dispatch({
            type:EDIT_TODO,
            payload:todo
        })
    }

    const clearEdit = () => {
        dispatch({
            type:CLEAR_EDIT
        })
    }

    const clearTodos = () => {
        dispatch({
            type:CLEAR_TODOS
        })
    }

    const toggleFilter = () => {
        dispatch({
            type:TOGGLE_FILTER
        })
    }
    // console.log(state.filterTodo);

    const searchTodo = (todo) => {
        dispatch({
            type:SEARCH_TODO,
            payload: todo
        })
    }

    const clearSearch = () => {
        dispatch({
            type:CLEAR_SEARCH
        })
    }

    return (
        <TodoContext.Provider 
            value={{
                todos: state.todos,
                filterTodo: state.filterTodo,
                toggleFilter,
                search: state.search,
                searchTodo,
                clearSearch,
                addTodo,
                removeTodo,
                updateTodo,
                editTodo,
                clearEdit,
                edit: state.edit,
                getTodos,
                clearTodos
                }}>
            {props.children}
        </TodoContext.Provider>
    )
}

export default TodoState;
