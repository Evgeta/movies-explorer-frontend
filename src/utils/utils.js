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

// фильтрация по короткометражкам (короткометрадки не отображаем)
// function filterShortMovies(movies) {
//   return movies.filter(movie => movie.duration > SHORTMOVIE_DURATION);
// }

// фильтрация по короткометражкам и по строке запроса
export function filterMovies(movies, searchString, showShortMovies) {


  //усекаем значение строки поиска и приводим к нижнему регистру
  const cleanSearchString = searchString.trim().toLowerCase();

  return movies.filter((movie) => {

    const movieNameEn = String(movie.nameEN).trim().toLowerCase();
    const movieNameRu = String(movie.nameRU).trim().toLowerCase();

    if (showShortMovies) {
      return ((movieNameRu.includes(cleanSearchString) ||
          movieNameEn.includes(cleanSearchString)) &&
        (movie.duration <= SHORTMOVIE_DURATION));
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