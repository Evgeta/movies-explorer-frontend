import React, { useState, useEffect, useContext } from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchErrorMessage from "../SearchErrorMessage/SearchErrorMessage";

import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

import { useHistory } from "react-router-dom";

import "./SavedMovies.css";

import {
  filterMovies, // фильтрация фльмов по короткометражкам и строке поиска
} from "../../utils/utils.js";

import { NOT_FOUND_MESSAGE } from "../../utils/constants.js";

function SavedMovies({ loggedIn, onDeleteIconClick, savedMoviesList }) {
  const currentUser = useContext(CurrentUserContext);
  const history = useHistory();

  //состояние чек-бокса. Если сохранено - берем из локального хранилища
  const [showShortMovies, setShowShortMovies] = useState(false);
  const [searchString, setSearchString] = useState("");

  // отфильтрованные сохраненные фильмы (по чекбоксу короткометражек и строке поиска)
  const [filteredMovies, setFilteredMovies] = useState(
    savedMoviesList.length > 0
      ? filterMovies(savedMoviesList, searchString, showShortMovies)
      : []
  );

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
    setDisplayMovies(filterMovies(filteredMovies));
  }

  //изменение записи в строке поиска
  function handleSearchStringChange(value) {
    console.log(value);
    setSearchString(value);
  }

  function handleSearchFormSubmit(searchStringValue) {
    //сохраняем текущие значения строки поиска и положение чек-бокса
    localStorage.setItem(
      `${currentUser.email} - searchStringSaved`,
      searchStringValue
    );
    localStorage.setItem(
      `${currentUser.email} - showShortMoviesSaved`,
      showShortMovies
    );

    //фильтруем фильмы по короткометражкам и строке
    const moviesList = filterMovies(
      savedMoviesList,
      searchString,
      showShortMovies
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

  // извлекаем состояние чекбокса короткометражек из локального хранилища для текущего пользователя
  useEffect(() => {
    if (
      localStorage.getItem(`${currentUser.email} - showShortMoviesSaved`) ===
      "true"
    ) {
      setShowShortMovies(true);
    } else {
      setShowShortMovies(false);
    }
  }, [currentUser]);

  // извлекаем значение строки поиска из локального хранилища для текущего пользователя
  useEffect(() => {
    if (
      localStorage.getItem(`${currentUser.email} - moviesSearchStringSaved`) ===
      "true"
    ) {
      setSearchString(
        localStorage.getItem(`${currentUser.email} - moviesSearchStringSaved`)
      );
    } else {
      setSearchString("");
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
    const moviesList = filterMovies(
      savedMoviesList,
      searchString,
      showShortMovies
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
      />
    </main>
  );
}

export default SavedMovies;
