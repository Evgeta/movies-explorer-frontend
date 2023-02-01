import React, { useState, useEffect } from "react";

import {
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";

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

  const [registerFormErrorMessage, setRegisterFormErrorMessage] = React.useState("");
  const [loginFormErrorMessage, setLoginFormErrorMessage] = React.useState("");
  const [profileFormErrorMessage, setProfileFormErrorMessage] = React.useState("");
  
  //состояние компонентов формы поиска на странице фильмы
  const [showShortMovies, setShowShortMovies] = useState(false);
  const [searchString, setSearchString] = useState(""); //строка поиска фильмо из общего репозитория

  //состояние компонентов формы поиска на странице схраненные фильмы
  const [showShortMoviesSaved, setShowShortMoviesSaved] = useState(false);
  const [searchStringSaved, setSearchStringSaved] = useState("");

  const [profileUpdatedMessage, setProfileUpdatedMessage] = useState("");

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
          setRegisterFormErrorMessage("");
          history.push("/movies");
        }
      })
      .catch((err) => {
        handleErrorMessage(err, 'REGISTER');
      })
      .finally(() => setIsLoading(false));
  }

  function handleLogin(email, password) {
    mainApi
      .authorize(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setLoggedIn(true);
        setLoginFormErrorMessage("");
        history.push("/movies");
      })
      .catch((err) => {
        handleErrorMessage(err, 'LOGIN');
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
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  // нажатие на лайк - cохранение фильма
  function handleFilmLike(movie) {
    mainApi
      .addNewMovie(movie)
      .then(
        (newMovie) => {
          setSavedMoviesList([...savedMoviesList, newMovie]);  
        }
      )
      .catch((err) => {
        handleErrorMessage(err, 'ADD_FILM');
      })      
  }

  useEffect(() => {
    if (loggedIn && currentUser) { 
      localStorage.setItem('savedMovies', JSON.stringify(savedMoviesList));
    }
  }, [savedMoviesList]);

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
        localStorage.setItem('savedMovies', JSON.stringify(savedMoviesList));
      })
      .catch((err) => {
        handleErrorMessage(err, 'DELETE_FILM');
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
          handleErrorMessage(err, 'GET_PUBLIC_FILMS');
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
        setProfileFormErrorMessage("");
        setProfileUpdatedMessage("Профиль успешно изменен");
      })
      .catch((err) => {
        handleErrorMessage(err, 'PROFILE');
      })
      .finally(() => setIsLoading(false));
  }

  function handleLogOut() {
    localStorage.clear();
    setCurrentUser({});
    setLoggedIn(false);
    history.push("/");
    setSavedMoviesList([]);
    setShowShortMovies(false);
    setShowShortMoviesSaved(false);
    setSearchString("");
    setSearchStringSaved("");
  }

function handleErrorMessage(err, formType) {
  if (err.status !== 200) {
    switch (formType) {
      case 'PROFILE':
        setProfileFormErrorMessage(ERROR_MESSAGES[err.status]);
        break;
      case 'LOGIN':
        setLoginFormErrorMessage(ERROR_MESSAGES[err.status]);
        break;
      case 'REGISTER':
        setRegisterFormErrorMessage(ERROR_MESSAGES[err.status]);
        break;
      default:
        console.log(`Ошибка: ${ERROR_MESSAGES[err.status]}.`);
    }
  } else {
    switch (formType) {
      case 'PROFILE':
        setProfileFormErrorMessage("");
        break;
      case 'LOGIN':
        setLoginFormErrorMessage("");
        break;
      case 'REGISTER':
        setRegisterFormErrorMessage("");
        break;
    }
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
    if (loggedIn && currentUser.email) {
      try {
        if (localStorage.getItem('savedMovies')) {
          const movies = JSON.parse(
            localStorage.getItem('savedMovies')          
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
                return {
                  movie: item
                };
              });                   
              setSavedMoviesList(compatibleMovies);
            })
            .catch((err) => {
              handleErrorMessage(err, 'GET_SAVED_FILMS');
            });
          
          localStorage.setItem('savedMovies', JSON.stringify(savedMoviesList));
        }
      } catch (err) {
         // console.log("Ошибка при попытке преобразовать JSON в массив сохраненных фильмов")
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
            setIsBurgerOpened={setIsBurgerOpened}
          />
        </Route>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/signup">
            {!loggedIn ? (
              <Register
                handleRegistration={handleRegistration}
                registerFormErrorMessage={registerFormErrorMessage}
                setRegisterFormErrorMessage={setRegisterFormErrorMessage}
              />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route exact path="/signin">
            {!loggedIn ? (
              <Login
                handleLogin={handleLogin}
                loginFormErrorMessage={loginFormErrorMessage}
                setLoginFormErrorMessage={setLoginFormErrorMessage}
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
            profileFormErrorMessage={profileFormErrorMessage}
            setProfileFormErrorMessage={setProfileFormErrorMessage}
            profileUpdatedMessage={profileUpdatedMessage}
            setProfileUpdatedMessage={setProfileUpdatedMessage}
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
            showShortMovies={showShortMovies}
            setShowShortMovies={setShowShortMovies}
            searchString={searchString}
            setSearchString={setSearchString}            
          />

          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            loggedIn={loggedIn}
            onDeleteIconClick={handleDeleteIconClick}
            savedMoviesList={savedMoviesList}
            showShortMoviesSaved={showShortMoviesSaved}
            setShowShortMoviesSaved={setShowShortMoviesSaved}
            searchStringSaved={searchStringSaved}
            setSearchStringSaved={setSearchStringSaved}            
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
