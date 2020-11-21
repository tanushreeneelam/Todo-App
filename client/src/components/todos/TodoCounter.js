import React, {useContext} from 'react';
import TodoContext from '../../context/todoContext/todoContext';

const TodoCounter = () => {

  const {todos} = useContext(TodoContext);
  // console.log("-----",todos);

  const total= todos.length;
  const completed = (todos.filter(todo => todo.iscompleted)).length;
  const incomplete = (todos.filter(todo => !todo.iscompleted)).length;
  // const totalAttending = attending.length;

  // const completed_todos = (type) => {
  //   return todos.filter(todo => todo.iscompleted).length;
  // }

  // const incomplete_todos = (type) => {
  //   return attending.filter(todo => !todo.iscompleted).length;
  // }



  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Status</th>
            <th>Todos</th>
          </tr>
          <tr>
            <th>Completed</th>
            <td>{completed}</td>
          </tr>
          <tr>
            <th>Incomplete</th>
            <td>{incomplete}</td>
          </tr>
          <tr>
            <th>Total</th>
            <td>{total}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default TodoCounter 