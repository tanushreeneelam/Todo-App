import React,{useContext} from 'react';
import TodoContext from '../../context/todoContext/todoContext';

const Todo = ({todo}) => {

  const {_id,name,desc,priority,iscompleted} =todo
  // console.log(">>>>>>>>>",todo);
  // console.log(todo.name);

  const {removeTodo,updateTodo,editTodo} = useContext(TodoContext);

  const handleRemove = () => {
    removeTodo(_id);
  }

  const handleIsConfirmed = () => {
     updateTodo({...todo,iscompleted: !iscompleted});
  }



  return (
    <div className="guest-card">

      <div className="card-head">
        <div>
          <label className={ iscompleted ? 'confirm' : ''}> 
              <i className={`fas fa-check-square fa-2x ${iscompleted && 'confirm'}`}>
              <input type="checkbox" onClick={handleIsConfirmed}/>
            </i>
          </label>
        </div>
        <div>
          <button onClick={() => editTodo(todo)}>
            <i className="fas fa-edit fa-lg edit"></i>
          </button>
          <button onClick={handleRemove}>
            <i className="fas fa-trash-alt fa-lg remove"></i>
          </button>
        </div>
      </div>

      <div className="card-body">
        <h2>{name}</h2>
        <span className={'badge '+ (iscompleted ? 'green' : 'red') }>{iscompleted ? 'Completed' : 'Incomplete'}</span>
        <div className="contact">
          <p>{desc!=='' ? <i className="far fa-sticky-note" /> : ''} {desc}</p>
        </div>
      </div>
      
    </div>
  )
}

export default Todo