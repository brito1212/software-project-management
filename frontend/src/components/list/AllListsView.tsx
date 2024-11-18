import { Link, useNavigate } from "react-router-dom";
import addIcon from "../../assets/icons/add-icon.svg";
import styles from "./AllListsView.module.css";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { createListaAction } from "../../features/lista/listaSlice";

const AllListsView = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);

  function handleCreateList() {
    console.log(user?.listas);
    const newLista = {
      name: "Nome Lista",
      description: "Descricao",
      midias: [],
      user: user?.id,
    };
    dispatch(
      createListaAction(
        newLista,
        () => {
          navigate("/1");
          console.log("deubom");
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
            <div className={styles["list-wrapper"]} key={lista.id}>
              <div className={styles["midias-container"]}>
                {lista.midias.map((midia) => (
                  <div key={midia.id}>
                    <img
                      className={styles.banner}
                      src={midia.banner}
                      alt={midia.name}
                    />
                  </div>
                ))}
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
