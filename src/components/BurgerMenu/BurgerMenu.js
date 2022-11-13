import React from "react";

import "./BurgerMenu.css";

function BurgerMenu({isBurgerMenuOpened, onClickBurger }) {
  return(
    <button
      className={`burger-menu burger-menu_type_${isBurgerMenuOpened ? "opened" : "closed"}`}
      type="button"
      onClick={ onClickBurger }/>
  )
}

export default BurgerMenu;

