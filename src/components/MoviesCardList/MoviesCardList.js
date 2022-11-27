import React from "react";

import "./MoviesCardList.css";
import "../MoviesCard/MoviesCard.css";

import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(
  { moviesList,}

) {
  return (
    <div className="movies-cardlist">
      <ul className="movies-cardlist__list">    
      {moviesList.map(movie => (
          <MoviesCard
            key={movie.id || movie._id}
            movie={movie}
            saved={false}                        
          />
        ))}
         
      {/* <MoviesCard
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
      /> */}
        
      </ul>
      <button className="movies-cardlist__showmore">Ещё</button>
    </div>
  );
}

export default MoviesCardList;
