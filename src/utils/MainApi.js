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
  checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  }

  //запрос на регистрацию
  register(name, email, password, ) {
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
      .then((response) => this.checkResponse(response));
  }

  //запрос на авторизацию
  authorize(email, password) {
    console.log('email, password - в авторизации');
    console.log(email);
    console.log(password);

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
      .then((response => this.checkResponse(response)))
  };

  //проверки валидности токена и получениe email
  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      })
      .then(res => this.checkResponse(res))
      .then(data => data)
  }

  //получение фильмов с сервера
  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
        method: 'GET',
        headers: this._getHeaders()
      })
      .then((res) => this.checkResponse(res))
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
        headers: this._getHeaders()
      })
      .then((res) => this.checkResponse(res))
  }

  setUserInfo(name, email) {
    return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._getHeaders(),
        body: JSON.stringify({
          name: name,
          email: email
        })
      })
      .then((res) => this.checkResponse(res))
  }
  addNewMovie(data) {
    const thumbnail = 'https://api.nomoreparties.co' + data.image.formats.thumbnail.url;
    const image = 'https://api.nomoreparties.co' + data.image.url;

    return fetch(`${this._baseUrl}/movies`, {
        method: 'POST',
        headers: this._getHeaders(),
        body: JSON.stringify({
          movieId: data.id,
          nameRU: data.nameRU,
          nameEN: data.nameEN,
          director: data.director,
          country: data.country,
          year: data.year,
          duration: data.duration,
          description: data.description,
          trailerLink: data.trailerLink,
          thumbnail: thumbnail,
          image: image
        })
      })
      .then((res) => this.checkResponse(res))
  }

  deleteMovie(_id) {
    return fetch(`${this._baseUrl}/movies/${_id}`, {
        method: 'DELETE',
        headers: this._getHeaders(),
      })
      .then((res) => this.checkResponse(res))
  }
}

//инициализация mainAPI
const mainApi = new MainApi({
  baseUrl: SAVED_MOVIES_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default mainApi;