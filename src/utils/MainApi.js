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
      console.log('res внутри checkResponse');
      console.log(res);
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res);
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
      .then((response) => this.checkResponse(response));
  }

  //запрос на авторизацию
  authorize (email, password) {
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
    //  .catch(err => console.log(err))
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
    .then(res => this.checkResponse(res))
    .then(data => data)
}

    //получение фильмов с сервера
    getSavedMovies() {
      return fetch(`${this._baseUrl}/movies`, {
          method: 'GET',
          headers: this._getHeaders()
        })
        .then((res) => this.checkResponse(res)
        )
    }
  
    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
          headers: this._getHeaders()
        })
        .then((res) => this.checkResponse(res)
        )
    }
  
    setUserInfo (name, email) {
      console.log('name -внутри setUserInfo ');
      console.log(name);
      console.log('email');
      console.log(email);
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
  
//      movie.thumbnail = `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`
//{`https://api.nomoreparties.co${movie.image.url}`}

    addNewMovie(data) {

      console.log('data внутри addNewMovie');  
      console.log(data);
      console.log('JSON.stringify внутри addNewMovie');  

      console.log('thumbnail');  
      const thumbnail = 'https://api.nomoreparties.co'+ data.image.formats.thumbnail.url;
      console.log(thumbnail);

      console.log('image');  
      const image = 'https://api.nomoreparties.co'+ data.image.url;
      console.log(image);
      
      console.log(JSON.stringify(
        {
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
      }));


      return fetch(`${this._baseUrl}/movies`, {
          method: 'POST',
          headers: this._getHeaders(),
          body: JSON.stringify(
            {
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

          }
          
          
        //   {
        //     "movieId": 1,
        //     "nameRU": "«Роллинг Стоунз» в изгнании",
        //     "nameEN": "Stones in Exile",
        //     "director": "Стивен Кайак ",
        //     "country": "США",
        //     "year": "2010",
        //     "duration": 61,
        //     "description": "В конце 1960-х группа «Роллинг Стоунз», несмотря на все свои мегахиты и сверхуспешные концертные туры, была разорена. Виной всему — бездарный менеджмент и драконовское налогообложение в Британии. Тогда музыканты приняли не самое простое для себя решение: летом 1971 года после выхода альбома «Stiсky Fingers» они отправились на юг Франции записывать новую пластинку. Именно там, на Лазурном Берегу, в арендованном Китом Ричардсом подвале виллы Неллькот родился сборник «Exile on Main St.», который стал лучшим альбомом легендарной группы.",
        //     "trailerLink": "https://www.youtube.com/watch?v=UXcqcdYABFw",
        //     "thumbnail":  "https://api.nomoreparties.co/uploads/thumbnail_stones_in_exile_b2f1b8f4b7.jpeg",
        //     "image": "https://api.nomoreparties.co//uploads/stones_in_exile_b2f1b8f4b7.jpeg"
        // }
          
          
          )
        })
        .then((res) => this._checkResponse(res))
    }
  
    deleteMovie(_id) {
      return fetch(`${this._baseUrl}/movies/${_id}`, {
          method: 'DELETE',
          headers: this._getHeaders(),
        })
        .then((res) => this.checkResponse(res))
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