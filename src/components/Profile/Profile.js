import React, { useEffect, useContext } from "react";

import "./Profile.css";

import {
  CurrentUserContext
} from '../../contexts/CurrentUserContext.js';

import useFormWithValidation from '../../hooks/useFormWithValidation.js';


function Profile({
   handleUpdateProfile,
   handleLogOut
}
) {

  const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();

 
  const currentUser = useContext(CurrentUserContext); 

  console.log('currentUser');
  console.log(currentUser);

  function handleSubmit(e) {
    e.preventDefault();
    console.log('values.name, values.email');
    console.log(values.name, values.email);
    handleUpdateProfile(values.name, values.email);
  }

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [currentUser, resetForm]);

  //данные не валидны или совпадают со старыми 
  const dataBadToSave = (!isValid || (currentUser.name === values.name && currentUser.email === values.email));
  

  return (
    <main className="profile">
      <form className="profile__form" name="profile" onSubmit={handleSubmit} noValidate>
        <h1 className="profile__form-title">
        {`Привет, ${currentUser.name}!`}</h1>
        <div className="profile__control-box">
          <label className="profile__form-label" htmlFor="name">
            Имя
          </label>
          <input
            className={`profile__form-input ${errors.username && 'profile__form-input_error'}`}
            name="name"
            type="text"
            value={values.name || ""}
            onChange={handleChange}     
            minLength="2"
            maxLength="30"
            required
          />  
          <span className="profile__error">{errors.name || ''}</span>        
        </div>
        <div className="profile__control-box profile__control-box_no_border">
          <label className="profile__form-label" htmlFor="email">
            E-mail
          </label>
          <input
            className={`profile__form-input ${errors.email && 'profile__form-input_error'}`}
            name="email"
            type="text"
            value={values.email || ""}
            onChange={handleChange}     
            pattern='[a-z0-9]+@[a-z]+\.[a-z]{2,3}'  
            required
          />          
          <span className="profile__error">{errors.email || ''}</span>        
        </div>
        <div className="profile__form-footer">
          <button 
              type="submit" 
              className={`profile__button ${dataBadToSave && 'profile__button_disabled'}`}
              disabled={dataBadToSave ? true : false }             
             >
            Редактировать
          </button>
          <button 
            type="button"  
            className="profile__button profile__button-logout"
            onClick={handleLogOut}
          >
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </main>
  );
}

export default Profile;
