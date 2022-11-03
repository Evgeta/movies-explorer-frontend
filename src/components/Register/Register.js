import React from "react";
import { Link } from "react-router-dom";

import "./Register.css";

import logo from "../../images/logo.svg";

function Register() {
  return (
    <main className="register">
      <form className="register__form" name="register">
        <Link to="/" className="register__link">
          <img
            src={logo}
            alt="Логотип Movies Explorer"
            className="register__logo"
          />
        </Link>
        <h1 className="register__form-title">Добро пожаловать!</h1>
        <div className="register__form-fieldset">
          <label className="register__form-label" htmlFor="name">
            Имя
          </label>
          <input className="register__form-input" name="username" type="text" />
        </div>
        <div className="register__form-fieldset">
          <label className="register__form-label" htmlFor="email">
            E-mail
          </label>
          <input className="register__form-input" name="email" type="text" />
        </div>
        <div className="register__form-fieldset">
          <label className="register__form-label" htmlFor="password">
            Пароль
          </label>
          <input className="register__form-input" name="password" type="text" />
          <span className="register__error">Что-то пошло не так...</span>
        </div>
        <div className="register__form-footer">
          <button type="submit" className="register__button">
            Зарегистрироваться
          </button>
          <span className="register__already">
            Уже зарегистрированы?&nbsp;
            <Link to="/signin" className="register__enter-link">
              Войти
            </Link>
          </span>
        </div>
      </form>
    </main>
  );
}

export default Register;
