import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Register.css";

import logo from "../../images/logo.svg";

function Register({
  handleRegistration
}) {

  const [username, setUserName] = React.useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleUserNameChange(e) {
    setUserName(e.target.value);  
  }
  
  function handleEmailChange(e) {
    setEmail(e.target.value);  
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleRegistration(username, password, email);
  }


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
            className="register__form-input"
            name="username"
            type="text"
            required
            value={username}
            onChange={handleUserNameChange}     
            />
        </div>
        <div className="register__input-block">
          <label className="register__form-label" htmlFor="email">
            E-mail
          </label>
          <input 
            className="register__form-input" 
            name="email" 
            type="text"
            required
            value={email}
            onChange={handleEmailChange}     
            // placeholder="Email"       
            />
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
            value={password}
            onChange={handlePasswordChange}
          />
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
