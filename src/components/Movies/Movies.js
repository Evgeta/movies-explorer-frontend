import React, { useState, useEffect }  from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

import "./Movies.css";

import moviesApi from '../../utils/MoviesApi.js';

import { 
  filterMovies, // фильтрация фльмов по короткометражкам и строке поиска
} from '../../utils/utils.js';

function Movies({
  loggedIn,
  // setIsLoading,
  }) {

  // const [isLoading, setIsLoading] = useState(false); //состояние прелоадера

//фильмы, которые пришли через запрос на публичный сервер
const [publicServerMovies, setPublicServerMovies] = useState([]);
  
// отфильтрованные фильмы (по чекбоксу короткометражек и строке поиска)
const [filteredMovies, setFilteredMovies] = useState([]); 
 

const [showShortMovies, setShowShortMovies] = useState(false); 
const [searchString, setSearchString] = useState(""); //строка поиска


const [isLoading, setIsLoading] = useState(false); 

  //изменение состояния чекбокса
  function handleShowShortMovies() {
    setShowShortMovies(!showShortMovies);    
  }

  //изменение записи в строке поиска
  function handleSearchStringChange(value) {   
    console.log(value);
    setSearchString(value); 
  }

// поиск по массиву и установка состояния
function handleFilterMovies(movies, searchString, showShortMovies) {

  console.log('внутри handleFilterMovies');
  console.log('movies');
  console.log(movies);
  console.log('searchString');
  console.log(searchString);
  console.log('showShortMovies');
  console.log(showShortMovies);


  //фильтруем фильмы по короткометражкам и строке 
  const moviesList = filterMovies(movies, searchString, showShortMovies);

  console.log('moviesList - после фильтрации');
  console.log(moviesList);


  if (moviesList.length === 0) {
        //если не нашли фильмов - отображаем ошибку    
  } 

  setFilteredMovies(moviesList);

  //сохранаяем отфильтрованные фильмы в локальном хранилище
  localStorage.setItem(
    `movies`,
    JSON.stringify(moviesList)
  );

}


  function handleSearchFormSubmit(searchStringValue){

    console.log('выводим loggedIn');
    console.log(loggedIn);


    console.log("handleSearchFormSubmit");

    localStorage.setItem('SearchString', searchStringValue);
    localStorage.setItem('showShortMovies', showShortMovies);

    if (publicServerMovies.length === 0) {

    setIsLoading(true);
    moviesApi.getMovies()
    .then(movies => {
      setPublicServerMovies(movies)
      console.log(publicServerMovies);
      
      localStorage.setItem(
        'movies-from-public-server',
        JSON.stringify(movies)
      );

      console.log('перед фильтрацией');
      console.log('movies');
      console.log(movies);
      console.log('searchString');
      console.log(searchString);
      console.log('showShortMovies');
      console.log(showShortMovies);

      handleFilterMovies(
         movies,
         searchString, 
         showShortMovies); 
    })

    .catch((err) => {
      console.log(`Ошибка: ${err.status}`)
    })
    .finally(
         setIsLoading(false)
      );
    }   
}
  
  useEffect(() => {
    if (localStorage.getItem('movies-from-public-server')) {
      const movies = JSON.parse(
        localStorage.getItem('movies-from-public-server')
      );      
    }
  }
  );


  return (
    <main className="movies">
      <SearchForm 
        handleSearchFormSubmit={handleSearchFormSubmit}
        handleShowShortMovies={handleShowShortMovies}
        showShortMovies={showShortMovies}
        searchString={searchString}
        handleSearchStringChange={handleSearchStringChange}
      />
      {isLoading && <Preloader />}  
      <MoviesCardList 
        moviesList={filteredMovies}
        // isLoading = {isLoading}        
      />
    </main>
  );
}

export default Movies;
