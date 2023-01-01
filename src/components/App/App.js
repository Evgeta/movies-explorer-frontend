import React, { useState, useEffect } from "react";

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
import {
  CurrentUserContext
} from '../../contexts/CurrentUserContext.js';

import { headerShowRoutes, footerShowRoutes } from "../../utils/constants.js";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';


function App() {

  const history = useHistory();
  
  //const [loggedIn, setLoggedIn] = useState(true);  //имитация того, что пользователь не прошел аутентификацию
  const [loggedIn, setLoggedIn] = useState(false); 
  const [currentUser, setCurrentUser] = useState({});
  

  const [isBurgerMenuOpened, setIsBurgerOpened] = useState(false); //контроль состояния окна бургер-меню

  
  //массив для сохранения фильмов
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  //   localStorage.getItem(`${currentUser.email} - savedMovies`) ?
  //   JSON.parse(localStorage.getItem(`${currentUser.email} - savedMovies`, savedMoviesList)) :
  //   []   
  // );

  // нажатие на иконку бургер-меню
  function handleBurgerMenuClick() {
    setIsBurgerOpened(!isBurgerMenuOpened);
  }

  function handleRegistration(username, password, email) {
    // setIsLoader(true);
    console.log(username, email, password);
    mainApi.register(username, email, password,).then(
      (res) => {
         if (res._id) {
           handleLogin(email, password);
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
        // .finally(() => setIsLoader(false));
      }
  

    function handleLogin(email, password) {
      console.log(email, password);
      mainApi.authorize(email, password)
     .then ((data) => {
          console.log('выводим data');
          console.log(data);
          localStorage.setItem("jwt", data.token);
          console.log('выводим loggedIn');
          console.log(loggedIn);

          setLoggedIn(true);

          console.log('выводим loggedIn');
          console.log(loggedIn);

          history.push('/movies');
          // setLoggedIn(true);
          // setUserEmail(email);
          // setPopupInfo({
          //   status: 'success',
          //   popupMessage: 'Вы успешно вошли на закрытую часть сайта!'
          // })
          // setIsInfoTooltipOpen(true);
          // history.push("/");
         })
        .catch((err) => {
          //  setPopupInfo({
          //   status: 'error',
          //   popupMessage: 'Что-то пошло не так! Попробуйте ещё раз.'
          // })
          // setIsInfoTooltipOpen(true);
          console.log(err)
        })
    }
     
//проверка токена пользователя при монтировании App
useEffect(() => {
  const jwt = localStorage.getItem('jwt');
  if (jwt) {
    mainApi.checkToken(jwt)
      .then((res) => {
        if (res) {
          setLoggedIn(true);   
          setCurrentUser(res);                 
          history.push('/');
        }
      })
      .catch(err => console.log(err));
  }
}, [history]);


// нажатие на лайк - cохранение фильма
function handleFilmLike(movie) {

  console.log('movie внутри handleFilmLike');
  console.log(movie);


  mainApi
    .addNewMovie(movie)
    .then(newMovie => setSavedMoviesList([newMovie, ...savedMoviesList]))
    .catch(err => console.log(err))

    console.log('savedMoviesList внутри handleFilmLike');
    console.log(savedMoviesList);

    localStorage.setItem(`${currentUser.email} - savedMovies`, savedMoviesList);    
  }

// нажатие на иконку удаления
function handleDeleteIconClick(movie) {
  
  console.log('внутри handleDeleteIconClick');

  console.log('movie');
  console.log(movie);

  console.log('movie');
  console.log(movie);

  const movieToDelete = savedMoviesList.find(
   
    (item) => {
      console.log('item');
      console.log(item);

      
      return item.movie.movieId === movie.id || item.movie.movieId === movie.movieId}
  );

  console.log('movieToDelete');

  console.log(movieToDelete);
  console.log(movieToDelete.movie._id);
  // ?console.log(movieToDelete._id);



  mainApi
    .deleteMovie(movieToDelete.movie._id)
    .then(() => {
      // const newMoviesList = savedMoviesList.filter(m => {
      //   if (movie.id === m.movieId || movie.movieId === m.movieId) {
      //     return false;
      //   } else {
      //     return true;
      //   }
      // });
      setSavedMoviesList(
        // newMoviesList
        savedMoviesList.filter(item => {

          console.log('item.movie.movieId');
          console.log(item.movie.movieId);
          


          if (movie.id === item.movie.movieId || movie.movieId === item.movie.movieId) {
            return false;
          } else {
            return true;
          }
        })
        );

        localStorage.setItem(`${currentUser.email} - savedMovies`, savedMoviesList);    
    })
    .catch(err => console.log(err))
}


//const [savedMoviesList, setSavedMoviesList] = useState([]);
//   localStorage.getItem(`${currentUser.email} - savedMovies`) ?
//   localStorage.getItem(`${currentUser.email} - savedMovies`, savedMoviesList):
//   []   
// );

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
          // loggedIn={loggedIn}
           handleRegistration={handleRegistration}
          />
          ) : (
            <Redirect to='/' />
          )}
        </Route>
        <Route exact path="/signin">
           {!loggedIn ? (
              <Login  handleLogin={handleLogin}/> 
           ) : 
             ( <Redirect to="/" />
             )}
        </Route>

        <ProtectedRoute 
          path="/movies"
          component={Movies}
          loggedIn={loggedIn}
          // setIsLoading={setIsLoading}     
          onFilmLikeClick={handleFilmLike}
          onDeleteIconClick={handleDeleteIconClick}    
          savedMoviesList = {savedMoviesList}
        />
        <ProtectedRoute 
          path="/saved-movies"
          component={SavedMovies}
          loggedIn={loggedIn}          
          onDeleteIconClick={handleDeleteIconClick}    
          savedMoviesList = {savedMoviesList}
        />

        <ProtectedRoute 
           path="/profile"
           component={Profile}
           loggedIn={loggedIn}
        />
          
      
        <Route path="*">
          <NotFoundPage />
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
