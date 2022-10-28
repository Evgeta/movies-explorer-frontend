import React from 'react';

import './MoviesCard.css';

function MoviesCard () {
    return (
        <li className="movies-card">
        <article className="movies-card__item">
          <a target="_blank" href="" className="movies-card__image-link">
            <img
              src="./images/movie-image.png"
              alt="33 слова о дизайне"
              title="Описание: Война искусств"
              className="movies-card__image"
            />
          </a>
          <div className="movies-card__description">
            <h2 className="movies-card__title">33 слова о дизайне</h2>
              <button
                type="button"
                className="movies-card__button movies-card__button_type_saved"
                title="Сохранить"
              ></button>            
          </div>
          <span className="movies-card__duration">
            1ч 42м
          </span>
        </article>
      </li>
    );
  }
  
  export default MoviesCard;
  