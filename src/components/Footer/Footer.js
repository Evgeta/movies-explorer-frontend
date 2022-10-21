import React from 'react';

import './Footer.css';

function Footer() {
  return (
    <footer class="footer">
    <div class="footer__container">
      <h2 class="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div class="footer__info">
        <p class="footer__copyright">&copy; {(new Date()).getFullYear()}</p>
        <ul class="footer__links-list">
          <li>
            <a href="https://practicum.yandex.ru/" target="_blank" class="footer__link">
              Яндекс.Практикум
            </a>
          </li>
          <li>
            <a href="https://github.com/evgeta" target="_blank" class="footer__link">
              Github
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
  );
}

export default Footer;