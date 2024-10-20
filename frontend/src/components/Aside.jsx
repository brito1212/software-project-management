// Icons
import React from "react";
import homeIcon from "../assets/icons/home-icon.svg";
import listIcon from "../assets/icons/heart-icon.svg";
import moviesIcon from "../assets/icons/movies-icon.svg";
import seriesIcon from "../assets/icons/series-icon.svg";
import gamesIcon from "../assets/icons/games-icon.svg";
import chevronDown from "../assets/icons/chevron-down.svg";

import styles from "./Aside.module.css";

const Aside = ({ isMenuClosed }) => {
  return (
    <aside className={isMenuClosed ? styles.close : ""}>
      <div className={styles.explore}>
        <p>Explorar</p>
        <ul>
          <li className="btn primary">
            <img src={homeIcon} alt="Home" width="25px" height="25px" />
            <span>Home</span>
          </li>
          <li className="btn">
            <img src={listIcon} alt="Lista" width="25px" height="25px" />
            <span>Lista</span>
          </li>
          <li className="btn">
            <img src={moviesIcon} alt="Filmes" width="25px" height="25px" />
            <span>Filmes</span>
          </li>
          <li className="btn">
            <img src={seriesIcon} alt="Séries" width="25px" height="25px" />
            <span>Séries</span>
          </li>
          <li className="btn">
            <img src={gamesIcon} alt="Jogos" width="25px" height="25px" />
            <span>Jogos</span>
          </li>
        </ul>
      </div>
      <div className={styles.line}></div>
      <div className={styles.following}>
        <p>Seguindo</p>
        <ul>
          <li>
            <div className={styles.photo}></div>
            <span>Jorge Christino</span>
          </li>
          <li>
            <div className={styles.photo}></div>
            <span>Jorge Christino</span>
          </li>
          <li>
            <div className={styles.photo}></div>
            <span>Jorge Christino</span>
          </li>
          <li>
            <div className={styles.photo}></div>
            <span>Jorge Christino</span>
          </li>
          <li>
            <div className={styles.photo}></div>
            <span>Jorge Christino</span>
          </li>
          <li className={styles["load-more"]}>
            <button className={styles["chevron-down"]}>
              <img src={chevronDown} />
            </button>
            <span>Carregar mais</span>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Aside;
