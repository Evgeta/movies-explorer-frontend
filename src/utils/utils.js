import {
  SHORTMOVIE_DURATION
} from './constants.js';


export function formatDuration(duration) {
  const hours = Math.trunc(duration / 60);
  const minutes = duration % 60;
  if (hours === 0) {
    return `${minutes}м`;
  } else {
    return `${hours}ч ${minutes}м`;
  }
}

// фильтрация по короткометражкам и по строке запроса
export function filterMovies(movies, searchString, showShortMovies, fromSaved) {

  //усекаем значение строки поиска и приводим к нижнему регистру
  const cleanSearchString = searchString.trim().toLowerCase();

  let movieNameEn;
  let movieNameRu;
  let movieDuration;

  return movies.filter((movie) => {
       
    if(fromSaved){
      movieNameEn = String(movie.movie.nameEN).trim().toLowerCase();
      movieNameRu = String(movie.movie.nameRU).trim().toLowerCase();
      movieDuration = movie.movie.duration;    
    }
    else{
      movieNameEn = String(movie.nameEN).trim().toLowerCase();
      movieNameRu = String(movie.nameRU).trim().toLowerCase();
      movieDuration = movie.duration;    
    }
   
    if (showShortMovies) {
      return ((movieNameRu.includes(cleanSearchString) ||
          movieNameEn.includes(cleanSearchString)) &&
        ( movieDuration <= SHORTMOVIE_DURATION));
    } else {
      return (movieNameRu.includes(cleanSearchString) ||
        movieNameEn.includes(cleanSearchString));
    }
  })
}

// проверка, сохранялся ли фильм
export function findSavedMovie(savedMovies, movie) {
  if (savedMovies.length === 0) return false;

  const savedFilms = savedMovies.filter((item) => {
    return item.movie.movieId === (movie.id || movie.movieId);
  });

  if (savedFilms.length > 0) return true
  else return false;
}