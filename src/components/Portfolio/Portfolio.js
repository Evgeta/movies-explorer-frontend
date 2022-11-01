import React from 'react';

import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__container">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__projects-list">
          <li className="portfolio__project">
            <a href="https://github.com/evgeta/how-to-learn" target="_blank" rel="noopener noreferrer" className="portfolio__link">
              Статичный сайт
            </a>
          </li>
          <li className="portfolio__project">
            <a href="https://github.com/evgeta/russian-travel" target="_blank" rel="noopener noreferrer" className="portfolio__link">
              Адаптивный сайт
            </a>
          </li>
          <li className="portfolio__project">
            <a href="https://github.com/evgeta/react-mesto-api-full" target="_blank" rel="noopener noreferrer" className="portfolio__link">
              Одностраничное приложение
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;