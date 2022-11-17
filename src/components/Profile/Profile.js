import React from "react";

import "./Profile.css";

function Profile() {
  return (
    <main className="profile">
      <form className="profile__form" name="profile">
        <h1 className="profile__form-title">Привет, Виталий!</h1>
        <div className="profile__control-box">
          <label className="profile__form-label" htmlFor="name">
            Имя
          </label>
          <input
            className="profile__form-input"
            name="username"
            type="text"
            value="Виталий"
          />          
        </div>
        <div className="profile__control-box profile__control-box_no_border">
          <label className="profile__form-label" htmlFor="email">
            E-mail
          </label>
          <input
            className="profile__form-input"
            name="email"
            type="text"
            value="pochta@yandex.ru"
          />          
        </div>
        <div className="profile__form-footer">
          <button type="submit" class="profile__button">
            Редактировать
          </button>
          <button type="button" class="profile__button profile__button-logout">
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </main>
  );
}

export default Profile;
