import React from 'react';

import './AboutProject.css';

function AboutProject() {
  return (
    <section class="about-project">
      <div class="about-project__container">
        <h2 class="about-project__title">О проекте</h2>
        <ul class="about-project__thesis-list">
          <li class="about-project__thesis">
            <h3 class="about-project__thesis-title">
              Дипломный проект включал 5 этапов
            </h3>
            <p class="about-project__thesis-content">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </li>

          <li class="about-project__thesis">
            <h3 class="about-project__thesis-title">
              На выполнение диплома ушло 5 недель
            </h3>
            <p class="about-project__thesis-content">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </li>
        </ul>
        <div class="about-project__timeline">
          <div class="about-project__backend">
            <span class="about-project__backend-duration">1 неделя</span>
            <span class="about-project__stage-title">Back-end</span>
          </div>
          <div class="about-project__frontend">
            <span class="about-project__frontend-duration">4 недели</span>
            <span class="about-project__stage-title">Front-end</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;