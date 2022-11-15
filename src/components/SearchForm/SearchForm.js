import React from "react";

import "./SearchForm.css";

function SearchForm() {
  return (
    <section className="search-form">
      <div className="search-form__container">
        <form className="search-form__form">
          <input
            className="search-form__input"
            type="text"
            placeholder="Фильм"
            aria-label="Поле для ввода критериев поиска фильмов"
            required
          />
          <button className="search-form__button" type="submit"></button>
        </form>
        <div className="search-form__decorline"> </div>         
        <label className="search-form__filter">
          <input
            className="search-form__checkbox"
            type="checkbox"
            checked={true}
          />
          <span className="search-form__switcher"></span>
          <span className="search-form__text">Короткометражки</span>
        </label>
               
      </div>
      <hr className="search-form__horizontal-decor-line"></hr>
    </section>
  );
}

export default SearchForm;
