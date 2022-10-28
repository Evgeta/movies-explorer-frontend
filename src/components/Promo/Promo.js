import React from 'react';

import './Promo.css';
import landinglogo from '../../images/landing-logo.svg';


function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <div className="promo__project-info">
          <h1 className="promo__title">
            Учебный проект студента факультета Веб-разработки.
          </h1>
          <p className="promo__description">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
          <a href="" target="_blank" className="promo__learn-more-button">
            Узнать больше
          </a>
        </div>
        <img src={landinglogo} alt="логотип - Воды земного шара из надписей WEB" className="promo__logo" />
      </div>
    </section>
  );
}

export default Promo;