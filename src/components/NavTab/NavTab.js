import './NavTab.css';

function Navigation() {
    return (
      <header className="header">
        <div className="header__container">
          <img src="./images/logo.svg" alt="Логотип" />
          <nav class="nav-tab">
            <ul class="nav-tab__list">
              <li class="nav-tab__link">Регистрация</li>
              <li class="nav-tab__link nav-tab__link_signin">Войти</li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
  
  export default Navigation;
  