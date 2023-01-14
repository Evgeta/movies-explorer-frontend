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
           history.push("/movies");
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
}, []);



// получение сохраненных фильмов из локального хранилища, в случае отсутствия - загрузка
//с сервера при монтировании приложения

// - не работает
// useEffect(() => {
//   if (loggedIn && currentUser) {
    
//   if (localStorage.getItem(`${currentUser.email}  - savedMovies`)) {
//     const movies = JSON.parse(
//       localStorage.getItem(`${currentUser.email}  - savedMovies`)      
      
//     );
//     console.log('фильмы есть в локальнм хранилище');
//     console.log(movies);
//     setSavedMoviesList(movies);}
//     else 
//     {
//     console.log('фильмов нет в локальнм хранилище');  
//     getSavedMovies(); 
//     }
//   }
// }, [currentUser, loggedIn]);


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
       return item.movie.movieId === movie.movie.movieId 
      // || item.movie.movieId === movie.movieId
      }
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

      const newMoviesList =  savedMoviesList.filter(item => {

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
      });

      setSavedMoviesList( newMoviesList
        // newMoviesList
        // savedMoviesList.filter(item => {

        //   console.log('item.movie.movieId');
        //   console.log(item.movie.movieId);

        //   console.log('item.movie._id');
        //   console.log(item.movie._id);
          


        //   if (

        //     //idToDeleteOnLocalArray === item.movie.movieId     //работает

        //     idToDeleteOnServer === item.movie._id

        //     // movie.id === item.movie.movieId 
        //     //             || 
        //     // movie.movieId === item.movie.movieId

        //     ) {
        //     return false;
        //   } else {
        //     return true;
        //   }
        // })
        );

        console.log('savedMoviesList - после удаления фильма');
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
          //получаем сохраненные пользователем фильмы
         // getSavedMovies();                    
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
  if (err.status!==200) { setFormErrorMessage(ERROR_MESSAGES[err.status])
}

}

useEffect(() => {
  if (loggedIn && currentUser) {
    console.log("перед запуском getSavedMovies() после проверки loggedIn && currentUser");
    console.log(currentUser);
    getSavedMovies();
  }
}, [currentUser, loggedIn]);


// получение сохраненных фильмоы с сервера и сохранение их в локальном хранилище

function getSavedMovies() {

  console.log('внутри getSavedMovies');

  if (loggedIn && currentUser) {
    
  if (localStorage.getItem(`${currentUser.email}  - savedMovies`)) {
    const movies = JSON.parse(
      localStorage.getItem(`${currentUser.email}  - savedMovies`)      
      
    );
    console.log('фильмы есть в локальнм хранилище');
    console.log(movies);
    setSavedMoviesList(movies);}
    else 
    {
    console.log('фильмов нет в локальнм хранилище');  
    
    mainApi
    .getSavedMovies()
    .then(data => {
      console.log('data - внутри getSavedMovies, которые пришли с севера');
      console.log(data);
      console.log('currentUser._id - внутри getSavedMovies currentUser._id');
      console.log(currentUser._id);
      console.log(currentUser);

      const movies = data.movies;
      console.log('movies - внутри getSavedMovies, которые пришли с севера');
      console.log(movies);
   
      
      const currentUserMoviesList = movies.filter(movie => {
        console.log('movie.owner');            
        console.log(movie.owner);            
        console.log('currentUser._id');            
        console.log(currentUser._id);            
        
          if(movie.owner === currentUser._id) return true;
          else return false;
      });
      console.log('currentUserMoviesList');
      console.log(currentUserMoviesList);
  
    // console.log(JSON.stringify(currentUserMoviesList));

    //   console.log(`{movies: ${JSON.stringify(currentUserMoviesList)}}`);
      
      
      // const compatibleMovies = JSON.parse(`{movies: {${JSON.stringify(currentUserMoviesList)}}}`);

      const compatibleMovies = currentUserMoviesList.map(item => 
         {


          // JSON.parse(`{movies: {${JSON.stringify(item)}}}`);

        //   console.log(item);

          // const stringItem = JSON.stringify(item);
          // console.log(stringItem);

          // const newItem =
          
    // const item2 =  {movies: item};
    //  console.log(item2);
            return  {movie: item};

           //JSON.parse(`{movies: {${JSON.stringify(item)}}}`);
          // console.log(newItem);

          // item = newItem;


        //JSON.parse(`{movies: {${JSON.stringify(item)}}}`);
          // console.log(newItem);



        }          
      )




      console.log('compatibleMovies');
      console.log(compatibleMovies);

      //  const compatibleMovies = JSON.parse 
       
      //  currentUserMoviesList.map(item => 
      
      
      //   JSON.stringify(
      //     {"movie":
      //     {
      //     movieId: data.id,  
      //     nameRU: data.nameRU,
      //     nameEN: data.nameEN,
      //     director: data.director,
      //     country: data.country,
      //     year: data.year,  
      //     duration: data.duration,
      //     description: data.description,
      //     trailerLink: data.trailerLink,
      //     thumbnail: thumbnail,
      //     image: image}
      //   }
      //   );    
      setSavedMoviesList(compatibleMovies);

      //setSavedMoviesList(currentUserMoviesList);
      //movies.forEach(movie => {
       //  console.log(movie);
            
       // }
       // );
    }
            
      )
    .catch(err => {console.log(err);
                    handleErrorMessage(err)})

    console.log('savedMoviesList внутри getSavedMovies');
    console.log(savedMoviesList);

    localStorage.setItem(`${currentUser.email} - savedMovies`, savedMoviesList);    
  }
  }



  
  }


  // кнопка назад 
  function handleGoBack() {
    history.goBack();
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
          <NotFoundPage handleGoBack={handleGoBack}/>
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
