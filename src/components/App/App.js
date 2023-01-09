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
} from '../../contexts/CurrentUserContext';

import { headerShowRoutes, footerShowRoutes, ERROR_MESSAGES } from "../../utils/constants.js";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';


function App() {

  const history = useHistory();
  
  //const [loggedIn, setLoggedIn] = useState(true);  //имитация того, что пользователь не прошел аутентификацию
  const [loggedIn, setLoggedIn] = useState(false); 
  

  //const currentUser = useContext(CurrentUserContext); 
  
  const [currentUser, setCurrentUser] = useState({});
    // {_id: '', 
    //  name: '',
    //  email: ''});
  

  const [isBurgerMenuOpened, setIsBurgerOpened] = useState(false); //контроль состояния окна бургер-меню

  const [isLoading, setIsLoading] = useState(false); 


  // const [isRegisterError, setRegisterError] = useState(false); 

  //массив для сохранения фильмов
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  //   localStorage.getItem(`${currentUser.email} - savedMovies`) ?
  //   JSON.parse(localStorage.getItem(`${currentUser.email} - savedMovies`, savedMoviesList)) :
  //   []   
  // );

  const [formErrorMessage, setFormErrorMessage] = React.useState('');

  // нажатие на иконку бургер-меню
  function handleBurgerMenuClick() {
    setIsBurgerOpened(!isBurgerMenuOpened);
  }

  function handleRegistration(username, password, email) {
    setIsLoading(true);
    console.log(username, email, password);
    mainApi.register(username, email, password,).then(
      (res) => {
         if (res._id) {
           handleLogin(email, password);
           setFormErrorMessage('');
           history.push("/sign-in");
        }
      })
      .catch((err) => {

        console.log('err внутри handleRegistration');
        console.log(err);
        handleErrorMessage(err) ;

        })
       .finally(() => setIsLoading(false));
      }
  

    function handleLogin(email, password) {
      console.log(email, password);
      mainApi.authorize(email, password)
     .then ((data) => {
          // console.log('выводим data');
          // console.log(data);
          localStorage.setItem("jwt", data.token);
          // console.log('выводим loggedIn');
          // console.log(loggedIn);

          setLoggedIn(true);
          setFormErrorMessage('');

          // console.log('выводим loggedIn');
          // console.log(loggedIn);

          history.push('/movies');          
                    
         })
        .catch((err) => {
          
          console.log('err внутри handleLogin');
          console.log(err);
          handleErrorMessage(err) ;

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
          console.log('res - внутри проверки тоекена при монтировании');
          console.log(res);                  
          console.log(res._id);                  
          console.log(res.name);                  
          console.log(res.email);                  

          setCurrentUser({_id:res._id, name:res.name, email:res.email}); 
          console.log('currentUser после присвоения res');
          console.log(currentUser);                  
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
    .catch(err => {console.log(err);
                    handleErrorMessage(err)})

    console.log('savedMoviesList внутри handleFilmLike');
    console.log(savedMoviesList);

    localStorage.setItem(`${currentUser.email} - savedMovies`, savedMoviesList);    
  }

// нажатие на иконку удаления
function handleDeleteIconClick(movie, fromSaved) {
  
  console.log('внутри handleDeleteIconClick');

  console.log('movie');
  console.log(movie);

  
  // const movieToDelete = savedMoviesList.find(
   
  //   (item) => {
  //     console.log('item');
  //     console.log(item);
   
      
  //     // return item.movie.movieId === movie.id || item.movie.movieId === movie.movieId}
  //     return item.movie.movieId === movie.movie.movieId || item.movie.movieId === movie.movieId}
  // );

  // console.log('movieToDelete');

  // console.log(movieToDelete);
  //console.log(movieToDelete.movie._id);
  // ?console.log(movieToDelete._id);
    

  console.log('fromSaved');
  console.log(fromSaved);
  //console.log(movieToDelete.movie.movieId);

  let idToDeleteOnServer = 0;  
  let idToDeleteOnLocalArray = 0;  

  if(fromSaved) 
  {
    const movieToDelete = savedMoviesList.find(
      (item) => {
       console.log('item');
       console.log(item);
       return item.movie.movieId === movie.movie.movieId || item.movie.movieId === movie.movieId}
 );
    console.log('movieToDelete');
    console.log(movieToDelete);
    
    idToDeleteOnServer = movieToDelete.movie._id; 
    console.log('idToDeleteOnServer - from saved');
    console.log(idToDeleteOnServer);
    idToDeleteOnLocalArray = movieToDelete.movie.movieId;  
    console.log('idToDeleteLocalArray - from saved');
    console.log(idToDeleteOnLocalArray);
    
  }
  else 
  { 
    const movieToDelete = savedMoviesList.find(
         (item) => {
          console.log('item');
          console.log(item);
          return item.movie.movieId === movie.id || item.movie.movieId === movie.movieId}
    );
    console.log('movieToDelete');
    console.log(movieToDelete);
    idToDeleteOnServer = movieToDelete.movie._id;   
    console.log('idToDeleteOnServer - from not-saved');
    console.log(idToDeleteOnServer);
    idToDeleteOnLocalArray = movieToDelete.movie.movieId;  
    console.log('idToDeleteLocalArray - from not-saved');
    console.log(idToDeleteOnLocalArray);
  }

  mainApi
    .deleteMovie(idToDeleteOnServer)
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

          console.log('item.movie._id');
          console.log(item.movie._id);
          


          if (

            //idToDeleteOnLocalArray === item.movie.movieId     //работает

            idToDeleteOnServer === item.movie._id

            // movie.id === item.movie.movieId 
            //             || 
            // movie.movieId === item.movie.movieId

            ) {
            return false;
          } else {
            return true;
          }
        })
        );

        console.log('savedMoviesList');
        console.log(savedMoviesList);
           
        localStorage.setItem(`${currentUser.email} - savedMovies`, savedMoviesList);    
    })
    .catch(err => { console.log(err);
                    handleErrorMessage(err)})
}


//получение информации о пользователе с сервера 

useEffect(() => {
  console.log('loggedIn - внутри useEffect');
  console.log(loggedIn);
  if (loggedIn) {
    setIsLoading(true);
    mainApi
      .getUserInfo()
      .then(res => 
        {
          console.log('res');
          console.log(res);          
          setCurrentUser(res)
          console.log('currentUser');
          console.log(currentUser);
                    
        })
      .catch(err =>
          {
          
          console.log(err);
          handleErrorMessage(err)}
          
          )
      .finally(() => setIsLoading(false));
  
      console.log(currentUser);
    }
}, [loggedIn]);


function handleUpdateProfile (name, email) {
  setIsLoading(true);
  console.log('name, email внутри handleUpdateProfile');
  console.log(name, email);
  mainApi
    .setUserInfo( name, email )
    .then(newUser => {
      console.log(newUser);
      console.log(newUser.data);
      setCurrentUser(newUser.data);    
      setFormErrorMessage('');  
    })
    .catch(err => {console.log(err);
          handleErrorMessage(err)} )
    .finally(() => setIsLoading(false));
}


function handleLogOut() {
  setCurrentUser({});
  setLoggedIn(false);
  localStorage.clear();
  history.push('/');
}


function handleErrorMessage(err) {
  console.log('err in handleErrorMessage');
  console.log(err);
  console.log(err.status);
  if (err.status!=200) { setFormErrorMessage(ERROR_MESSAGES[err.status])
}

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
           formErrorMessage={formErrorMessage}
          />
           ) : (
            <Redirect to='/' />
          )} 
        </Route>
        <Route exact path="/signin">
           {!loggedIn ? (
              <Login 
                 handleLogin={handleLogin}
                 formErrorMessage={formErrorMessage}
                 /> 
             ) : 
             ( <Redirect to="/" />
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
          savedMoviesList = {savedMoviesList}
        />

        <ProtectedRoute 
          path="/saved-movies"
          component={SavedMovies}
          loggedIn={loggedIn}          
          onDeleteIconClick={handleDeleteIconClick}    
          savedMoviesList = {savedMoviesList}
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
