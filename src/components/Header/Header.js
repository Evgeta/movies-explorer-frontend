import React from "react";

import "./Header.css";
import { Link, useLocation } from "react-router-dom";

import Navigation from "../Navigation/Navigation";

import logo from "../../images/logo.svg";

function Header({ loggedIn, onClickBurger, isBurgerMenuOpened }) {

  const location = useLocation().pathname;
  

  return (
    <header className="header">
      <div className="header__container">
        {location !== "/" ? (
          <>
            <Link to="/" className="header__logo-link">
              <img
                className="header__logo"
                src={logo}
                alt="Логотип Movies Explorer"
              />
            </Link>
            <Navigation
              onClickBurger={onClickBurger}
              isBurgerMenuOpened={isBurgerMenuOpened}
              isLanding={location === "/"}
            />
          </>
        ) : (
          <>
            <img
              className="header__logo"
              src={logo}
              alt="Логотип Movies Explorer"
            />            
            {!loggedIn && (
              <nav className="header__navigation">
                <ul className="header__link-list">
                  <li>
                    <Link className="header__link" to="/signup">
                      Регистрация
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="header__link header__link_signin"
                      to="/signin"
                    >
                      Войти
                    </Link>
                  </li>
                </ul>
              </nav>
            )}
          </>
        )}        
      </div>
    </header>
  );
}

export default Header;
