import React from 'react';

import "./Header.css";
import { Link, useLocation } from "react-router-dom";

import Navigation from '../Navigation/Navigation';
import NavTab from '../NavTab/NavTab';
import BurgerMenu from '../BurgerMenu/BurgerMenu';


import logo from '../../images/logo.svg';

function Header({
  loggedIn,
}) {

  const location = useLocation().pathname;
  console.log('loggedIn');
  console.log(loggedIn);
  
  return (
    <header className={`header ${location === '/' ? 'header_theme_pink' : ''}`}>
      <div className="header__container">
      {(location !== '/') 
       ? (
        <Link to="/" className="header__logo-link">
          <img className="header__logo" src={logo} alt="Логотип Movies Explorer" />
        </Link>
       ) : (
        <img className="header__logo" src={logo} alt="Логотип Movies Explorer" />
       )}
      {!loggedIn &&
       <>
        <NavTab />
        <BurgerMenu />
       </>}

      {loggedIn && <Navigation />  }
      </div>
    </header>
  );
}

export default Header;
