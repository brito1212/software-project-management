import { Link, useLocation } from "react-router-dom";

// Icons
import homeIcon from "../assets/icons/home-icon.svg";
import listIcon from "../assets/icons/heart-icon.svg";
import moviesIcon from "../assets/icons/movies-icon.svg";
import seriesIcon from "../assets/icons/series-icon.svg";
import gamesIcon from "../assets/icons/games-icon.svg";
import chevronDown from "../assets/icons/chevron-down.svg";

import styles from "./Aside.module.css";
import { useAppSelector } from "../app/store";

const Aside = ({ isMenuClosed }) => {
  const { user } = useAppSelector((state) => state.user);
  const location = useLocation();

  return (
    <aside className={isMenuClosed ? styles.close : ""}>
      <div className={styles.explore}>
        <p>Explorar</p>
        <ul>
          <li>
            <Link
              to="/"
              className={location.pathname == "/" ? "btn primary" : "btn"}
            >
              <img src={homeIcon} alt="Home" width="25px" height="25px" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/list"
              className={location.pathname == "/list" ? "btn primary" : "btn"}
            >
              <img src={listIcon} alt="Lista" width="25px" height="25px" />
              <span>Lista</span>
            </Link>
          </li>
          <li>
            <Link
              to="/movies"
              className={location.pathname == "/movies" ? "btn primary" : "btn"}
            >
              <img src={moviesIcon} alt="Filmes" width="25px" height="25px" />
              <span>Filmes</span>
            </Link>
          </li>
          <li>
            <Link
              to="/series"
              className={location.pathname == "/series" ? "btn primary" : "btn"}
            >
              <img src={seriesIcon} alt="Séries" width="25px" height="25px" />
              <span>Séries</span>
            </Link>
          </li>
          <li>
            <Link
              to="/games"
              className={location.pathname == "/games" ? "btn primary" : "btn"}
            >
              <img src={gamesIcon} alt="Jogos" width="25px" height="25px" />
              <span>Jogos</span>
            </Link>
          </li>
        </ul>
      </div>
      {user && (
        <>
          <div className={styles.line}></div>
          <div className={styles.following}>
            <p>Seguindo</p>
            {user.seguindo.length !== 0 ? (
              <ul>
                {user.seguindo.map((user, index) => (
                  <li key={index}>
                    <Link to={`/profile/${user.username}`}>
                      <div className={styles.photo}>
                        <img
                          src={user.profile_image}
                          alt={`${user.username} Image`}
                        />
                      </div>
                      <span>
                        {" "}
                        {user.first_name} {user.last_name}
                      </span>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to={""}>
                    <div className={styles["chevron-down"]}>
                      <img src={chevronDown} />
                    </div>
                    <span>Carregar mais</span>
                  </Link>
                </li>
              </ul>
            ) : (
              <p className={styles.message}>Nenhum amigo online.</p>
            )}
          </div>
        </>
      )}
    </aside>
  );
};

export default Aside;
