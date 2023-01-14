
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

// проверка, сохранялся ли фильм
export function findSavedMovie (savedMovies, movie) {

  console.log('saved - внутри findSavedMovie');

        // console.log('savedMovies');
        // console.log(savedMovies);

        // console.log('movie');
        // console.log(movie);
        // console.log(movie.id);
  

  if(savedMovies.length === 0) return false;
  
  const savedFilms = savedMovies.filter((item) => {

    console.log('внутри filter');

      //  console.log('item');
      //  console.log(item);
      
      // console.log('item.movie');
      // console.log(item.movie);

    //  console.log('item.movie.movieId');
    //  console.log(item.movie.movieId);
      
      // console.log('item.movieId');
      // console.log(item.movieId);

      //  console.log('movie.id');
      //  console.log(movie.id);

       return item.movie.movieId === (movie.id || movie.movieId);
     });

          
        // console.log('savedFilms.length');
        // console.log(savedFilms.length);
   
  if(savedFilms.length > 0) console.log(true);
  if(savedFilms.length === 0) console.log(false);

  if(savedFilms.length > 0) return true
  else return false;  
  
     
  // console.log('saved - внутри findSavedMovie');
  // console.log(saved);
  
  // return saved;
  // return savedMovies.find((item) => {
  //   return item.movieId === (movie.id || movie.movieId);
  // });
}

