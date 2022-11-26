import React, { useState }  from "react";

import "./SearchForm.css";

function SearchForm({
    handleSearchFormSubmit,  
    handleShowShortMovies,
    showShortMovies,
  }
) {

  const [searchString, setSearchString] = useState("");
  
  
  function handleSearchStringChange(e) {
    setSearchString(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleSearchFormSubmit();
  };

  return (
    <section className="search-form">
      <div className="search-form__container">
        <form className="search-form__form" onSubmit={handleSubmit}>
          <input
            className="search-form__input"
            type="text"
            placeholder="Фильм"
            aria-label="Поле для ввода критериев поиска фильмов"
            required
            onChange={handleSearchStringChange}
            value={searchString}
          />
          <button className="search-form__button" type="submit"></button>
        </form>
        <div className="search-form__decorline"> </div>         
        <label className="search-form__filter">
          <input
            className="search-form__checkbox"
            type="checkbox"
            onChange={handleShowShortMovies}            
            checked={showShortMovies}
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
