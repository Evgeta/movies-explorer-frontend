 //общий бекэнд, не требующий аутентификации
 export const MOVIES_URL = 'https://api.nomoreparties.co/beatfilm-movies';

 //собственный бекэнд для сохранения фильмов
 export const SAVED_MOVIES_URL = 'https://api.moviesexplorer.evgeta.nomoredomains.sbs';


 //списки маршрутов, для которых отображаются компоненты
 export const headerShowRoutes = ['/movies', '/saved-movies', '/profile', '/'];
 export const footerShowRoutes = ['/movies', '/saved-movies', '/'];

 export const WIDTH_TO_COLUMS_NUMBER = {
    threeColunmsDelimeter: 1024,
    twoColumnsDelimeter: 640,    
  }

  export const CARDS_NUMBER = {
    threeColunms: {
      cards: 12,
      moreCards: 3,
    },
    twoColumns: {
      cards: 8,
      moreCards: 2,
    },
    oneColumn: {
      cards: 5,
      moreCards: 2,
    }
  }

  export const SHORTMOVIE_DURATION = 40;

  export const NOT_FOUND_MESSAGE = "Ничего не найдено";
  
  export const ERROR_DURING_REQUEST = "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.";



  //Страница логина пользователя
// 1. Вы ввели неправильный логин или пароль. 
// 2. При авторизации произошла ошибка. Токен не передан или передан не в том формате.
// 3. При авторизации произошла ошибка. Переданный токен некорректен.

export const LOGIN_ERROR_MESSAGES = {
  '400': 'Вы ввели неправильный логин или пароль.',
  '401': 'Вы ввели неправильный логин или пароль.',
  '403': 'При авторизации произошла ошибка. Токен не передан или передан не в том формате.',
  '409': 'Конфликт',
  '500': 'Внутренняя ошибка сервера',   
}


//Страница регистрации пользователя

// 1. Пользователь с таким email уже существует.

// 2. При регистрации пользователя произошла ошибка.

export const REGISTER_ERROR_MESSAGES = {
  '400': 'Вы ввели неправильный логин или пароль.',
  '401': 'Вы ввели неправильный логин или пароль.',  
  '409': 'Пользователь с таким email уже существует.',
  '500': 'На сервере произошла ошибка.',   
}



//Страница обновления профиля

//1. Пользователь с таким email уже существует.

//2. При обновлении профиля произошла ошибка.

export const EDIT_PROFILE_ERROR_MESSAGES = {
  '409': 'Пользователь с таким email уже существует.',
  '500': 'На сервере произошла ошибка.',   
}




//1. 500 На сервере произошла ошибка.

//2. 404 Страница по указанному маршруту не найдена.