import React from 'react';

import './NavTab.css';

function NavTab() {
    return (
          <nav className="nav-tab">
            <ul className="nav-tab__list">
              <li className="nav-tab__link">Регистрация</li>
              <li className="nav-tab__link nav-tab__link_signin">Войти</li>
            </ul>
          </nav>   
    );
  }
  
  export default NavTab;
  