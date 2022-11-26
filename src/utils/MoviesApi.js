import {
    MOVIES_URL,
  } from './constants.js';
   
  class MoviesApi {
    constructor({ baseUrl }) {
      this._baseUrl = baseUrl;      
    }
    
    //проверка ответа
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  
    //получение списка фильмов с сервера
    getMovies() {
      return fetch(`${this._baseUrl}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
        .then((res) => this._checkResponse(res)
        )
    }
  }
  
  //инициализация API
  export const moviesApi = new MoviesApi({
    baseUrl: MOVIES_URL,    
  });
  
  export default moviesApi;
  
