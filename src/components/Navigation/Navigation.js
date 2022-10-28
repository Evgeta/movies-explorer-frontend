import React from 'react';

import './Navigation.css';

function Navigation() {
    return (
      <nav className="navigation">
      <ul className="navigation__list">
       <div className="navigation__films-block">
        <li className="navigation__link">
          Фильмы
        </li>
        <li className="navigation__link">
          Cохранённые фильмы
        </li>
        </div>
        <li className="navigation__link navigation__link_signin">
           Аккаунт
           <div className="navigation__login-link-image"></div>                        
        </li>
      </ul>
    </nav>      
    );
  }
  
  export default Navigation;
  