import React from "react";

import "./MoviesCardList.css";
import "../MoviesCard/MoviesCard.css";

import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {
  return (
    <div className="movies-cardlist">
      <ul className="movies-cardlist__list">        
      <MoviesCard
        saved={true}
        title={'Описание: Война искусств'}
      />
      <MoviesCard
        saved={false}
        title={'Киноальманах «100 лет дизайна»'}
      />
      <MoviesCard
        saved={false}
        title={'Gimme Danger: История Игги и The Stooges'}
      />
      <MoviesCard
        saved={true}
        title={'Описание: Война искусств'}
      />
      <MoviesCard
        saved={false}
        title={'Киноальманах «100 лет дизайна»'}
      />
      <MoviesCard
        saved={false}
        title={'Gimme Danger: История Игги и The Stooges'}
      />
      <MoviesCard
        saved={true}
        title={'Описание: Война искусств'}
      />
      <MoviesCard
        saved={false}
        title={'Киноальманах «100 лет дизайна»'}
      />
      <MoviesCard
        saved={false}
        title={'Gimme Danger: История Игги и The Stooges'}
      />
        
      </ul>
      <button className="movies-cardlist__showmore">Ещё</button>
    </div>
  );
}

export default MoviesCardList;
