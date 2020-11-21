import React, { useContext, useEffect } from 'react'
import AuthContext from '../../context/authContext/authContext'
import TodoCounter from '../todos/TodoCounter'
import TodoFilter from '../todos/TodoFilter'
import TodoForm from '../todos/TodoForm'
import Todos from '../todos/Todos'
import TodoSearch from '../todos/TodoSearch'

function Home() {
    const { loadUser } = useContext(AuthContext)

    useEffect(() => {
        loadUser()
        // eslint-disable-next-line
    }, [])
    
    return (
        <div className="app-container">
            <div className="main">
                <div className="filter">
                    <TodoFilter />
                    <TodoSearch /> 
                </div>
                <TodoForm />
                <TodoCounter />
            </div>
            <Todos />
      </div>
    )
}

export default Home
