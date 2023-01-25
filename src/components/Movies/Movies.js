import React, { useState, useEffect, useContext } from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchErrorMessage from "../SearchErrorMessage/SearchErrorMessage";

import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

import "./Movies.css";

import moviesApi from "../../utils/MoviesApi.js";

import {
  filterMovies, // фильтрация фльмов по короткометражкам и строке поиска
} from "../../utils/utils.js";

import { ERROR_MESSAGES, NOT_FOUND_MESSAGE } from "../../utils/constants.js";

function Movies({
  loggedIn,
  setIsLoading,
  isLoading,
  onFilmLikeClick,
  onDeleteIconClick,
  savedMoviesList,
  showShortMovies,
  setShowShortMovies,
  searchString,
  setSearchString
}) {
  
  //фильмы, которые пришли через запрос на публичный сервер
  const [publicServerMovies, setPublicServerMovies] = useState([]);

  // отфильтрованные фильмы (по чекбоксу короткометражек и строке поиска)
  const [filteredMovies, setFilteredMovies] = useState([]);

  const currentUser = useContext(CurrentUserContext);
      
  const [searchError, setSearchError] = useState(true);
  const [searchErrorMessage, setSearchErrorMessage] = useState(ERROR_MESSAGES["NEED_KEYWORD"]);

  const [searchButtonEnabled, setSearchButtonState] = useState(false);
  
  //изменение состояния чекбокса
  function handleShowShortMovies() {
    setShowShortMovies(!showShortMovies);    
  }

  //изменение записи в строке поиска
  function handleSearchStringChange(value) {

     setSearchString(value);
     if (!value) {
      setSearchError(true);
      setSearchErrorMessage(ERROR_MESSAGES["NEED_KEYWORD"]);      
      setSearchButtonState(false);
      return;
    } 
    else {
      setSearchError(false);
      setSearchButtonState(true);
    }
  }

  // поиск по массиву и установка состояния
  function handleFilterMovies(movies, searchString, showShortMovies) {
    //фильтруем фильмы по короткометражкам и строке
    const moviesList = filterMovies(movies, searchString, showShortMovies, false) ;

      if (moviesList.length === 0) {
      //если не нашли фильмов - отображаем ошибку
      setSearchError(true);
      setSearchErrorMessage(NOT_FOUND_MESSAGE);
    } else {
      setSearchError(false);
    }
    setFilteredMovies(moviesList);

    //сохранаяем отфильтрованные фильмы в локальном хранилище
    localStorage.setItem(
      'filtered_movies',
      JSON.stringify(moviesList)
    );
  }

  function handleSearchFormSubmit(searchStringValue) {

    setFilteredMovies([]);

    if (!searchStringValue) {
      setSearchError(true);
      setSearchErrorMessage(ERROR_MESSAGES["NEED_KEYWORD"]);      
      return;
    }

    //сохряняем состояния чекбокса и строки поиска
    localStorage.setItem(
      'moviesSearchStringPublic',
      searchStringValue
    );
    localStorage.setItem(
      'showShortMoviesPublic',
      showShortMovies
    );
    
    if (publicServerMovies.length === 0) {
      setIsLoading(true);
      moviesApi
        .getMovies()
        .then((movies) => {
          setPublicServerMovies(movies);
          handleFilterMovies(movies, searchStringValue, showShortMovies);          
          localStorage.setItem(
            "movies-from-public-server",
            JSON.stringify(movies)
          );
        })
        .catch(() => {
          setSearchError(true);
          setSearchErrorMessage(ERROR_MESSAGES["ERROR_DURING_REQUEST"]);
        })
        .finally(setIsLoading(false));    
      }
     else{
      handleFilterMovies(publicServerMovies, searchStringValue, showShortMovies);
     }   
  }

// данные по фильмам из общего хранилища, сохраненные в local storage
useEffect(() => {
  if (localStorage.getItem("movies-from-public-server")) {
    const movies = JSON.parse(
      localStorage.getItem("movies-from-public-server")
    );
    setPublicServerMovies(movies);
  }  
}, [currentUser]);

  useEffect(() => {
    if (!searchString) {
      setSearchError(true);
      setSearchErrorMessage(ERROR_MESSAGES["NEED_KEYWORD"]);
      setSearchButtonState(false);
      return;
    } else {
      setSearchError(false);
      setSearchButtonState(true);
    }
  }, []);

  // извлекаем список выбранных фильмов из локального хранилища для текущего пользователя
  useEffect(() => {
    if (localStorage.getItem('filtered_movies')) {
      const movies = JSON.parse(
        localStorage.getItem('filtered_movies')
      );
      handleFilterMovies(movies, searchString, showShortMovies);           
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
        searchButtonEnabled={searchButtonEnabled}        
      />

      {searchError && (
        <SearchErrorMessage searchErrorMessage={searchErrorMessage} />
      )}

      {isLoading && <Preloader />}
      <MoviesCardList
        moviesList={filteredMovies}        
        onFilmLikeClick={onFilmLikeClick}
        onDeleteIconClick={onDeleteIconClick}
        savedMoviesList={savedMoviesList}
      />
    </main>
  );
}

export default Movies;
