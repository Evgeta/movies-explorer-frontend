import React from 'react';

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

    
    return (
      <div className="app">
         <Header /> 
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
  