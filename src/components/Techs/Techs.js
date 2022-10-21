import React from 'react';

import './Techs.css';

function Techs() {
  return (
    <section class="techs">
      <div class="techs__container">
        <h2 class="techs__title">Технологии</h2>
        <h3 class="techs__quantity">7 технологий</h3>
        <p class="techs__description">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul class="techs__list">
          <li class="techs__list-item">
            <p class="techs__name">HTML</p>
          </li>
          <li class="techs__list-item">
            <p class="techs__name">CSS</p>
          </li>
          <li class="techs__list-item">
            <p class="techs__name">JS</p>
          </li>
          <li class="techs__list-item">
            <p class="techs__name">React</p>
          </li>
          <li class="techs__list-item">
            <p class="techs__name">Git</p>
          </li>
          <li class="techs__list-item">
            <p class="techs__name">Express.js</p>
          </li>
          <li class="techs__list-item">
            <p class="techs__name">mongoDB</p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;