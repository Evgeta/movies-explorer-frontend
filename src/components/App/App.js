import React, { useState, useEffect } from "react";

import { Route, Switch, Redirect, useHistory, useLocation } from "react-router-dom";

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

import mainApi from "../../utils/MainApi.js";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import {
  headerShowRoutes,
  footerShowRoutes,
  ERROR_MESSAGES,
} from "../../utils/constants.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js";

function App() {
  const history = useHistory();
  const location = useLocation();

  const [loggedIn, setLoggedIn] = useState(false);




  const [currentUser, setCurrentUser] = useState({});

  const [isBurgerMenuOpened, setIsBurgerOpened] = useState(false); //контроль состояния окна бургер-меню
  const [isLoading, setIsLoading] = useState(false);

  //массив для сохранения фильмов
  const [savedMoviesList, setSavedMoviesList] = useState([]);

  const [formErrorMessage, setFormErrorMessage] = React.useState("");

  // нажатие на иконку бургер-меню
  function handleBurgerMenuClick() {
    setIsBurgerOpened(!isBurgerMenuOpened);
  }

  function handleRegistration(username, password, email) {
    setIsLoading(true);
    mainApi
      .register(username, email, password)
      .then((res) => {
        if (res._id) {
          handleLogin(email, password);
          setFormErrorMessage("");
          history.push("/movies");
        }
      })
      .catch((err) => {
        handleErrorMessage(err);
      })
      .finally(() => setIsLoading(false));
  }

  function handleLogin(email, password) {
    mainApi
      .authorize(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setLoggedIn(true);
        setFormErrorMessage("");
        history.push("/movies");
      })
      .catch((err) => {
        console.log("err внутри handleLogin");
        console.log(err);
        handleErrorMessage(err);
      });
  }

  //проверка токена пользователя при монтировании App
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    const currentPath = location.pathname;
    if (jwt) {
      mainApi
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setCurrentUser({ _id: res._id, name: res.name, email: res.email });
            history.push(currentPath);
            console.log(loggedIn);
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  // нажатие на лайк - cохранение фильма
  function handleFilmLike(movie) {
    mainApi
      .addNewMovie(movie)
      .then((newMovie) => setSavedMoviesList([newMovie, ...savedMoviesList]))
      .catch((err) => {
        handleErrorMessage(err);
      });
    localStorage.setItem(`${currentUser.email} - savedMovies`, savedMoviesList);
  }

  // нажатие на иконку удаления
  function handleDeleteIconClick(movie, fromSaved) {
    let idToDeleteOnServer = 0;
   
    if (fromSaved) {
      const movieToDelete = savedMoviesList.find((item) => {
        return item.movie.movieId === movie.movie.movieId;
      });
      idToDeleteOnServer = movieToDelete.movie._id;
     
    } else {
      const movieToDelete = savedMoviesList.find((item) => {
        return (
          item.movie.movieId === movie.id ||
          item.movie.movieId === movie.movieId
        );
      });
      idToDeleteOnServer = movieToDelete.movie._id;   
    }
    mainApi
      .deleteMovie(idToDeleteOnServer)
      .then(() => {
        const newMoviesList = savedMoviesList.filter((item) => {
          if (idToDeleteOnServer === item.movie._id) {
            return false;
          } else {
            return true;
          }
        });
        setSavedMoviesList(newMoviesList);
        localStorage.setItem(
          `${currentUser.email} - savedMovies`,
          savedMoviesList
        );
      })
      .catch((err) => {
        handleErrorMessage(err);
      });
  }

  //получение информации о пользователе с сервера
  useEffect(() => {
    if (loggedIn) {
      setIsLoading(true);
      mainApi
        .getUserInfo()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
          handleErrorMessage(err);
        })
        .finally(() => setIsLoading(false));
    }
  }, [loggedIn]);

  
    function handleUpdateProfile(name, email) {
    setIsLoading(true);
    mainApi
      .setUserInfo(name, email)
      .then((newUser) => {
        setCurrentUser(newUser.data);
        setFormErrorMessage("");
      })
      .catch((err) => {
        handleErrorMessage(err);
      })
      .finally(() => setIsLoading(false));
  }

  function handleLogOut() {
    setCurrentUser({});
    setLoggedIn(false);
    localStorage.clear();
    history.push("/");
  }

  function handleErrorMessage(err) {
    if (err.status !== 200) {
      setFormErrorMessage(ERROR_MESSAGES[err.status]);
    }
  }

  //получение сохраненных фильмов при монтировании приложения
  useEffect(() => {
    if (loggedIn && currentUser) {
      getSavedMovies();
    }
  }, [currentUser, loggedIn]);

  // получение сохраненных фильмоы с сервера и сохранение их в локальном хранилище
  function getSavedMovies() {

    console.log('внутри getSavedMovies loggedIn && currentUser');
    console.log(loggedIn);
    console.log(currentUser);

    if (loggedIn && currentUser) {
      if (localStorage.getItem(`${currentUser.email}  - savedMovies`)) {
        const movies = JSON.parse(
          localStorage.getItem(`${currentUser.email}  - savedMovies`)
        );
        setSavedMoviesList(movies);
      } else {
        mainApi
          .getSavedMovies()
          .then((data) => {
            const movies = data.movies;
            const currentUserMoviesList = movies.filter((movie) => {
              if (movie.owner === currentUser._id) return true;
              else return false;
            });
            const compatibleMovies = currentUserMoviesList.map((item) => {
              return { movie: item };
            });
            setSavedMoviesList(compatibleMovies);
          })
          .catch((err) => {
            handleErrorMessage(err);
          });
        localStorage.setItem(
          `${currentUser.email} - savedMovies`,
          savedMoviesList
        );
      }
    }
  }

  // кнопка назад
  function handleGoBack() {
    history.goBack();
  }

  return (
    <div className="app">


      <CurrentUserContext.Provider value={currentUser}>
        <Route exact path={headerShowRoutes}>
          <Header
            loggedIn={loggedIn}
            onClickBurger={handleBurgerMenuClick}
            isBurgerMenuOpened={isBurgerMenuOpened}
          />
        </Route>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/signup">
             {!loggedIn ? ( 
            <Register
              handleRegistration={handleRegistration}
              formErrorMessage={formErrorMessage}
            />
            ) : (
              <Redirect to="/" />
            ) } 
          </Route>
          <Route exact path="/signin">
             {!loggedIn ? ( 
            <Login
              handleLogin={handleLogin}
              formErrorMessage={formErrorMessage}
            />
             ) : (
              <Redirect to="/" />
            )} 
          </Route>

          <ProtectedRoute
            path="/profile"
            component={Profile}
            loggedIn={loggedIn}
            handleUpdateProfile={handleUpdateProfile}
            handleLogOut={handleLogOut}
            formErrorMessage={formErrorMessage}
          />

          <ProtectedRoute
            path="/movies"
            component={Movies}
            loggedIn={loggedIn}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            onFilmLikeClick={handleFilmLike}
            onDeleteIconClick={handleDeleteIconClick}
            savedMoviesList={savedMoviesList}
          />

          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            loggedIn={loggedIn}
            onDeleteIconClick={handleDeleteIconClick}
            savedMoviesList={savedMoviesList}
          />
          <Route path="*">
            <NotFoundPage handleGoBack={handleGoBack} />
          </Route>
        </Switch>
        <Route exact path={footerShowRoutes}>
          <Footer />
        </Route>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
