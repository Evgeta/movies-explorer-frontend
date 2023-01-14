import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import "./Register.css";

import logo from "../../images/logo.svg";
import useFormWithValidation from "../../hooks/useFormWithValidation.js";

function Register({ handleRegistration, formErrorMessage }) {
  const {
    values,
    handleChange,
    resetForm,
    errors,
    isValid,
  } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    handleRegistration(values.username, values.password, values.email);
  }

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <main className="register">
      <form className="register__form" name="register" onSubmit={handleSubmit}>
        <Link to="/" className="register__logo-link">
          <img
            src={logo}
            alt="Логотип Movies Explorer"
            className="register__logo"
          />
        </Link>
        <h1 className="register__form-title">Добро пожаловать!</h1>
        <div className="register__input-block">
          <label className="register__form-label" htmlFor="name">
            Имя
          </label>
          <input
            className={`register__form-input ${errors.username &&
              "register__form-input_error"}`}
            name="username"
            type="text"
            required
            value={values.username || ""}
            onChange={handleChange}
            minLength="2"
            maxLength="30"
            pattern="^[A-Za-zа-яА-ЯёЁ0-9\s-]+$"
          />
          <span className="register__error">{errors.username || ""}</span>
        </div>
        <div className="register__input-block">
          <label className="register__form-label" htmlFor="email">
            E-mail
          </label>
          <input
            className={`register__form-input ${errors.email &&
              "register__form-input_error"}`}
            name="email"
            type="text"
            required
            value={values.email || ""}
            onChange={handleChange}
            pattern="[a-z0-9]+@[a-z]+\.[a-z]{2,3}"
          />
          <span className="register__error">{errors.email || ""}</span>
        </div>
        <div className="register__input-block">
          <label className="register__form-label" htmlFor="password">
            Пароль
          </label>
          <input
            className="register__form-input"
            name="password"
            type="text"
            required
            value={values.password || ""}
            onChange={handleChange}
          />
          <span className="register__error">{errors.passsword || ""}</span>
        </div>
        <span className="register__error">{formErrorMessage}</span>
        <div className="register__form-footer">
          <button
            type="submit"
            className={`register__button ${!isValid &&
              "register__button_disabled"}`}
            disabled={!isValid}
          >
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
