import styles from "./Header.module.css";

const Header = ({ onCloseMenu }) => {
  return (
    <header>
      <div className={styles.start}>
        <div className={styles.menu}>
          <label>
            <input type="checkbox" onClick={onCloseMenu} />
            <svg viewBox="15 19 70 70" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="30" />
              <path className={styles["line--2"]} d="M0 50h99" />
              <path
                className={styles["line--3"]}
                d="M0 30l28 28c2 2 2 2 7 2h64"
              />
              <path
                className={styles["line--1"]}
                d="M0 70l28-28c2-2 2-2 7-2h64"
              />
            </svg>
          </label>
        </div>
        <a href="/" className={styles.logo}>
          Nome Site
        </a>
      </div>
      <form className={styles.center}>
        <input
          name="searchField"
          id="searchField"
          className={styles["search-field"]}
          type="text"
          placeholder="Pesquisar mídia..."
        />
        <input
          type="submit"
          id="magnifyingGlass"
          className={styles["magnifying-glass"]}
          value="Buscar"
        />
      </form>
      <div className={styles.end}>
        <button className="btn">Login</button>
        <button className="btn secondary">Cadastrar</button>
      </div>
    </header>
  );
};

export default Header;
