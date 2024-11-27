import { useNavigate } from "react-router-dom";
import styles from "./ListProfile.module.css";
import moviesIcon from "../../assets/icons/movies-icon.svg";

const ListProfile = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div className={styles["list-container"]}>
      <h2>Listas de {user.username}</h2>
      {user?.listas.length != 0 ? (
        user?.listas.map((lista) => (
          <div
            className={styles["list-wrapper"]}
            key={lista.id}
            onClick={() => navigate(`/list/${lista.id}`)}
          >
            <div className={styles["midias-container"]}>
              <div>
                {lista.midias[0] ? (
                  <img
                    className={styles.banner}
                    src={`${lista.midias[0]?.banner}`}
                    alt={lista.midias[0]?.title}
                  />
                ) : (
                  <div></div>
                )}
              </div>
              <div className={styles.media}>
                {lista.midias[1] ? (
                  <img
                    className={styles.banner}
                    src={`${lista.midias[1]?.banner}`}
                    alt={lista.midias[1]?.title}
                  />
                ) : (
                  <></>
                )}
              </div>
              <div className={styles.media}>
                {lista.midias[2] ? (
                  <img
                    className={styles.banner}
                    src={`${lista.midias[2]?.banner}`}
                    alt={lista.midias[2]?.title}
                  />
                ) : (
                  <></>
                )}
              </div>
              {lista.midias.length == 0 && (
                <>
                  <div className={styles.banner}></div>
                  <div className={styles.noMedias}>
                    <img
                      src={moviesIcon}
                      alt="Filmes"
                      width="100px"
                      height="100px"
                    />
                  </div>
                </>
              )}
            </div>
            <div className={styles["lista-info"]}>
              <h3>{lista.name}</h3>
              <p>{lista.description}</p>
            </div>
          </div>
        ))
      ) : (
        <p>{user.username} possui nenhuma lista.</p>
      )}
    </div>
  );
};

export default ListProfile;
