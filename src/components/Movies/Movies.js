import React, { useState }  from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

import "./Movies.css";

import moviesApi from '../../utils/MoviesApi.js';



function Movies({
  isLoading,
  }) {

  const [publicServerMovies, setPublicServerMovies] = useState([]);
  const [showShortMovies, setShowShortMovies] = useState(false); 

  function handleShowShortMovies() {
    setShowShortMovies(!showShortMovies);    
  }


  function handleSearchFormSubmit(){
    moviesApi.getMovies()
    .then(movies => {
      setPublicServerMovies(movies)
      console.log(publicServerMovies);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err.status}`)
    })
  }

  return (
    <main className="movies">
      <SearchForm 
        onSubmit={handleSearchFormSubmit}
        handleShowShortMovies={handleShowShortMovies}
        showShortMovies={showShortMovies}
      />
      {/* {isLoading && <Preloader />}   */}
      <MoviesCardList />
    </main>
  );
}

export default Movies;
