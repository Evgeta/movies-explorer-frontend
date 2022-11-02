import React from "react";

import "./NotFoundPage.css";

function NotFoundPage() {
  return (
    <main className="not-found-page">
      <div className="not-found-page__texts-container">
        <h1 className="not-found-page__title">404</h1>
        <p className="not-found-page__subtitle">Страница не найдена</p>
      </div>
      <button className="not-found-page__back-button">Назад</button>
    </main>
  );
}

export default NotFoundPage;
