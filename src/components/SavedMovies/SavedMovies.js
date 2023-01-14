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
  onDeleteIconClick, savedMoviesList }) {
  const currentUser = useContext(CurrentUserContext);
  
  //состояние чек-бокса. Если сохранено - берем из локального хранилища
  const [showShortMovies, setShowShortMovies] = useState(false);
  const [searchString, setSearchString] = useState("");

  // отфильтрованные сохраненные фильмы (по чекбоксу короткометражек и строке поиска)
  const [filteredMovies, setFilteredMovies] = useState([]);

  // фильмы, которые мы отобразим на странице
  const [displayMovies, setDisplayMovies] = useState(filteredMovies);

  const [searchError, setSearchError] = useState(false);
  const [searchErrorMessage, setSearchErrorMessage] = useState(
    NOT_FOUND_MESSAGE
  );

  //изменение состояния чекбокса
  function handleShowShortMovies() {
    setShowShortMovies(!showShortMovies);
    localStorage.setItem(
      `${currentUser.email} - showShortMovies`,
      showShortMovies
    );

    if (!searchString) {
      setSearchError(true);
      setSearchErrorMessage(ERROR_MESSAGES["NEED_KEYWORD"]);
      return;
    }
    setDisplayMovies(
      filterMovies(savedMoviesList, searchString, showShortMovies, true)
    );
  }

  //изменение записи в строке поиска
  function handleSearchStringChange(value) {
    setSearchString(value);
  }

  function handleSearchFormSubmit(searchStringValue) {
   
    console.log('вошли в handleSearchFormSubmit');  

    if (!searchStringValue) {
      setSearchError(true);
      setSearchErrorMessage(ERROR_MESSAGES["NEED_KEYWORD"]);
      return;
    }

    //сохраняем текущие значения строки поиска и положение чек-бокса
    localStorage.setItem(
      `${currentUser.email} - searchStringSaved`,
      searchStringValue
    );
    localStorage.setItem(
      `${currentUser.email} - showShortMoviesSaved`,
      showShortMovies
    );

     console.log('значения перед фильтрацией в обработке формы сохраненных');  
     console.log(savedMoviesList);  
     console.log(searchStringValue); 
     console.log(showShortMovies);  

    //фильтруем фильмы по короткометражкам и строке
    const moviesList = filterMovies(
      savedMoviesList,
      searchStringValue,
      showShortMovies,
      true
    );

    if (moviesList.length === 0) {
      //отображаем ошибку
      setSearchError(true);
      setSearchErrorMessage(NOT_FOUND_MESSAGE);
    } else {
      setSearchError(false);
    }
    setFilteredMovies(moviesList);
    setDisplayMovies(moviesList);
  }
  
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
    const moviesList = filterMovies(
      savedMoviesList,
      searchString,
      showShortMovies,
      true
    );

    if (moviesList.length === 0) {
      //отображаем ошибку
      setSearchError(true);
      setSearchErrorMessage(NOT_FOUND_MESSAGE);
    } else {
      setSearchError(false);
    }
    setFilteredMovies(moviesList);
    setDisplayMovies(moviesList);
  }, [savedMoviesList.length]);

  return (
    <main className="saved-movies">
      <SearchForm
        handleSearchFormSubmit={handleSearchFormSubmit}
        handleShowShortMovies={handleShowShortMovies}
        showShortMovies={showShortMovies}
        searchString={searchString}
        handleSearchStringChange={handleSearchStringChange}
      />
      {searchError && (
        <SearchErrorMessage searchErrorMessage={searchErrorMessage} />
      )}
      <MoviesCardList
        moviesList={displayMovies}
        onDeleteIconClick={onDeleteIconClick}
        savedMoviesList={savedMoviesList}
      />{" "}
    </main>
  );
}

export default SavedMovies;
