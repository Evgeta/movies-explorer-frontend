import React from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

import "./Movies.css";

function Movies(isLoading) {
  return (
    <main className="movies">
      <SearchForm />
      {/* {isLoading && <Preloader />}   */}
      <MoviesCardList />
    </main>
  );
}

export default Movies;
