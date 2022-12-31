import React, { useState, useEffect, useContext,}  from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

import {
  CurrentUserContext
} from '../../contexts/CurrentUserContext.js';

import "./SavedMovies.css";

import moviesApi from '../../utils/MoviesApi.js';

import { 
  filterMovies, // фильтрация фльмов по короткометражкам и строке поиска
} from '../../utils/utils.js';


function SavedMovies(
  loggedIn,
 // isLoading, 
  //handleFilmLikeClick,
  handleDeleteIconClick,
  savedMoviesList,
  ) {

// отфильтрованные фильмы (по чекбоксу короткометражек и строке поиска)
const [filteredMovies, setFilteredMovies] = useState([]); 

const [showShortMovies, setShowShortMovies] = useState(false); 
const [searchString, setSearchString] = useState(""); //строка поиска

const [displayMovies, setDisplayMovies] = useState(savedMoviesList); // фильмы, которые мы отобразим на странице

const currentUser = useContext(CurrentUserContext);


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


  // localStorage.setItem(`${currentUser.email} - searchString`, searchStringValue);
  // localStorage.setItem(`${currentUser.email} - showShortMovies`, showShortMovies);


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
if (localStorage.getItem(`${currentUser.email} - filtered_movies`)) {
  const movies = JSON.parse(
    localStorage.getItem(`${currentUser.email} - filtered_movies`)
  );
  setFilteredMovies(movies);    
}
}, [currentUser]);



  return (
    <main className="saved-movies">
      <SearchForm 
      // handleSearchFormSubmit={handleSearchFormSubmit}
      handleShowShortMovies={handleShowShortMovies}
      showShortMovies={showShortMovies}
      searchString={searchString}
      handleSearchStringChange={handleSearchStringChange}
      
      />
      {/* {isLoading && <Preloader />} */}  

      <MoviesCardList 
        moviesList={filteredMovies}
        // isLoading = {isLoading}     
        // onFilmLikeClick={onFilmLikeClick}   
        // onDeleteIconClick={onDeleteIconClick} 
        // savedMoviesList={savedMoviesList}
      />
    </main>
  );
}

export default SavedMovies;
