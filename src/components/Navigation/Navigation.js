import React from 'react';

import './Navigation.css';

function Navigation() {
    return (
          <nav className="navigation">
            <ul className="navigation__list">
              <li className="navigation__link">Регистрация</li>
              <li className="navigation__link navigation__link_signin">Войти</li>
            </ul>
          </nav>      
    );
  }
  
  export default Navigation;
  