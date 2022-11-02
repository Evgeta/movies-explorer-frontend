import React from "react";

// import avatar from '../../images/avatar.png';
import avatar_vitaly from "../../images/Vitaly.png";

import "./AboutMe.css";

function AboutMe() {
  return (
    <section className="about-me">
      <div className="about-me__container">
        <h2 className="about-me__title">Студент</h2>

        <div className="about-me__text-container">
          <div className="about-me__content">
            {/* <h3 className="about-me__name">Евгения</h3> */}
            <h3 className="about-me__name">Виталий</h3>
            <p className="about-me__specialization">
              Фронтенд-разработчик, 30 лет
            </p>
            {/* <p className="about-me__text">
            Я обожаю IT-технологии!
            Закончила университет по специальности "Прикладной математик, системный программист", но судьба занесла в
            "админку" и "обучение".
            Я много лет преподавала авторизованные курсы Microsoft по администрированию операционных систем и баз
            данных, разрабатывала учебные материалы.
            Хочу "вернуться к истокам" и заняться WEB-разработкой. Мне нравится созидать, и, мне нравятся
            современные подходы и инструменты WEB-разработки.
            Спасибо команде Яндекса за интересное обучение! Они - молодцы.
            </p> */}
            <p className="about-me__text">
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У
              меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
              бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
              Контур». После того, как прошёл курс по веб-разработке, начал
              заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
            <ul className="about-me__socials">
              <li>
                <a
                  href="https://github.com/Evgeta"
                  target="_blank"
                  className="about-me__social-link"
                  rel="noopener noreferrer"
                >
                  Github
                </a>
              </li>
            </ul>
          </div>
          <img
            className="about-me__avatar"
            src={avatar_vitaly}
            alt="Фотография Виталия"
          />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
