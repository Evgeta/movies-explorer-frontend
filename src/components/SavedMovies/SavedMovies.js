import React from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

import "./SavedMovies.css";

function SavedMovies(isLoading) {
  return (
    <main className="saved-movies">
      <SearchForm />
      {/* {isLoading && <Preloader />} */}  

      <MoviesCardList />
    </main>
  );
}

export default SavedMovies;
