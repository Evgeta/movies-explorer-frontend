import React from 'react';

import avatar from '../../images/avatar.png';

import './AboutMe.css';

function AboutMe() {
  return (
    <section class="about-me">
    <div class="about-me__container">
        <h2 class="about-me__title">Студент</h2>
      
      <div class="about-me__text-container">
        <div class="about-me__content">
          <h3 class="about-me__name">Евгения</h3>
          <p class="about-me__specialization">Фронтенд-разработчик</p>
          <p class="about-me__text">
            Я обожаю IT-технологии!
            Закончила университет по специальности "Прикладной математик, системный программист", но судьба занесла в
            "админку" и "обучение".
            Я много лет преподавала авторизованные курсы Microsoft по администрированию операционных систем и баз
            данных, разрабатывала учебные материалы.
            Хочу "вернуться к истокам" и заняться WEB-разработкой. Мне нравится созидать, и, мне нравятся
            современные подходы и инструменты WEB-разработки.
            Спасибо команде Яндекса за интересное обучение! Они - молодцы.
            </p>
          
            <ul class="about-me__socials">
              <li>
                <a href="https://github.com/Evgeta" target="_blank" class="about-me__social-link">
                  Github
                </a>
              </li>
            </ul>
        </div>
        <img class="about-me__avatar" src={avatar} alt="Фотография Евгении Тарасюк" />
      </div>
    </div>
  </section>

    
  );
}

export default AboutMe;