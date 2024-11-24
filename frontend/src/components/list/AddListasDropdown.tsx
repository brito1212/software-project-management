import {
  createListaAction,
  updateListaAction,
} from "../../features/lista/listaSlice";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { useNavigate } from "react-router-dom";
import styles from "./AddListasDropdown.module.css";

const AddListasDropdown = ({ showListas, midiaId }) => {
  const { user } = useAppSelector((state) => state.user);
  const { listas } = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleCreateList() {
    const newLista = {
      name: "Minha Lista",
      description: "Adicione uma descrição...",
      midias: [midiaId],
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

  function addToLista(id: number) {
    const lista = listas.find((lista) => lista.id == id);
    const data = {
      id: lista.id,
      name: lista.name,
      description: lista.description,
      midias: [...lista.midias.map((midia) => midia.id), midiaId],
    };
    dispatch(
      updateListaAction(
        data,
        () => {
          navigate(`/list/${lista.id}`);
        },
        () => {}
      )
    );
  }

  return (
    <ul
      className={
        showListas
          ? `${styles.config} ${styles["dropdown-anime"]}`
          : `${styles.config}`
      }
    >
      {listas.length !== 0 ? (
        listas.map((lista) => (
          <li key={lista.id}>
            <button
              className={styles.btnAddLista}
              onClick={() => addToLista(lista.id)}
            >
              <span>{lista.name}</span>
            </button>
          </li>
        ))
      ) : (
        <li>
          <button className={styles.btnAddLista} onClick={handleCreateList}>
            <span>Criar lista</span>
          </button>
        </li>
      )}
    </ul>
  );
};

export default AddListasDropdown;
