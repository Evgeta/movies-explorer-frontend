import {
  SAVED_MOVIES_URL,
} from './constants.js'
  
class authApi {

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
   register = (password, email) => {
    return fetch(`${this._baseUrl}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password,
          email
        })
      })
      .then((response) => this._checkResponse(response));
  }
  
  //запрос на авторизацию
   authorize = (password, email) => {
    return fetch(`${this._baseUrl}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password,
          email
        })
      })
      .then((response => this._checkResponse(response)))
      .catch(err => console.log(err))
  };
  
  //проверки валидности токена и получениe email
   _checkToken = (token) => {
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
}

//инициализация authAPI
const mainApi = new MainApi({
  baseUrl: SAVED_MOVIES_URL,
  headers: {
  //  authorization: token,
    'Content-Type': 'application/json'
  }
});


export default authApi;