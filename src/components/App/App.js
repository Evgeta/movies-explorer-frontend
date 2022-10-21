import React from 'react';

import './App.css';

import Header from '../Header/Header';
import Promo from '../Promo/Promo';

function App() {

    
    return (
      <div className="app">
         <Header /> 
         <Promo/>


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
  