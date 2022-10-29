import React from 'react';
import { Link } from "react-router-dom";

import './NavTab.css';

function NavTab() {
    return (
          <nav className="nav-tab">
            <ul className="nav-tab__list">
              <li>
              <Link className="nav-tab__link"
                to="/signup"
              >Регистрация
              </Link>
              </li>
              <li className="nav-tab__link nav-tab__link_signin">Войти</li>
            </ul>
          </nav>   
    );
  }
  
  export default NavTab;
  