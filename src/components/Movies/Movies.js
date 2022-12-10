import React, { useState, useEffect }  from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

import "./Movies.css";

import moviesApi from '../../utils/MoviesApi.js';



function Movies({
  // setIsLoading,
  }) {


  // const [isLoading, setIsLoading] = useState(false); //состояние прелоадера

  const [publicServerMovies, setPublicServerMovies] = useState([]); //фильмы, которые пришли через запрос на публичный сервер
  const [showShortMovies, setShowShortMovies] = useState(false); 

  //изменение состояние чекбокса
  function handleShowShortMovies() {
    setShowShortMovies(!showShortMovies);    
  }


  function handleSearchFormSubmit(searchStringValue){
    console.log("handleSearchFormSubmit");

    localStorage.setItem('SearchString', searchStringValue);
    localStorage.setItem('showShortMovies', showShortMovies);

    // setIsLoading(true);
    moviesApi.getMovies()
    .then(movies => {
      setPublicServerMovies(movies)
      console.log(publicServerMovies);

      localStorage.setItem(
        'movies-from-public-server',
        JSON.stringify(movies)
      );
    })
    .catch((err) => {
      console.log(`Ошибка: ${err.status}`)
    })
    .finally(
      // () => setIsLoading(false)
      );
  }
  
  useEffect(() => {
    if (localStorage.getItem('movies-from-public-server')) {
      const movies = JSON.parse(
        localStorage.getItem('movies-from-public-server')
      );      
    }
  }
  );


  return (
    <main className="movies">
      <SearchForm 
        handleSearchFormSubmit={handleSearchFormSubmit}
        handleShowShortMovies={handleShowShortMovies}
        showShortMovies={showShortMovies}
      />
      {/* {isLoading && <Preloader />}   */}
      <MoviesCardList 
        moviesList={publicServerMovies}
      />
    </main>
  );
}

export default Movies;
