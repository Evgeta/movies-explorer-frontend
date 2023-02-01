import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import "./Login.css";

import logo from "../../images/logo.svg";
import useFormWithValidation from "../../hooks/useFormWithValidation.js";

function Login({ handleLogin, loginFormErrorMessage, setLoginFormErrorMessage }) {
  const {
    values,
    handleChange,
    resetForm,
    errors,
    isValid,
  } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin(values.email, values.password);
  }

  function handleCleanAndChange(e) {
    setLoginFormErrorMessage("");
    handleChange(e);
  }

  useEffect(() => {
    resetForm();
    setLoginFormErrorMessage("");
  }, [resetForm]);

  return (
    <main className="login">
      <form className="login__form" name="login" onSubmit={handleSubmit}>
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
          <input
            className={`login__form-input ${errors.email &&
              "login__form-input_error"}`}
            name="email"
            type="email"
            required
            value={values.email || ""}
            onChange={handleCleanAndChange}
            pattern="[a-z0-9-]+@[a-z]+\.[a-z]{2,3}"
          />
          <span className="register__error">{errors.email || ""}</span>
        </div>
        <div className="login__labels-block">
          <label className="login__form-label" htmlFor="password">
            Пароль
          </label>
          <input
            className={`login__form-input ${errors.email &&
              "login__form-input_error"}`}
            name="password"
            type="password"
            required
            value={values.password || ""}
            onChange={handleCleanAndChange}
          />
          <span className="login__error">{errors.passsword || ""}</span>
        </div>
        <span className="login__error">{loginFormErrorMessage}</span>
        <div className="login__form-footer">
          <button
            type="submit"
            className={`login__button ${!isValid && "login__button_disabled"}`}
          >
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
