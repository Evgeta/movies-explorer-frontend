import React from 'react';

import './Techs.css';

function Techs() {
  return (
    <section className="techs">
      <div className="techs__container">
        <h2 className="techs__title">Технологии</h2>
        <h3 className="techs__quantity">7 технологий</h3>
        <p className="techs__description">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="techs__list">
          <li className="techs__list-item">
            <p className="techs__name">HTML</p>
          </li>
          <li className="techs__list-item">
            <p className="techs__name">CSS</p>
          </li>
          <li className="techs__list-item">
            <p className="techs__name">JS</p>
          </li>
          <li className="techs__list-item">
            <p className="techs__name">React</p>
          </li>
          <li className="techs__list-item">
            <p className="techs__name">Git</p>
          </li>
          <li className="techs__list-item">
            <p className="techs__name">Express.js</p>
          </li>
          <li className="techs__list-item">
            <p className="techs__name">mongoDB</p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;