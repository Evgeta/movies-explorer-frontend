import './NavTab.css';

function Navigation() {
    return (
      <header classNameName="header">
        <div classNameName="header__container">
          <img src="./images/logo.svg" alt="Логотип" />
          <nav className="nav-tab">
            <ul className="nav-tab__list">
              <li className="nav-tab__link">Регистрация</li>
              <li className="nav-tab__link nav-tab__link_signin">Войти</li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
  
  export default Navigation;
  