import React from 'react';

import './App.css';

import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';

function App() {

    
    return (
      <div className="app">
         <Header /> 
         <Promo/>
         <AboutProject/>


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
  