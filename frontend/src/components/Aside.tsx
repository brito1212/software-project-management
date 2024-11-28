import { Link, useLocation } from "react-router-dom";
import React from "react";

// Icons
import homeIcon from "../assets/icons/home-icon.svg";
import listIcon from "../assets/icons/heart-icon.svg";
import moviesIcon from "../assets/icons/movies-icon.svg";
import seriesIcon from "../assets/icons/series-icon.svg";
import gamesIcon from "../assets/icons/games-icon.svg";
import chevronDown from "../assets/icons/chevron-down.svg";
import profileImage from "../assets/images/profile-image.png";

import styles from "./Aside.module.css";
import { useAppDispatch, useAppSelector } from "../app/store";
import { setSelectedTypes } from "../features/filter/filterSlice";
import { User } from "../features/user/user.type";
import { getUserById } from "../features/user/userApi";
import { baseURL } from "../api";

const Aside = ({ isMenuClosed }) => {
  const { user } = useAppSelector((state) => state.user);
  const [seguindo, setSeguindo] = React.useState<User[]>([]);
  const location = useLocation();

  const dispatch = useAppDispatch();
  const selectedTypes = useAppSelector((state) => state.filter.selectedTypes);

  const getFriends = async () => {
    try {
      if (!user?.seguindo || user.seguindo.length === 0) return;

      const friends = await Promise.all(
        user.seguindo.map((userId) => getUserById(userId))
      );

      setSeguindo(friends);
    } catch (error) {
      console.error("Erro ao buscar amigos:", error);
    }
  };

  React.useEffect(() => {
    getFriends();
  }, [user?.seguindo]);

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
              to="/search?q="
              className={
                selectedTypes.includes("movie") &&
                selectedTypes.length <= 1 &&
                location.pathname == "/search"
                  ? "btn primary"
                  : "btn"
              }
              onClick={() => dispatch(setSelectedTypes(["movie"]))}
            >
              <img src={moviesIcon} alt="Filmes" width="25px" height="25px" />
              <span>Filmes</span>
            </Link>
          </li>
          <li>
            <Link
              to="/search?q="
              className={
                selectedTypes.includes("serie") &&
                selectedTypes.length <= 1 &&
                location.pathname == "/search"
                  ? "btn primary"
                  : "btn"
              }
              onClick={() => dispatch(setSelectedTypes(["serie"]))}
            >
              <img src={seriesIcon} alt="Séries" width="25px" height="25px" />
              <span>Séries</span>
            </Link>
          </li>
          <li>
            <Link
              to="/search?q="
              className={
                selectedTypes.includes("game") &&
                selectedTypes.length <= 1 &&
                location.pathname == "/search"
                  ? "btn primary"
                  : "btn"
              }
              onClick={() => dispatch(setSelectedTypes(["game"]))}
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
                {seguindo.map((user, index) => (
                  <li key={index}>
                    <Link to={`/profile/${user.username}`}>
                      <div className={styles.photo}>
                        <img
                          src={
                            user.profile_image
                              ? `${baseURL}${user.profile_image}`
                              : profileImage
                          }
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
