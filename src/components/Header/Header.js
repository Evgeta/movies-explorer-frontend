import React from "react";

import "./Header.css";
import { Link, useLocation } from "react-router-dom";

import Navigation from "../Navigation/Navigation";
import NavTab from "../NavTab/NavTab";

import logo from "../../images/logo.svg";

function Header({ loggedIn, onClickBurger, isBurgerMenuOpened }) {
  const location = useLocation().pathname;
  console.log("loggedIn");
  console.log(loggedIn);

  return (
    <header className={`header ${location === "/" ? "header_theme_pink" : ""}`}>
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
            <NavTab />
          </>
        )}
        {/* {!loggedIn && <NavTab/>}       
            
      {loggedIn && <Navigation
         onClickBurger={onClickBurger}
         isBurgerMenuOpened={isBurgerMenuOpened}
      />  } */}
      </div>
    </header>
  );
}

export default Header;
