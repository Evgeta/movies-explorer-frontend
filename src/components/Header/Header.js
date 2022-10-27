import React from 'react';

import "./Header.css";
import { Link } from "react-router-dom";

import Navigation from '../Navigation/Navigation';
import BurgerMenu from '../BurgerMenu/BurgerMenu';


import logo from '../../images/logo.svg';

function Header() {
  return (
    <header className="header header_theme_pink">
      <div className="header__container">
        {/* <Link to="/" className="header__logo-link"> */}
          <img className="header__logo" src={logo} alt="Логотип" />
        {/* </Link> */}
        

        <Navigation />
        <BurgerMenu />
      </div>
    </header>
  );
}

export default Header;
