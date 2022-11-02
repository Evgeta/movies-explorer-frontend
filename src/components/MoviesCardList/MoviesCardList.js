import React from "react";

import "./MoviesCardList.css";
import "../MoviesCard/MoviesCard.css";

import movieimage from "../../images/movie-image.png";

function MoviesCardList() {
  return (
    <div className="movies-cardlist">
      <ul className="movies-cardlist__list">
        <li className="movies-card">
          <article className="movies-card__item">
            <a
              target="_blank"
              href=""
              rel="noopener noreferrer"
              className="movies-card__image-link"
            >
              <img
                src={movieimage}
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
            <span className="movies-card__duration">1ч 42м</span>
          </article>
        </li>

        <li className="movies-card">
          <article className="movies-card__item">
            <a
              target="_blank"
              href=""
              rel="noopener noreferrer"
              className="movies-card__image-link"
            >
              <img
                src={movieimage}
                alt="Война искусств"
                title="Описание: Война искусств"
                className="movies-card__image"
              />
            </a>
            <div className="movies-card__description">
              <h2 className="movies-card__title">
                Киноальманах «100 лет дизайна»
              </h2>
              <button
                type="button"
                className="movies-card__button movies-card__button_type_saved"
                title="Сохранить"
              ></button>
            </div>
            <span className="movies-card__duration">1ч 42м</span>
          </article>
        </li>

        <li className="movies-card">
          <article className="movies-card__item">
            <a
              target="_blank"
              href=""
              rel="noopener noreferrer"
              className="movies-card__image-link"
            >
              <img
                src={movieimage}
                alt="Война искусств"
                title="Описание: Война искусств"
                className="movies-card__image"
              />
            </a>
            <div className="movies-card__description">
              <h2 className="movies-card__title">
                Gimme Danger: История Игги и The Stooges
              </h2>
              <button
                type="button"
                className="movies-card__button movies-card__button_type_not-saved"
                title="Сохранить"
              ></button>
            </div>
            <span className="movies-card__duration">1ч 42м</span>
          </article>
        </li>

        <li className="movies-card">
          <article className="movies-card__item">
            <a
              target="_blank"
              href=""
              rel="noopener noreferrer"
              className="movies-card__image-link"
            >
              <img
                src={movieimage}
                alt="Война искусств"
                title="Описание: Война искусств"
                className="movies-card__image"
              />
            </a>
            <div className="movies-card__description">
              <h2 className="movies-card__title">Война искусств</h2>
              <button
                type="button"
                className="movies-card__button movies-card__button_type-saved"
                title="Сохранить"
              ></button>
            </div>
            <span className="movies-card__duration">1ч 42м</span>
          </article>
        </li>

        <li className="movies-card">
          <article className="movies-card__item">
            <a
              target="_blank"
              href=""
              rel="noopener noreferrer"
              className="movies-card__image-link"
            >
              <img
                src={movieimage}
                alt="Война искусств"
                title="Описание: Война искусств"
                className="movies-card__image"
              />
            </a>
            <div className="movies-card__description">
              <h2 className="movies-card__title">Война искусств</h2>
              <button
                type="button"
                className="movies-card__button movies-card__button_type-saved"
                title="Сохранить"
              ></button>
            </div>
            <span className="movies-card__duration">1ч 42м</span>
          </article>
        </li>

        <li className="movies-card">
          <article className="movies-card__item">
            <a
              target="_blank"
              href=""
              rel="noopener noreferrer"
              className="movies-card__image-link"
            >
              <img
                src={movieimage}
                alt="Война искусств"
                title="Описание: Война искусств"
                className="movies-card__image"
              />
            </a>
            <div className="movies-card__description">
              <h2 className="movies-card__title">Война искусств</h2>
              <button
                type="button"
                className="movies-card__button movies-card__button_type-saved"
                title="Сохранить"
              ></button>
            </div>
            <span className="movies-card__duration">1ч 42м</span>
          </article>
        </li>

        <li className="movies-card">
          <article className="movies-card__item">
            <a
              target="_blank"
              href=""
              rel="noopener noreferrer"
              className="movies-card__image-link"
            >
              <img
                src={movieimage}
                alt="Война искусств"
                title="Описание: Война искусств"
                className="movies-card__image"
              />
            </a>
            <div className="movies-card__description">
              <h2 className="movies-card__title">Война искусств</h2>
              <button
                type="button"
                className="movies-card__button movies-card__button_type-saved"
                title="Сохранить"
              ></button>
            </div>
            <span className="movies-card__duration">1ч 42м</span>
          </article>
        </li>

        <li className="movies-card">
          <article className="movies-card__item">
            <a
              target="_blank"
              href=""
              rel="noopener noreferrer"
              className="movies-card__image-link"
            >
              <img
                src={movieimage}
                alt="Война искусств"
                title="Описание: Война искусств"
                className="movies-card__image"
              />
            </a>
            <div className="movies-card__description">
              <h2 className="movies-card__title">Война искусств</h2>
              <button
                type="button"
                className="movies-card__button movies-card__button_type_saved"
                title="Сохранить"
              ></button>
            </div>
            <span className="movies-card__duration">1ч 42м</span>
          </article>
        </li>
      </ul>
      <button className="movies-cardlist__showmore">Ещё</button>
    </div>
  );
}

export default MoviesCardList;
