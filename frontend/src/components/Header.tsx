import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/store";
import styles from "./Header.module.css";
import logout from "../assets/icons/logout.svg";
import profileImage from "../assets/images/profile-image.png";
import { logoutAction } from "../features/user/userSlice";
import { baseURL } from "../api";

const Header = ({ onCloseMenu }) => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userImage = user?.profile_image
    ? `${baseURL}${user.profile_image}`
    : profileImage;

  function handleLogout() {
    dispatch(logoutAction());
    navigate("/login");
  }

  function handleSubmit(event) {
    event.preventDefault();
    navigate(`/search?q=${event.target[0].value}`);
  }

  return (
    <header>
      <div className={styles["menu-logo-wrapper"]}>
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
        <Link to="/" className={styles.logo}>
          MID.IA
        </Link>
      </div>
      {!user ? (
        <>
          <div className={styles.login}>
            <Link to="/login" className="btn">
              Login
            </Link>
            <Link to="/signup" className="btn secondary">
              Cadastrar
            </Link>
          </div>
        </>
      ) : (
        <>
          <form className={styles.search} onSubmit={handleSubmit}>
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
          <div className={styles.login}>
            <Link className={styles.account} to="/account">
              <img className={styles["img-user"]} src={userImage} alt="Image" />
              <span>{user.first_name}</span>
            </Link>
            <button className={styles["logout-btn"]} onClick={handleLogout}>
              <img className={styles.logout} src={logout} alt="Logout" />
            </button>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
