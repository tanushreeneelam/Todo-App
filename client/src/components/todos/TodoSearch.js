import React,{useContext,useRef} from 'react';
import TodoContext from '../../context/todoContext/todoContext';

const TodoSearch = () => {

  const searchValue = useRef('');
  const {searchTodo,clearSearch} = useContext(TodoContext);

  const handleChange = e => {
    if(searchValue.current.value !== ''){
      searchTodo(e.target.value);
    } else {
      clearSearch();
    }
  }

  return (
    <div>
      <input ref={searchValue} onChange={handleChange} type="text" className="search" placeholder=" Search Todo by Name ..." />
      <i className="fas fa-search search-icon" />
    </div>
  )
}

export default TodoSearch