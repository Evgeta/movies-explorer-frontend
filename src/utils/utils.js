
import { SHORTMOVIE_DURATION } from './constants.js';


export function formatDuration(duration) {
    const hours = Math.trunc(duration / 60);
    const minutes = duration % 60;
    if(hours === 0) {
      return `${minutes}м`;
    } else {
      return `${hours}ч ${minutes}м`;
    }
  }


  // фильтрация по короткометражкам (короткометрадки не отображаем)
function filterShortMovies(movies) {
  return movies.filter(movie => movie.duration > SHORTMOVIE_DURATION);
}

// фильтрация по короткометражкам и по строке запроса
export function filterMovies(movies, searchString, showShortMovies) {

  const filteredMovies = [];
  console.log("все фильмы");
  console.log(movies);

//фильтруем по длительности. Если не стоит чекбокс отображать которкометражки - исключаем их
if (!showShortMovies) {
  filteredMovies = filterShortMovies(movies);
} else {
  filteredMovies = movies;
}

console.log("без короткометражек");
console.log(filteredMovies);

//усекаем значение строки поиска и приводим к нижнему регистру
const cleanSearchString = searchString.trim().toLowerCase();

//фильтруем по поисковой строке
filteredMovies = filteredMovies.filter((movie) => {
  //усекаем и приводим к нижнему регистру русское и английское название фильма
  const movieNameEn = String(movie.nameEN).trim().toLowerCase();
  const movieNameRu = String(movie.nameRU).trim().toLowerCase();
    
   //возвращаем элемент, если
   //значение строки поиска есть в английском названии
   //значение строки поиска есть в русском названии
  
  return movieNameEn.indexOf(cleanSearchString) !== -1 || movieNameRu.indexOf(cleanSearchString) !== -1;    
}
);

console.log("по строке поиска");
console.log(filteredMovies);

return filteredMovies; 

}

