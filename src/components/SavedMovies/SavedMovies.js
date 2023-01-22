import React, { useState, useEffect, useContext } from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchErrorMessage from "../SearchErrorMessage/SearchErrorMessage";

import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

import "./SavedMovies.css";

import {
  filterMovies, // фильтрация фльмов по короткометражкам и строке поиска
} from "../../utils/utils.js";

import { ERROR_MESSAGES, NOT_FOUND_MESSAGE } from "../../utils/constants.js";

function SavedMovies({ 
  loggedIn, 
  onDeleteIconClick, 
  savedMoviesList,
  showShortMoviesSaved,
  setShowShortMoviesSaved,
  searchStringSaved,
  setSearchStringSaved}) {
  const currentUser = useContext(CurrentUserContext);

  // отфильтрованные сохраненные фильмы (по чекбоксу короткометражек и строке поиска)
  const [filteredMovies, setFilteredMovies] = useState([]);

  // фильмы, которые мы отобразим на странице
  const [displayMovies, setDisplayMovies] = useState(filteredMovies);

  const [searchErrorSavedMovies, setSearchErrorSavedMovies] = useState(false);
  const [searchErrorMessageSavedMovies, setSearchErrorMessageSavedMovies] = useState(
    ERROR_MESSAGES["NEED_KEYWORD"]
  );

  const [searchButtonSavedMoviesEnabled, setSearchButtonSavedMoviesState] = useState(false);

  //изменение состояния чекбокса
  function handleShowShortMovies() {
    setShowShortMoviesSaved(!showShortMoviesSaved);

    if (!searchStringSaved) {
      setSearchErrorSavedMovies(true);
      setSearchErrorMessageSavedMovies(ERROR_MESSAGES["NEED_KEYWORD"]);
      return;
    }
    setDisplayMovies(
      filterMovies(savedMoviesList, searchStringSaved, showShortMoviesSaved, true)
    );
  }

  //изменение записи в строке поиска
  function handleSearchStringChange(value) {
    setSearchStringSaved(value);
    if (!value) {
      setSearchErrorSavedMovies(true);
      setSearchErrorMessageSavedMovies(ERROR_MESSAGES["NEED_KEYWORD"]);      
      setSearchButtonSavedMoviesState(false);
      return;
    } 
    else {
      setSearchErrorSavedMovies(false);
      setSearchButtonSavedMoviesState(true);
    }
  }

  function handleSearchFormSubmit(searchStringValue, showShortMoviesValue) {
  
    if (!searchStringValue) {
      setSearchErrorSavedMovies(true);
      setSearchErrorMessageSavedMovies(ERROR_MESSAGES["NEED_KEYWORD"]);
      return;
    }

    //сохраняем текущие значения строки поиска и положение чек-бокса
    localStorage.setItem(
      `${currentUser.email} - searchStringSaved`,
      searchStringValue
    );
    localStorage.setItem(
      `${currentUser.email} - showShortMoviesSaved`,
      showShortMoviesValue
    );
 
    //фильтруем фильмы по короткометражкам и строке
    const moviesList = filterMovies(
      savedMoviesList,
      searchStringValue,
      showShortMoviesValue,
      true
    );

    if (moviesList.length === 0) {
      //отображаем ошибку
      setSearchErrorSavedMovies(true);
      setSearchErrorMessageSavedMovies(NOT_FOUND_MESSAGE);
    } else {
      setSearchErrorSavedMovies(false);
    }
    setFilteredMovies(moviesList);
    setDisplayMovies(moviesList);
  }
    
  // обновление списка фильмов после удаления из сохраненных
  useEffect(() => {
    const moviesList = filterMovies(
      savedMoviesList,
      searchStringSaved,
      showShortMoviesSaved,
      true
    );

    if (moviesList.length === 0) {
      //отображаем ошибку
      setSearchErrorSavedMovies(true);
      setSearchErrorMessageSavedMovies(NOT_FOUND_MESSAGE);
    } else {
      setSearchErrorSavedMovies(false);
    }
    setFilteredMovies(moviesList);
    setDisplayMovies(moviesList);
  }, [savedMoviesList.length]);


  //отображение ошибки если строка поиска пустая
  useEffect(() => {
    if (!searchStringSaved) {
      setSearchErrorSavedMovies(true);
      setSearchErrorMessageSavedMovies(ERROR_MESSAGES["NEED_KEYWORD"]);
      setSearchButtonSavedMoviesState(false);
      return;
    } else {
      setSearchErrorSavedMovies(false);
      setSearchButtonSavedMoviesState(true);
    }
  }, []);

  return (
    <main className="saved-movies">
      <SearchForm
        handleSearchFormSubmit={handleSearchFormSubmit}
        handleShowShortMovies={handleShowShortMovies}
        showShortMovies={showShortMoviesSaved}
        searchString={searchStringSaved}
        handleSearchStringChange={handleSearchStringChange}
        searchButtonEnabled={searchButtonSavedMoviesEnabled}
      />
      {searchErrorSavedMovies && (
        <SearchErrorMessage searchErrorMessage={searchErrorMessageSavedMovies} />
      )}
      <MoviesCardList
        moviesList={displayMovies}
        onDeleteIconClick={onDeleteIconClick}
        savedMoviesList={savedMoviesList}
      />
    </main>
  );
}

export default SavedMovies;
