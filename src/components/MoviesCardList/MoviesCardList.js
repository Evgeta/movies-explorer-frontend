import React, { useEffect, useState } from "react";

import "./MoviesCardList.css";
import "../MoviesCard/MoviesCard.css";

import MoviesCard from "../MoviesCard/MoviesCard";

import { WIDTH_TO_COLUMS_NUMBER, CARDS_NUMBER } from "../../utils/constants";
import { useScreenWidth } from "../../hooks/useScreenWidth";
import { findSavedMovie } from "../../utils/utils.js";

function MoviesCardList({
  moviesList,
  onFilmLikeClick,
  onDeleteIconClick,
  savedMoviesList,
}) {

  const [moviesCardsList, setMoviesCardsList] = React.useState([]);
  const [showMoreButtonuttonVisible, setShowMoreButtonuttonVisible] = useState(
    true
  );
  const [cardListLength, setCardListLength] = useState(null);
  const [additionalCardsNumber, setAdditionalCardsNumber] = useState(null);

  const screenWidth = useScreenWidth();

  console.log("savedMoviesList - in MoviesCardList");
  console.log(savedMoviesList);

  useEffect(() => {
    if (screenWidth > WIDTH_TO_COLUMS_NUMBER.threeColunmsDelimeter) {
      setCardListLength(CARDS_NUMBER.threeColunms.cards);
      setAdditionalCardsNumber(CARDS_NUMBER.threeColunms.moreCards);
    } else if (
      screenWidth <= WIDTH_TO_COLUMS_NUMBER.threeColunmsDelimeter &&
      screenWidth >= WIDTH_TO_COLUMS_NUMBER.twoColumnsDelimeter
    ) {
      setCardListLength(CARDS_NUMBER.twoColumns.cards);
      setAdditionalCardsNumber(CARDS_NUMBER.twoColumns.moreCards);
    } else if (screenWidth < WIDTH_TO_COLUMS_NUMBER.twoColumnsDelimeter) {
      setCardListLength(CARDS_NUMBER.oneColumn.cards);
      setAdditionalCardsNumber(CARDS_NUMBER.oneColumn.moreCards);
    }
  }, [screenWidth, cardListLength, additionalCardsNumber]);

  useEffect(() => {
    setMoviesCardsList(moviesList.slice(0, cardListLength));
    if (moviesList.length <= cardListLength) {
      setShowMoreButtonuttonVisible(false);
    } else {
      setShowMoreButtonuttonVisible(true);
    }
    console.log("moviesCardsList в UseEffect");
    console.log(moviesCardsList);
  }, [moviesList, cardListLength]);

  const handleShowMoreButtonClick = () => {
    setMoviesCardsList(
      moviesList.slice(0, moviesCardsList.length + additionalCardsNumber)
    );
    if (moviesCardsList.length >= moviesList.length - additionalCardsNumber) {
      setShowMoreButtonuttonVisible(false);
    }
  };

  return (
    <div className="movies-cardlist">
      <ul className="movies-cardlist__list">
        {moviesCardsList.map((movie) => (
          <MoviesCard
            key={movie.id || movie._id || movie.movie._id }
            movie={movie}
            saved={findSavedMovie(savedMoviesList, movie)}
            onFilmLikeClick={onFilmLikeClick}
            onDeleteIconClick={onDeleteIconClick}
          />
        ))}
      </ul>
      {showMoreButtonuttonVisible && (
        <button
          className="movies-cardlist__showmore"
          type="button"
          onClick={handleShowMoreButtonClick}
        >
          Ещё
        </button>
      )}
    </div>
  );
}

export default MoviesCardList;
