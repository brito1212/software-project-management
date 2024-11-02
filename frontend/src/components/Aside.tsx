import { Link } from "react-router-dom";

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
          <li>
            <Link to="/" className="btn primary">
              <img src={homeIcon} alt="Home" width="25px" height="25px" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/list" className="btn">
              <img src={listIcon} alt="Lista" width="25px" height="25px" />
              <span>Lista</span>
            </Link>
          </li>
          <li>
            <Link to="/movies" className="btn">
              <img src={moviesIcon} alt="Filmes" width="25px" height="25px" />
              <span>Filmes</span>
            </Link>
          </li>
          <li>
            <Link to="/series" className="btn">
              <img src={seriesIcon} alt="Séries" width="25px" height="25px" />
              <span>Séries</span>
            </Link>
          </li>
          <li>
            <Link to="/games" className="btn">
              <img src={gamesIcon} alt="Jogos" width="25px" height="25px" />
              <span>Jogos</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.line}></div>
      <div className={styles.following}>
        <p>Seguindo</p>
        <ul>
          <li>
            <Link to={""}>
              <div className={styles.photo}></div>
              <span>Jorge Christino</span>
            </Link>
          </li>
          <li>
            <Link to={""}>
              <div className={styles.photo}></div>
              <span>Jorge Christino</span>
            </Link>
          </li>
          <li>
            <Link to={""}>
              <div className={styles.photo}></div>
              <span>Jorge Christino</span>
            </Link>
          </li>
          <li>
            <Link to={""}>
              <div className={styles.photo}></div>
              <span>Jorge Christino</span>
            </Link>
          </li>
          <li>
            <Link to={""}>
              <div className={styles.photo}></div>
              <span>Jorge Christino</span>
            </Link>
          </li>
          <li>
            <Link to={""}>
              <div className={styles["chevron-down"]}>
                <img src={chevronDown} />
              </div>
              <span>Carregar mais</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Aside;
