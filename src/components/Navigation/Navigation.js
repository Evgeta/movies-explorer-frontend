import React from 'react';

import { NavLink } from 'react-router-dom';

import './Navigation.css';

function Navigation() {
    return (
      <nav className="navigation">
      <ul className="navigation__list">
       <div className="navigation__films-block">
        <li>
        <NavLink
            exact to="/movies"
            className="navigation__link"
          >
          Фильмы
        </NavLink>
        </li>
        <li>
        <NavLink
          exact to="/saved-movies"
          className="navigation__link"
          > 
          Cохранённые фильмы
         </NavLink>        
        </li>
        </div>
        <li>
        <NavLink
          exact to="/profile"
          className="navigation__link navigation__link_profile">
           Аккаунт
           <div className="navigation__profile-link-image"></div>     
          </NavLink>                   
        </li>
      </ul>
    </nav>      
    );
  }
  
  export default Navigation;
  