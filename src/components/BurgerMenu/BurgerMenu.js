import React from "react";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";

import "./BurgerMenu.css";

function BurgerMenu({ isBurgerMenuOpened, onClickBurger}) {
  //проверка ширины экрана, определение, когда нужно отображать бургер-меню
  const needShowBurger = useMediaQuery({ query: `(max-width: 768px)` });

  function handleOnClickBurger() {
    onClickBurger();
  }

  useEffect(() => {
    if (!needShowBurger && isBurgerMenuOpened) {
      handleOnClickBurger();
    }
  }, [isBurgerMenuOpened, needShowBurger, onClickBurger]);

  return (
    <button
      type="button"
      className={`burger-menu burger-menu_type_${isBurgerMenuOpened ? "opened" : "closed"}`}
      onClick={handleOnClickBurger}
    />
  );
}

export default BurgerMenu;
