import React, { useEffect, useContext, } from "react";

import "./SearchForm.css";

import { useHistory, useLocation } from "react-router-dom";

import {
  CurrentUserContext
} from '../../contexts/CurrentUserContext.js';



// import { 
//   ERROR_MESSAGES,
// }  from '../../utils/constants.js';

function SearchForm({
    handleSearchFormSubmit,  
    handleShowShortMovies,
    showShortMovies = true,
    searchString,
    //setSearchString,
    handleSearchStringChange,
  }
) {
     
  const history = useHistory();
  const location = useLocation().pathname;

  const currentUser = useContext(CurrentUserContext);
  console.log('currentUser в SearchForm');
  console.log(currentUser);


//восстановление значения строки поиска при переходе на страницу
useEffect(() => {
  
  if (location === "/movies")
   {if (localStorage.getItem(`${currentUser.email} - moviesSearchStringPublic`)) {
    const oldSearchString = //JSON.parse(
      localStorage.getItem(`${currentUser.email} - moviesSearchStringPublic`);  
      console.log('saved search string');    
      console.log(oldSearchString);    
      handleSearchStringChange(oldSearchString);  
  }  
}

if (location === "/saved-movies")
{if (localStorage.getItem(`${currentUser.email} - moviesSearchStringSaved`)) {
 const oldSearchString = //JSON.parse(
   localStorage.getItem(`${currentUser.email} - moviesSearchStringSaved`);  
   console.log('saved search string');    
   console.log(oldSearchString);    
   handleSearchStringChange(oldSearchString);  
}  
}

},
 //[history]);
[]);

  function onSearchStringChange(e) {
    handleSearchStringChange(e.target.value); 
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleSearchFormSubmit(searchString);
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
            onChange={onSearchStringChange}
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
