import React,  { useState } from 'react';

import {
  Route,
  Switch,
} from 'react-router-dom';

import './App.css';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';

function App() {

// const [loggedIn, setLoggedIn] = useState(false);  //имитация того, что пользователь не прошел аутентификацию
 const [loggedIn, setLoggedIn] = useState(true);   //имитация того, что пользователь прошел аутентификацию
console.log('loggedIn в App');
console.log(loggedIn);

return (
      <div className="app">
         <Header loggedIn={loggedIn}/> 
         <Switch>
           <Route exact path="/" component={Main}/>
           <Route exact path="/movies" component={Movies}/> 
         </Switch>
         <Footer/>


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
  