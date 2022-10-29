import React from "react";

import './Register.css';

import logo from '../../images/logo.svg';

function Register() {
  
  return (
    <main className="register">
      <form className="register__form" name="register">
          <img  src={logo} alt="Логотип Movies Explorer" className="register__logo" />
          <h1 className="register__form-title">Добро пожаловать!</h1>
          <div className="register__form-fieldset">          
            <label className="register__form-label" htmlFor="name">Имя</label>
            <input className="register__form-input" name="username" type="text" value=""/>
            <span className="register__error"></span>            
          </div>
          <div classNameName="register__form-fieldset">
            <label className="register__form-label" htmlFor="email">E-mail</label>
            <input className="register__form-input" name="email" type="text" value=""/>
            <span className="register__error"></span>            
          </div>        
          <div className="register__form-fieldset">
            <label className="register__form-label" htmlFor="password">Пароль</label>
            <input className="register__form-input" name="password" type="text" value=""/>
            <span className="register__error"></span>            
          </div>        
         <div className="register__form-footer">
           <button type="submit" className="register__button">Зарегистрироваться</button>
           <span className="register__already">
                Уже зарегистрированы?&nbsp;
                <a className="register__enter-link">
                Войти
                </a>
            </span>
         </div>
      </form>
    </main>
  );
}

export default Register;