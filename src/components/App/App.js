import React,  { useState } from 'react';

import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import './App.css';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Register from '../Register/Register';
import Login from '../Login/Login';

import {
  headerShowRoutes,
  footerShowRoutes   
} from '../../utils/constants.js';

function App() {

 const [loggedIn, setLoggedIn] = useState(false);  //имитация того, что пользователь не прошел аутентификацию
// const [loggedIn, setLoggedIn] = useState(true);   //имитация того, что пользователь прошел аутентификацию

// console.log('loggedIn в App');
// console.log(loggedIn);

return (
      <div className="app">
          <Route exact path={headerShowRoutes}>
            <Header
              loggedIn={loggedIn}              
            />
          </Route>
         <Switch>
           <Route exact path="/" component={Main}/>
           <Route exact path="/movies" component={Movies}/> 
           <Route exact path="/signup">
                <Register
                  // loggedIn={loggedIn}                  
                />
                </Route>
           <Route exact path="/signin">
              {!loggedIn ? (
                <Login/>
              ) : (
                <Redirect to='/' />
              )}
           </Route>
         </Switch>
         <Route exact path={footerShowRoutes}>
            <Footer/>
         </Route>
         


      {/* <Switch> 
      <ProtectedRoute
              exact path="/"
              component={Main}
            >
        </ProtectedRoute>
        <Route path="/sign-in">
          <Login handleLogin={handleLogin}/>
        </Route>
        <Route path="/sign-up">
          <Register handleRegistration={handleRegistration}/>
        </Route>
     </Switch>    */}
    </div>
    );}
  
  export default App;
  