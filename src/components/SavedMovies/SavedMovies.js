import React, { useState, useEffect, useContext,}  from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

import {
  CurrentUserContext
} from '../../contexts/CurrentUserContext.js';

import "./SavedMovies.css";

// import moviesApi from '../../utils/MoviesApi.js';

import { 
  filterMovies, // фильтрация фльмов по короткометражкам и строке поиска
} from '../../utils/utils.js';


function SavedMovies({
  loggedIn,
  onDeleteIconClick,
  savedMoviesList,
}) {


  const currentUser = useContext(CurrentUserContext);

  //состояние чек-бокса. Если сохранено - берем из локального хранилища
  const [showShortMovies, setShowShortMovies] = useState(false);
  //   localStorage.getItem(`${currentUser.email} - showShortMovies`) ?
  //   localStorage.getItem(`${currentUser.email} - showShortMovies`) : false
  // ); 

  // //строка поиска. Если сохранена - берем из локального хранилища
  // const [searchString, setSearchString] = useState(
  //   localStorage.getItem(`${currentUser.email} - searchString`) ?
  //   localStorage.getItem(`${currentUser.email} - searchString`) : 
  //   ''); 
  
  const [searchString, setSearchString] = useState('');


// отфильтрованные сохраненные фильмы (по чекбоксу короткометражек и строке поиска)
const [filteredMovies, setFilteredMovies] = useState(
  (savedMoviesList.length > 0) ? 
  filterMovies(savedMoviesList, searchString, showShortMovies)
  :[]); 

// фильмы, которые мы отобразим на странице
const [displayMovies, setDisplayMovies] = useState(filteredMovies); 


console.log('внутри SavedMovies');
console.log('savedMoviesList');
console.log(savedMoviesList);


//изменение состояния чекбокса
function handleShowShortMovies() {
  setShowShortMovies(!showShortMovies);   
  localStorage.setItem(`${currentUser.email} - showShortMovies`, showShortMovies);
  setDisplayMovies(filterMovies(filteredMovies));
}

//изменение записи в строке поиска
function handleSearchStringChange(value) {   
  console.log(value);
  setSearchString(value); 
}

// поиск по массиву и установка состояния
function handleFilterMovies(movies, searchString, showShortMovies) {

  console.log('внутри handleFilterMovies');
  console.log('movies');
  console.log(movies);
  console.log('searchString');
  console.log(searchString);
  console.log('showShortMovies');
  console.log(showShortMovies);


  //фильтруем фильмы по короткометражкам и строке 
  const moviesList = filterMovies(savedMoviesList, searchString, showShortMovies);

  console.log('moviesList - после фильтрации');
  console.log(moviesList);


  if (moviesList.length === 0) {
        //если не нашли фильмов - отображаем ошибку    
  } 

  setFilteredMovies(moviesList);
  setDisplayMovies(moviesList);
    
}


function handleSearchFormSubmit(searchStringValue){

  //сохраняем текущие значения строки поиска и положение чек-бокса 
  localStorage.setItem(`${currentUser.email} - searchString`, searchStringValue);
  localStorage.setItem(`${currentUser.email} - showShortMovies`, showShortMovies);


  // console.log('выводим loggedIn');
  // console.log(loggedIn);


  console.log("handleSearchFormSubmit");

  //фильтруем фильмы по короткометражкам и строке 
  const moviesList = filterMovies(savedMoviesList, searchString, showShortMovies);


  // localStorage.setItem('SearchString', searchStringValue);
  // localStorage.setItem('showShortMovies', showShortMovies);
  if (moviesList.length === 0) {
    //отображаем ошибку
  } else {
    setFilteredMovies(moviesList);
    setDisplayMovies(moviesList);
  }    
}

// извлекаем состояние чекбокса короткометражек из локального хранилища для текущего пользователя
useEffect(() => {
  if (localStorage.getItem(`${currentUser.email} - showShortMovies`) === 'true') {
    setShowShortMovies(true);
  } else {
    setShowShortMovies(false);
  }
}, [currentUser]);


// извлекаем список выбранных фильмов из локального хранилища для текущего пользователя
useEffect(() => {
if (localStorage.getItem(`${currentUser.email}  - savedMovies`)) {
  const movies = JSON.parse(
    localStorage.getItem(`${currentUser.email}  - savedMovies`)
  );
  setDisplayMovies(movies);
  setFilteredMovies(movies);    
}
}, [currentUser]);


// обновление списка фильмов после удаления из сохраненных
useEffect(() => {
    
  const moviesList = filterMovies(savedMoviesList, searchString, showShortMovies);


  // localStorage.setItem('SearchString', searchStringValue);
  // localStorage.setItem('showShortMovies', showShortMovies);
  if (moviesList.length === 0) {
    //отображаем ошибку
  } else {
    setFilteredMovies(moviesList);
    setDisplayMovies(moviesList);
  }    

     //setDisplayMovies(movies);  
  
  }, [savedMoviesList.length]);
  


// // извлекаем список выбранных фильмов из локального хранилища для текущего пользователя
// useEffect(() => {
// if (localStorage.getItem(`${currentUser.email} - filtered_movies`)) {
//   const movies = JSON.parse(
//     localStorage.getItem(`${currentUser.email} - filtered_movies`)
//   );
//   setFilteredMovies(movies);    
// }
// }, [currentUser]);



  return (
    <main className="saved-movies">
      <SearchForm 
      handleSearchFormSubmit={handleSearchFormSubmit}
      handleShowShortMovies={handleShowShortMovies}
      showShortMovies={showShortMovies}
      searchString={searchString}
      handleSearchStringChange={handleSearchStringChange}
      
      />
      {/* {isLoading && <Preloader />} */}  

      <MoviesCardList 
        moviesList={displayMovies}
        // isLoading = {isLoading}     
        // onFilmLikeClick={onFilmLikeClick}   
        onDeleteIconClick={onDeleteIconClick} 
        savedMoviesList={savedMoviesList}
      />
    </main>
  );
}

export default SavedMovies;
