import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Home from './components/pages/Home';
import TodoState from './context/todoContext/TodoState';
import AuthState from './context/authContext/AuthState';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import PrivateRoute from './components/pages/routing/PrivateRoute'
import setToken from '../src/utils/setToken'

if(localStorage.token){
  setToken(localStorage.token)
}

function App() {
  return (
    <AuthState>
      <TodoState>
        <Router>
            <div>
              <Navbar />
              <Switch>
                {/* PrivateRoute */}
                <PrivateRoute exact path='/' component={Home} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
              </Switch>
            </div>
          </Router>
      </TodoState>
    </AuthState>
  );
}

export default App;
