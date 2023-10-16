import './App.css';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost';
import Post from './pages/Post.js'
import Registration from './pages/Registration'
import Login from './pages/Login';
import { AuthContext } from './helpers/AuthContext'
import { useState, useEffect } from 'react';
import axios from 'axios'

function App() {

  const [authState, setAuthState] = useState({
    username: '', 
    id: 0,
    status: false
  })

  useEffect(() => {
      axios.get('http://localhost:3001/auth/verify', {
        headers: {
        accessToken: localStorage.getItem('accessToken')
      }
    }).then((res) => {
        if(res.data.error){
          setAuthState({ ...authState, status: false })
        }
        else{
          setAuthState({
            username: res.data.username, 
            id: res.data.id,
            status: true
          })
        }
      })

  }, [authState])

  const logout = () => {
    localStorage.removeItem('accessToken')
    setAuthState({ 
      username: '', 
      id: 0,
      status: false 
    })
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
        <div className="navbar">
          <Link to="/"> Home Page</Link>
          <Link to="/createpost"> Create A Post</Link>
          {!authState.status ? (
             <>
                <Link to="/login"> Login</Link>
                <Link to="/registration"> Registration</Link>
             </>
          ) : (
            <div className="loggedInContainer">
              <h1>{authState.username} </h1>
              {authState.status && <button onClick={logout}> Logout</button>}
            </div>
          )}
        </div>
           <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/createpost' exact component={CreatePost} />
              <Route path='/post/:id' exact component={Post} />
              <Route path='/registration' exact component={Registration} />
              <Route path='/login' exact component={Login} />
           </Switch>
        </Router>
        </AuthContext.Provider>
    </div>
  );
}

export default App;
