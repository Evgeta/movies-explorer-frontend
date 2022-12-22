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
