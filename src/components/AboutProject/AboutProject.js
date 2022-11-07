import React from "react";

import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="about-project">
      <div className="about-project__container">
        <h2 id="about-project" className="about-project__title">О проекте</h2>
        <ul className="about-project__thesis-list">
          <li className="about-project__thesis">
            <h3 className="about-project__thesis-title">
              Дипломный проект включал 5 этапов
            </h3>
            <p className="about-project__thesis-content">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </li>
          <li className="about-project__thesis">
            <h3 className="about-project__thesis-title">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="about-project__thesis-content">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </li>
        </ul>
        <div className="about-project__timeline">
          <div className="about-project__backend">
            <span className="about-project__backend-duration">1 неделя</span>
            <span className="about-project__stage-title">Back-end</span>
          </div>
          <div className="about-project__frontend">
            <span className="about-project__frontend-duration">4 недели</span>
            <span className="about-project__stage-title">Front-end</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
