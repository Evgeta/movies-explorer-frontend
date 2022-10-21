import React from 'react';

import './Navigation.css';

function Navigation() {
    return (
          <nav class="navigation">
            <ul class="navigation__list">
              <li class="navigation__link">Регистрация</li>
              <li class="navigation__link navigation__link_signin">Войти</li>
            </ul>
          </nav>      
    );
  }
  
  export default Navigation;
  