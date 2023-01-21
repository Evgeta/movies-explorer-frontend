import React from "react";

import { NavLink } from "react-router-dom";

import "./Navigation.css";

import BurgerMenu from "../BurgerMenu/BurgerMenu";

function Navigation({ isBurgerMenuOpened, onClickBurger, isLanding, setIsBurgerOpened }) {
  // вид активной ссылки отличается, в зависимости от того, открыто
  //бургер меню или нет

  const activeLink = `navigation__link_type_active-${
    isBurgerMenuOpened ? "mobile" : "desktop"
  }`;

  return (
    <nav
      className={`navigation navigation_state_${
        isBurgerMenuOpened ? "opened-pane" : "closed-pane"
      }`}
    >
      {
        // !isLanding &&
        // ??? на лэндинге по макету бугер меню не отображается ?
        <BurgerMenu
          isBurgerMenuOpened={isBurgerMenuOpened}
          onClickBurger={onClickBurger}
        />
      }
      <ul
        className={`navigation__list navigation__list-pane_state_${
          isBurgerMenuOpened ? "opened" : "closed"
        } 
                              navigation__list_state_${
                                isBurgerMenuOpened ? "opened" : "closed"
                              }`}
      >
        <div
          className={`navigation__films-block navigation__films-block_state_${
            isBurgerMenuOpened ? "opened-pane" : "closed-pane"
          }`}
        >
          {isBurgerMenuOpened && (
            <li className="navigation__item">
              <NavLink
                exact
                to="/"
                className="navigation__link"
                activeClassName={activeLink}
                onClick={() => {setIsBurgerOpened(false);}}
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
              onClick={() => {setIsBurgerOpened(false);}}
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
              onClick={() => {setIsBurgerOpened(false);}}
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
