
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

  console.log('внутри filterMovies');
  console.log('movies');
  console.log(movies);
  console.log('searchString');
  console.log(searchString);
  console.log('showShortMovies');
  console.log(showShortMovies);

  //усекаем значение строки поиска и приводим к нижнему регистру
  const cleanSearchString = searchString.trim().toLowerCase();
  console.log('cleanSearchString'); 
  console.log(cleanSearchString); 

  return movies.filter((movie) => {

    const movieNameEn = String(movie.nameEN).trim().toLowerCase();
    const movieNameRu = String(movie.nameRU).trim().toLowerCase();
    // console.log(movieNameEn); 
    // console.log(movieNameRu); 

    // console.log((movieNameRu.includes(cleanSearchString) ||
    // movieNameEn.includes(cleanSearchString)) &&
    // (movie.duration <= SHORTMOVIE_DURATION)); 

    // console.log(movieNameRu.includes(cleanSearchString) ||
    // movieNameEn.includes(cleanSearchString)); 


    if (showShortMovies) {
      return ((movieNameRu.includes(cleanSearchString) ||
        movieNameEn.includes(cleanSearchString)) &&
        (movie.duration <= SHORTMOVIE_DURATION));
    } else {
      return (movieNameRu.includes(cleanSearchString) ||
      movieNameEn.includes(cleanSearchString));
    }
  })


// //фильтруем по поисковой строке
// const filteredMovies = filteredMovies.filter((movie) => {
//   //усекаем и приводим к нижнему регистру русское и английское название фильма
//   const movieNameEn = String(movie.nameEN).trim().toLowerCase();
//   const movieNameRu = String(movie.nameRU).trim().toLowerCase();
    
//    //возвращаем элемент, если
//    //значение строки поиска есть в английском названии
//    //значение строки поиска есть в русском названии

//    console.log(movieNameEn); 
//    console.log(movieNameRu); 
  
//   return movieNameEn.indexOf(cleanSearchString) !== -1 || movieNameRu.indexOf(cleanSearchString) !== -1;    
// });

//   console.log("вышли из filteredMovies");

//   console.log("без короткометражек  состояние до");
//   console.log(filteredMovies);
  
//   //фильтруем по длительности. Если не стоит чекбокс отображать которкометражки - исключаем их
//  if (!showShortMovies) {
//     return filterShortMovies(filteredMovies);
//   } else {
//     return filteredMovies;
//   }
   
}

