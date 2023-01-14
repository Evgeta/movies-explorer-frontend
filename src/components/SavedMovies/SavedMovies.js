import React, { useState, useEffect, useContext,}  from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

import {
  CurrentUserContext
} from '../../contexts/CurrentUserContext.js';

import { useHistory, useLocation } from "react-router-dom";

import "./SavedMovies.css";

// import moviesApi from '../../utils/MoviesApi.js';

import { 
  filterMovies, // фильтрация фльмов по короткометражкам и строке поиска
} from '../../utils/utils.js';


import { 
  ERROR_MESSAGES,
  NOT_FOUND_MESSAGE,
  ERROR_DURING_REQUEST_MESSAGE
}  from '../../utils/constants.js';

function SavedMovies({
  loggedIn,
  onDeleteIconClick,
  savedMoviesList,
}) {


  const currentUser = useContext(CurrentUserContext);

  const history = useHistory();

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

  const [searchError, setSearchError] = useState(false); 
  const [searchErrorMessage, setSearchErrorMessage] = useState('NOT_FOUND_MESSAGE'); 


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
// function handleFilterMovies(movies, searchString, showShortMovies) {

//   console.log('внутри handleFilterMovies');
//   console.log('movies');
//   console.log(movies);
//   console.log('searchString');
//   console.log(searchString);
//   console.log('showShortMovies');
//   console.log(showShortMovies);


//   //фильтруем фильмы по короткометражкам и строке 
//   const moviesList = filterMovies(savedMoviesList, searchString, showShortMovies);

//   console.log('moviesList - после фильтрации');
//   console.log(moviesList);


//   if (moviesList.length === 0) {
//         //если не нашли фильмов - отображаем ошибку    
//   } 

//   setFilteredMovies(moviesList);
//   setDisplayMovies(moviesList);
    
// }


function handleSearchFormSubmit(searchStringValue){

  //сохраняем текущие значения строки поиска и положение чек-бокса 
  localStorage.setItem(`${currentUser.email} - searchStringSaved`, searchStringValue);
  localStorage.setItem(`${currentUser.email} - showShortMoviesSaved`, showShortMovies);


  // console.log('выводим loggedIn');
  // console.log(loggedIn);


  console.log("handleSearchFormSubmit");

  //фильтруем фильмы по короткометражкам и строке 
  const moviesList = filterMovies(savedMoviesList, searchString, showShortMovies);


  // localStorage.setItem('SearchString', searchStringValue);
  // localStorage.setItem('showShortMovies', showShortMovies);
  if (moviesList.length === 0) {
    //отображаем ошибку
    console.log('Ошибка - не найдено');
    setSearchError(true); 
    console.log('searchError');
    console.log(searchError);
    setSearchErrorMessage(NOT_FOUND_MESSAGE); 
    console.log('searchErrorMessage');
    console.log(searchErrorMessage);
    console.log('searchError');
    console.log(searchError);


  } else {
    setSearchError(false); 
  }    

  setFilteredMovies(moviesList);
  setDisplayMovies(moviesList);
}

// извлекаем состояние чекбокса короткометражек из локального хранилища для текущего пользователя
useEffect(() => {
  if (localStorage.getItem(`${currentUser.email} - showShortMoviesSaved`) === 'true') {
    setShowShortMovies(true);
  } else {
    setShowShortMovies(false);
  }
}, [currentUser]);

// извлекаем значение строки поиска из локального хранилища для текущего пользователя
useEffect(() => {
  if (localStorage.getItem(`${currentUser.email} - moviesSearchStringSaved`) === 'true') {
    setSearchString(localStorage.getItem(`${currentUser.email} - moviesSearchStringSaved`)); 
  } else {
    setSearchString('');
  }
}, [currentUser, history]);

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
        console.log('Ошибка - не найдено');
        setSearchError(true); 
        console.log('searchError');
        console.log(searchError);
        setSearchErrorMessage(NOT_FOUND_MESSAGE); 
        console.log('searchErrorMessage');
        console.log(searchErrorMessage);
        console.log('searchError');
        console.log(searchError);


  } else {
    setSearchError(false); 
    
  }    
    setFilteredMovies(moviesList);
    setDisplayMovies(moviesList);  
  
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
