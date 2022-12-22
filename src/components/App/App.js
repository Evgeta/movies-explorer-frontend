import React, { useState } from "react";

import { Route, Switch, Redirect, useHistory } from "react-router-dom";

import "./App.css";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

import mainApi from '../../utils/MainApi.js';

import { headerShowRoutes, footerShowRoutes } from "../../utils/constants.js";

function App() {

  const history = useHistory();
  
  const [loggedIn, setLoggedIn] = useState(true);  //имитация того, что пользователь не прошел аутентификацию
  // const [loggedIn, setLoggedIn] = useState(false); //имитация того, что пользователь прошел аутентификацию
  

  const [isBurgerMenuOpened, setIsBurgerOpened] = useState(false); //контроль состояния окна бургер-меню



  // нажатие на иконку бургер-меню
  function handleBurgerMenuClick() {
    setIsBurgerOpened(!isBurgerMenuOpened);
  }


  function handleRegistration(username, password, email) {
    mainApi.register(username, password, email).then(
      (res) => {
         if (res) {
          // setPopupInfo({
          //   status: 'success',
          //   popupMessage: 'Вы успешно зарегистрировались!'
          // })
        //  setIsInfoTooltipOpen(true);
         history.push("/sign-in");
        }
      })
      .catch((err) => {
          //   setPopupInfo({
          //   status: 'error',
          //   popupMessage: 'Что-то пошло не так! Попробуйте ещё раз.'
          // })
          // setIsInfoTooltipOpen(true);
        })
      }
  

    function handleLogin(password, email) {
      mainApi.authorize(password, email)
     .then ((data) => {
          localStorage.setItem("jwt", data.token);
          // setLoggedIn(true);
          // setUserEmail(email);
          // setPopupInfo({
          //   status: 'success',
          //   popupMessage: 'Вы успешно вошли на закрытую часть сайта!'
          // })
          // setIsInfoTooltipOpen(true);
          history.push("/");
         })
        .catch((err) => {
          //  setPopupInfo({
          //   status: 'error',
          //   popupMessage: 'Что-то пошло не так! Попробуйте ещё раз.'
          // })
          // setIsInfoTooltipOpen(true);
        })
    }
    
  

  return (
    <div className="app">
      <Route exact path={headerShowRoutes}>
        <Header
          loggedIn={loggedIn}
          onClickBurger={handleBurgerMenuClick}
          isBurgerMenuOpened={isBurgerMenuOpened}
        />
      </Route>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route 
          exact path="/movies"
          component={Movies}
          // setIsLoading={setIsLoading}          
        />
        <Route exact path="/saved-movies" component={SavedMovies} />
        <Route exact path="/signup">
          <Register
          // loggedIn={loggedIn}
          />
        </Route>
        <Route exact path="/signin">
          {!loggedIn ? <Login /> : <Redirect to="/" />}
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
      <Route exact path={footerShowRoutes}>
        <Footer />
      </Route>   
    </div>
  );
}

export default App;
