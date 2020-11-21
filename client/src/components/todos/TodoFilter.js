import React , {useContext} from 'react'
import TodoContext from '../../context/todoContext/todoContext';

const TodoFilter = () => {
  
  const {toggleFilter} = useContext(TodoContext);
  // console.log(toggleFilter);

  return (
    <div className="toggle">
      <label className="switch">
        <input type="checkbox" onChange={() => toggleFilter()}/>
        <span className="slider round"></span>
      </label>
      <p className="lead">Show incomplete only!</p>
    </div>
  )
}

export default TodoFilter
