import {
    SAVED_MOVIES_URL,
  } from './constants.js';
   
  class MainApi {
    constructor({
      baseUrl,
      headers
    }) {
      this._baseUrl = baseUrl;
      this._headers = headers; 
    }
    
    _getHeaders() {
      const jwt = localStorage.getItem('jwt');
      return {
        'Authorization': `Bearer ${jwt}`,
        ...this._headers,
      };
    }
  
    //проверка ответа
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  
  //запрос на регистрацию
  register (name, email, password,) {
    return fetch(`${this._baseUrl}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          password,          
        })
      })
      .then((response) => this._checkResponse(response));
  }

  //запрос на авторизацию
  authorize (email, password) {
    return fetch(`${this._baseUrl}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
           email,
           password
        })
      })
      .then((response => this._checkResponse(response)))
      .catch(err => console.log(err))
  };

//проверки валидности токена и получениe email
 checkToken (token) {
  return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(res => this._checkResponse(res))
    .then(data => data)
}

    //получение фильмов с сервера
    getSavedMovies() {
      return fetch(`${this._baseUrl}/movies`, {
          method: 'GET',
          headers: this._getHeaders()
        })
        .then((res) => this._checkResponse(res)
        )
    }
  
    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
          headers: this._getHeaders()
        })
        .then((res) => this._checkResponse(res)
        )
    }
  
    setUserInfo(data) {
      return fetch(`${this._baseUrl}/users/me`, {
          method: 'PATCH',
          headers: this._getHeaders(),
          body: JSON.stringify({
            name: data.name,
            about: data.about
          })
        })
        .then((res) => this._checkResponse(res))
    }
  
    addNewMovie(data) {
      return fetch(`${this._baseUrl}/movies`, {
          method: 'POST',
          headers: this._getHeaders(),
          body: JSON.stringify({
            country: data.country,
            director: data.director,
            duration: data.duration,
            year: data.year,
            description: data.description,
            image: data.image,
            trailerLink: data.trailerLink,
            // thumbnail: data.trailerLink,
            movieId: data.id,
            nameEN: data.nameEN,
            nameRU: data.nameRU,

/*
country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameEN,
    nameRU,
*/


          })
        })
        .then((res) => this._checkResponse(res))
    }
  
    deleteMovie(_id) {
      return fetch(`${this._baseUrl}/movies/${_id}`, {
          method: 'DELETE',
          headers: this._getHeaders(),
        })
        .then((res) => this._checkResponse(res))
    }
  
//     setLike(data) {
//        return fetch(`${this._baseUrl}/cards/${data._id}/likes`, {
//           method: 'PUT',
//           headers: this._getHeaders(),
//         })
//         .then((res) => this._checkResponse(res))
//     }
  
//     removeLike(data) {
//       return fetch(`${this._baseUrl}/cards/${data._id}/likes`, {
//           method: 'DELETE',
//           headers: this._getHeaders(),
//         })
//         .then((res) => this._checkResponse(res))
//     }
  
//     setAvatar(data) {
//       return fetch(`${this._baseUrl}/users/me/avatar`, {
//           method: 'PATCH',
//           headers: this._getHeaders(),
//           body: JSON.stringify({
//             avatar: data.avatar
//           })
//         })
//         .then((res) => this._checkResponse(res))
//     }
  
//     changeLikeCardStatus (data, isLiked) {
//       if (isLiked) {
//           return this.setLike(data);
//       } else {
//           return this.removeLike(data);        
//       }
//   }
 }
  
  //инициализация mainAPI
  const mainApi = new MainApi({
    baseUrl: SAVED_MOVIES_URL,
    headers: {
    //  authorization: token,
      'Content-Type': 'application/json'
    }
  });
  
export default mainApi;