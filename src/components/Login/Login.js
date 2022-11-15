import React from "react";
import { Link } from "react-router-dom";

import "./Login.css";

import logo from "../../images/logo.svg";

function Login() {
  return (
    <main className="login">
      <form className="login__form" name="login">
        <Link to="/" className="login__logo-link">
          <img
            src={logo}
            alt="Логотип Movies Explorer"
            className="login__logo"
          />
        </Link>
        <h1 className="login__form-title">Рады видеть!</h1>
        <div className="login__labels-block">
          <label className="login__form-label" htmlFor="email">
            E-mail
          </label>
          <input className="login__form-input" name="email" type="email" />          
        </div>
        <div className="login__labels-block">
          <label className="login__form-label" htmlFor="password">
            Пароль
          </label>
          <input className="login__form-input" name="password" type="text" />          
        </div>
        <span className="login__error">При авторизации произошла ошибка. Токен не передан или передан не в том формате.</span>
        <div className="login__form-footer">
          <button type="submit" className="login__button">
            Войти
          </button>
          <span className="login__already">
            Ещё не зарегистрированы?&nbsp;
            <Link to="/signup" className="login__register-link">
              Регистрация
            </Link>
          </span>
        </div>
      </form>
    </main>
  );
}

export default Login;
