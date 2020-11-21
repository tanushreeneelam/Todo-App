import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/authContext/authContext';
// import axios from 'axios';

function Register(props) {

    
    const {register,userAuth, errors, setError, clearError} = useContext(AuthContext);

    useEffect(() => {
        //if user is not null
        if (userAuth) {
          props.history.push('/')
          clearError()
        } else {
          clearError()
        }
        // eslint-disable-next-line
    }, [userAuth, props.history])

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
    const { name, email, password, password2 } = user
    
    onchange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
        if (errors !== null) {
          clearError()
        }
    }
    
    onsubmit = (e) => {
        e.preventDefault()
        if (password !== password2) {
            // console.log("pswd dont match")
            setError({ msg:'Passwords do not match'})
            
        } else {
            // console.log({name,email,password});
            register({name,email,password});
            // const payload = {name,email,password};
            // console.log(payload);
            // axios({
            //     url: '/register',
            //     method: 'POST',
            //     data: payload
            //   })//data
            //     .then(() => {
            //       console.log('Data has been sent to the server');
            //       // this.resetUserInputs();
            //       // this.getBlogPost();
            //     })
            //     .catch((err) => {
            //       console.log('Internal server error');
            //       console.log(err);
            //     });
        }
        // clearError();
    }

    return (
        <div className="register">
            <h1>Sign Up</h1>
            <form>
                <input type="text" name="name" placeholder="Name" value={name} onChange={onchange} />
                <input type="email" name="email" placeholder="Email" value={email} onChange={onchange} />
                <input type="password" name="password" placeholder="Password" value={password} onChange={onchange} />
                <input type="password" name="password2" placeholder="Confirm Password" value={password2} onChange={onchange} required />
                <input type="submit" value="Sign Up" className="btn" />
            </form>
            <div className="question">
                
                {/* express-validator errors.error -> array but custom error mesage we send using msg ---- check backend */}
                {/* {errors!== null && console.log("REGISTER.JS-+--",errors ) && <button className="danger"> */}
                {/* {console.log("REGISTER.JS",errors )}  */}
                { errors!==null && <button className="danger">
                {/* {console.log("REGISTER.JS",(JSON.parse(errors)).msg )} */}
                {/* {console.log("REGISTER.JS",(JSON.parse(errors)).error[0].msg )} */}
                    {/* {errors.msg ? errors.msg : errors.error[0].msg} */}
                    {errors.msg ? errors.msg : (JSON.parse(errors)).msg ? (JSON.parse(errors)).msg : (JSON.parse(errors)).error[0].msg}
                    {/* {console.log(json[0].Title)} */}
                <span onClick={()=> clearError()}>X</span></button>}
        
                
                <p>Already have an account? {" "} <Link to='/login'>Sign In </Link></p>
            </div>
        </div >
    )
}

export default Register
