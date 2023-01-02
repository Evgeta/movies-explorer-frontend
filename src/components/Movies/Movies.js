import React, { useState, useEffect, useContext,}  from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchErrorMessage from "../SearchErrorMessage/SearchErrorMessage";

import {
  CurrentUserContext
} from '../../contexts/CurrentUserContext.js';

import "./Movies.css";

import moviesApi from '../../utils/MoviesApi.js';


import { 
  filterMovies, // фильтрация фльмов по короткометражкам и строке поиска
} from '../../utils/utils.js';

import { 
  NOT_FOUND_MESSAGE,
  ERROR_DURING_REQUEST_MESSAGE
}  from '../../utils/constants.js';

function Movies({
  loggedIn,  
  onFilmLikeClick, 
  onDeleteIconClick,
  savedMoviesList,
  }) {

  // const [isLoading, setIsLoading] = useState(false); //состояние прелоадера

//фильмы, которые пришли через запрос на публичный сервер
const [publicServerMovies, setPublicServerMovies] = useState([]);
  
// отфильтрованные фильмы (по чекбоксу короткометражек и строке поиска)
const [filteredMovies, setFilteredMovies] = useState([]); 
 

const [showShortMovies, setShowShortMovies] = useState(false); 
const [searchString, setSearchString] = useState(""); //строка поиска

const currentUser = useContext(CurrentUserContext);

console.log('savedMoviesList - in Movies');
console.log(savedMoviesList);


const [isLoading, setIsLoading] = useState(false); 

const [searchError, setSearchError] = useState(false); 
const [searchErrorMessage, setSearchErrorMessage] = useState(NOT_FOUND_MESSAGE); 

  //изменение состояния чекбокса
  function handleShowShortMovies() {
    setShowShortMovies(!showShortMovies);    
    localStorage.setItem(`${currentUser.email} - showShortMovies`, showShortMovies);
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
  const moviesList = filterMovies(movies, searchString, showShortMovies);

  console.log('moviesList - после фильтрации');
  console.log(moviesList);


  if (moviesList.length === 0) {
        //если не нашли фильмов - отображаем ошибку    
        console.log('Ошибка - не найдено');
        setSearchError(true); 
        console.log('searchError');
        console.log(searchError);
        setSearchErrorMessage(NOT_FOUND_MESSAGE); 
        console.log('searchErrorMessage');
        console.log(searchErrorMessage);
        console.log('searchError');
        console.log(searchError);
  } 
  else
  {
    setSearchError(false); 
  }

  setFilteredMovies(moviesList);

  //сохранаяем отфильтрованные фильмы в локальном хранилище
  localStorage.setItem(
      `${currentUser.email} - filtered_movies`,
      JSON.stringify(moviesList)
    );
}

  function handleSearchFormSubmit(searchStringValue){


    localStorage.setItem(`${currentUser.email} - searchString`, searchStringValue);
    localStorage.setItem(`${currentUser.email} - showShortMovies`, showShortMovies);


    console.log('выводим loggedIn');
    console.log(loggedIn);


    console.log("handleSearchFormSubmit");

    // localStorage.setItem('SearchString', searchStringValue);
    // localStorage.setItem('showShortMovies', showShortMovies);

    if (publicServerMovies.length === 0) {

    setIsLoading(true);
    moviesApi.getMovies()
    .then(movies => {
      setPublicServerMovies(movies)
      console.log(publicServerMovies);
      
      localStorage.setItem(
        'movies-from-public-server',
        JSON.stringify(movies)
      );

      console.log('перед фильтрацией');
      console.log('movies');
      console.log(movies);
      console.log('searchString');
      console.log(searchString);
      console.log('showShortMovies');
      console.log(showShortMovies);

      handleFilterMovies(
         movies,
         searchString, 
         showShortMovies); 
    })

    .catch((err) => {
      console.log(`Ошибка: ${err.status}`)
    })
    .finally(
         setIsLoading(false)
      );
    }   
}
 
// нужно ли сохранять фильмы с общего хранилища?
  useEffect(() => {
    if (localStorage.getItem('movies-from-public-server')) {
      const movies = JSON.parse(
        localStorage.getItem('movies-from-public-server')
      );      
    }
  }
  );

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
    <main className="movies">
      <SearchForm 
        handleSearchFormSubmit={handleSearchFormSubmit}
        handleShowShortMovies={handleShowShortMovies}
        showShortMovies={showShortMovies}
        searchString={searchString}
        handleSearchStringChange={handleSearchStringChange}
      />

       {searchError && 
        <SearchErrorMessage
          searchErrorMessage={searchErrorMessage}
        />
       } 

      {isLoading && <Preloader />}  
      <MoviesCardList 
        moviesList={filteredMovies}
        // isLoading = {isLoading}     
        onFilmLikeClick={onFilmLikeClick}   
        onDeleteIconClick={onDeleteIconClick} 
        savedMoviesList={savedMoviesList}
      />
    </main>
  );
}

export default Movies;
