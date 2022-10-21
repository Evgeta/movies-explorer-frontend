import React from 'react';

import './Portfolio.css';

function Portfolio() {
  return (
    <section class="portfolio">
      <div class="portfolio__container">
        <h2 class="portfolio__title">Портфолио</h2>
        <ul class="portfolio__projects-list">
          <li class="portfolio__project">
            <a href="https://github.com/evgeta/how-to-learn" target="_blank" class="portfolio__link">
              Статичный сайт
            </a>
          </li>
          <li class="portfolio__project">
            <a href="https://github.com/evgeta/russian-travel" target="_blank" class="portfolio__link">
              Адаптивный сайт
            </a>
          </li>
          <li class="portfolio__project">
            <a href="https://github.com/evgeta/react-mesto-api-full" target="_blank" class="portfolio__link">
              Одностраничное приложение
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;