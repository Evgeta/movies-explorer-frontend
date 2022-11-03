import React, { useState } from "react";

import { Route, Switch, Redirect } from "react-router-dom";

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

import { headerShowRoutes, footerShowRoutes } from "../../utils/constants.js";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);  //имитация того, что пользователь не прошел аутентификацию
  //const [loggedIn, setLoggedIn] = useState(false); //имитация того, что пользователь прошел аутентификацию
  const [isLoading, setIsLoading] = React.useState(false); //состояние прелоадера

  const [isBurgerMenuOpened, setIsBurgerOpened] = useState(false); //контроль состояния окна бургер-меню

  // нажатие на иконку бургер-меню
  function handleBurgerMenuClick() {
    setIsBurgerOpened(!isBurgerMenuOpened);
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
        <Route exact path="/movies" component={Movies} isLoading={isLoading} />
        <Route exact path="/saved-movies" component={SavedMovies} isLoading={isLoading} />
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
