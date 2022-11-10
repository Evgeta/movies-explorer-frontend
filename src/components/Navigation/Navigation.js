import React from "react";

import { NavLink } from "react-router-dom";

import "./Navigation.css";

import BurgerMenu from "../BurgerMenu/BurgerMenu";

function Navigation({ isBurgerMenuOpened, onClickBurger, isLanding }) {
  const activeLink = `navigation__link_type_active-${
    isBurgerMenuOpened ? "mobile" : "desktop"
  }`;
  
  return (
    <nav
      className={`navigation navigation_state_${
        isBurgerMenuOpened ? "opened" : "closed"
      }`}
      onClick={isBurgerMenuOpened ? onClickBurger : undefined}
    >
      {!isLanding && (
        <BurgerMenu
          isBurgerMenuOpened={isBurgerMenuOpened}
          onClickBurger={onClickBurger}
        />
      )}        
      <ul
        className={`navigation__list navigation__list_pane 
                              navigation__list_state_${
                        isBurgerMenuOpened ? "opened" : "closed"
                      }`}      >
        <div className="navigation__films-block">
          {isBurgerMenuOpened && (
            <li className="navigation__item">
              <NavLink
                exact
                to="/"
                className="navigation__link"
                activeClassName={activeLink}
              >
                Главная
              </NavLink>
            </li>
          )}
          <li className="navigation__item">
            <NavLink
              exact
              to="/movies"
              className="navigation__link"
              activeClassName={activeLink}
            >
              Фильмы
            </NavLink>
          </li>
          <li className="navigation__item">
            <NavLink
              exact
              to="/saved-movies"
              className="navigation__link"
              activeClassName={activeLink}
            >
              Cохранённые фильмы
            </NavLink>
          </li>
        </div>
        <li>
          <NavLink
            exact
            to="/profile"
            className="navigation__link navigation__link_type_profile"
            activeClassName={activeLink}
          >
            Аккаунт          
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
