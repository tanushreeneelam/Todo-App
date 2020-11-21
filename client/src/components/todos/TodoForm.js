import React,{useState,useContext,useEffect} from 'react';
import TodoContext from '../../context/todoContext/todoContext';

function TodoForm() {

    const {addTodo,edit,updateTodo,clearEdit} = useContext(TodoContext);

    useEffect(() => {
        if(edit !== null){
            setTodo(edit);
        }else{
            setTodo({
                name: '',
                desc: '',
                priority: '1'
            })
        }
    } , [edit] )

    const [todo, setTodo] = useState({
        name: '',
        desc: '',
        priority: '1'
    })

    const {name,desc,priority}=todo;

    const handleChange = e => {
        setTodo({
            ...todo,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        // console.log(">>>",todo);     -------prints only the inputted todo, NOT all todos
        if(edit !== null){
            updateTodo(todo);
            clearEdit();
        }else{
            addTodo(todo);
            setTodo({
                name: '',
                desc: '',
                priority: '1'
            })
        }
    }

    return (
        <div className="invite-section">
            <h1>{edit !==null ? 'Edit Todo': 'Add Todo' }</h1>
            <form onSubmit={handleSubmit}>
                {/* name as in the name="Description" (in handleChange function */}
                <input type="text" placeholder="Name" name="name" value={name} onChange={handleChange} required/>
                <input type="text" placeholder="Description" name="desc" value={desc} onChange={handleChange}/>
                
                {/* <p className="options-label">Priority</p> */}
                {/* <div className="options">
                    <label className="container">non-veg
                    <input type="radio" name="priority" value='1' checked={priority==='1'} onChange={handleChange}/>
                        <span className="checkmark"></span>
                    </label>
                    <label className="container">2
                    <input type="radio" name="priority" value='2' checked={priority==='2'} onChange={handleChange}/>
                        <span className="checkmark"></span>
                    </label>
                </div> */}
                
                <input type="submit" value={edit !==null ? 'Update Todo': 'Add Todo' } className="btn" />
                {edit !==null ? <input type="button" className="btn clear" value="Cancel" onClick={clearEdit}/> : null }
            </form>
        </div>
    )
}

export default TodoForm
