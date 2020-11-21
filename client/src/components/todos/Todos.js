import React, { useContext, useEffect } from 'react'
import TodoContext from '../../context/todoContext/todoContext';
import Todo from './Todo'

const Todos = () => {

  const {todos,filterTodo,search,getTodos} = useContext(TodoContext);
  useEffect( () =>{
    getTodos()
    //eslint-diable next line
  }, [] )

  if (todos === null || todos.length === 0) {
    // {'Loading todos...'}
    return <h3 className="no-guest"></h3>
  }

  return (
    <div className="guests">
      {/* if search condition exists => map on search else map on all todos */}
      { search !== null ? (filterTodo ? search.filter(todo => !filterTodo || !todo.iscompleted )
                                              .map(todo => <Todo key={todo._id} todo={todo} />) 
                                      : search.map(todo => <Todo key={todo._id} todo={todo} />) ) 
                                      
                        : todos.filter(todo => !filterTodo || !todo.iscompleted )
                      .map(todo => <Todo key={todo._id} todo={todo} />) }
    </div>
  )
}
export default Todos