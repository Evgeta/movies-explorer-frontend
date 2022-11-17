import React from "react";
import { useLocation } from "react-router-dom";

import "./MoviesCard.css";
import movieimage from "../../images/movie-image.png";

function MoviesCard({ saved = false, title }) {
  const location = useLocation().pathname;
  
  return (
    <li className="movies-card">
      <article className="movies-card__item">
        <div className="movies-card__description">
          <div className="movies-card__info-box">
            <h2 className="movies-card__title">{title}</h2>
            <span className="movies-card__duration">1ч 42м</span>
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
            src={movieimage}
            alt={title}
            title={title}
            className="movies-card__image"
          />
        </a>
      </article>
    </li>
  );
}

export default MoviesCard;
