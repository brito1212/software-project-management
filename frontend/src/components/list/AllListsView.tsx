import { Link, useNavigate } from "react-router-dom";
import addIcon from "../../assets/icons/add-icon.svg";
import styles from "./AllListsView.module.css";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { createListaAction } from "../../features/lista/listaSlice";
import { baseURL } from "../../api";
import moviesIcon from "../../assets/icons/movies-icon.svg";

const AllListsView = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);

  function handleCreateList() {
    console.log(user?.listas);
    const newLista = {
      name: "Minha Lista",
      description: "Adicione uma descrição...",
      midias: [],
      user: user?.id,
    };
    dispatch(
      createListaAction(
        newLista,
        () => {
          navigate("/list");
        },
        () => {
          console.log("erro");
        }
      )
    );
  }

  return (
    <>
      <div className={styles.columns}>
        <h1>Minhas Listas</h1>
        {user?.listas.length != 0 ? (
          user?.listas.map((lista) => (
            <div
              className={styles["list-wrapper"]}
              key={lista.id}
              onClick={() => navigate(`/list/${lista.id}`)}
            >
              <div className={styles["midias-container"]}>
                <div>
                  <img
                    className={styles.banner}
                    src={
                      lista.midias[0]?.banner
                        ? `${baseURL}${lista.midias[0]?.banner}`
                        : "https://fakeimg.pl/220x320?text=+"
                    }
                    alt={lista.midias[0]?.title}
                  />
                </div>
                <div className={styles.media}>
                  <img
                    className={styles.banner}
                    src={
                      lista.midias[1]?.banner
                        ? `${baseURL}${lista.midias[1]?.banner}`
                        : "https://fakeimg.pl/220x320?text=+"
                    }
                    alt={lista.midias[1]?.title}
                  />
                </div>
                <div className={styles.media}>
                  <img
                    className={styles.banner}
                    src={
                      lista.midias[2]?.banner
                        ? `${baseURL}${lista.midias[2]?.banner}`
                        : "https://fakeimg.pl/220x320?text=+"
                    }
                    alt={lista.midias[2]?.title}
                  />
                </div>
                {lista.midias.length == 0 && (
                  <div className={styles.noMedias}>
                    <img
                      src={moviesIcon}
                      alt="Filmes"
                      width="100px"
                      height="100px"
                    />
                  </div>
                )}
              </div>
              <div className={styles["lista-info"]}>
                <h3>{lista.name}</h3>
                <p>{lista.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Você possui nenhuma lista.</p>
        )}
      </div>

      <div className={styles.columns}>
        <h3>Crie sua própria lista:</h3>
        <Link to="#" className="btn primary" onClick={handleCreateList}>
          <img src={addIcon} alt="Nova Lista" width="35px" height="35px" />
          <span>Nova Lista</span>
        </Link>
      </div>
    </>
  );
};

export default AllListsView;
