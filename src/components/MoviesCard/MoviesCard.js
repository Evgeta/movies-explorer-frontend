import React from "react";
import { useLocation } from "react-router-dom";

import "./MoviesCard.css";
// import movieimage from "../../images/movie-image.png";

import { formatDuration } from '../../utils/utils.js';

function MoviesCard({movie, saved = false}) {
  const location = useLocation().pathname;
  
  return (
    <li className="movies-card">
      <article className="movies-card__item">
        <div className="movies-card__description">
          <div className="movies-card__info-box">
            <h2 className="movies-card__title">{movie.nameRU}</h2>
            <span className="movies-card__duration">{formatDuration(movie.duration)}</span>
          </div>

          {location === "/movies" &&
          saved && ( //если отображаем все фильмы + иконка для сохрененного
              <button
                type="button"
                className="movies-card__button movies-card__button_type_saved"
                title="Отменить сохранение"
              ></button>
            )}

          {location === "/movies" &&
          !saved && ( //если отображаем все фильмы + иконка для несохрененного
              <button
                type="button"
                className="movies-card__button movies-card__button_type_not-saved"
                title="Сохранить"
              ></button>
            )}

          {location === "/saved-movies" && ( //если отображаем сохраненные фильмы
            <button
              type="button"
              className="movies-card__button movies-card__button_type_delete-icon"
              title="Удалить из сохрененных"
            ></button>
          )}
        </div>

        <a
          target="_blank"
          href=""
          rel="noopener noreferrer"
          className="movies-card__image-link"
        >
          <img
            src={`https://api.nomoreparties.co${movie.image.url}`}
            alt={movie.nameRU}
            title={movie.description}
            className="movies-card__image"
          />
        </a>
      </article>
    </li>
  );
}

export default MoviesCard;
