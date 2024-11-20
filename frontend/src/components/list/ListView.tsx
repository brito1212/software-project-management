import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { closeModal, openModal } from "../../features/ui/uiSlice";
import EditListModal from "./EditListModal";
import styles from "./ListView.module.css";
import MoreOptionsIcon from "../icons/MoreOptionsIcon";
import editIcon from "../../assets/icons/pencil-edit-icon.svg";
import deleteIcon from "../../assets/icons/x-symbol.svg";
import { baseURL } from "../../api";
import DeleteListModal from "./DeleteListModal";
import Close from "../helper/Close";
import { updateListaAction } from "../../features/lista/listaSlice";

const ListView = () => {
  const { id } = useParams<{ id: string }>();
  const { modalData } = useAppSelector((state) => state.ui);
  const { listas } = useAppSelector((state) => state.user.user);
  const lista = listas.find((lista) => lista.id == id);

  const [moreOptions, setMoreOptions] = React.useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleEditLista() {
    dispatch(openModal("edit"));
  }

  function handleDeleteLista() {
    dispatch(openModal("delete"));
  }

  function handleDeleteMidia(idMidia) {
    const data = {
      id: lista.id,
      midias: [
        ...lista.midias
          .filter((midia) => midia.id != idMidia)
          .map((midia) => midia.id),
      ],
    };
    console.log(data);
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

  React.useEffect(() => {
    dispatch(closeModal());
  }, [dispatch]);

  return (
    <>
      {modalData === "edit" && <EditListModal lista={lista} />}
      {modalData === "delete" && <DeleteListModal id={lista.id} />}
      <div className={styles["list-view"]}>
        {lista ? (
          <>
            <h1>{lista.name}</h1>
            <div className={styles["description-container"]}>
              <p>{lista.description}</p>
              <button
                className={styles["more-options"]}
                onClick={() => setMoreOptions(!moreOptions)}
              >
                <MoreOptionsIcon width={35} height={28} color={"#727278"} />
              </button>
            </div>

            <div className={styles["list-wrapper"]}>
              <ul
                className={
                  moreOptions
                    ? `${styles.config} ${styles["dropdown-anime"]}`
                    : `${styles.config}`
                }
              >
                <li>
                  <Link to="#" onClick={handleEditLista}>
                    <img
                      src={editIcon}
                      alt="Editar detalhes"
                      width="15px"
                      height="15px"
                    />
                    <span>Editar detalhes</span>
                  </Link>
                </li>
                <li>
                  <Link to="#" onClick={handleDeleteLista}>
                    <img
                      src={deleteIcon}
                      alt="Apagar Lista"
                      width="15px"
                      height="15px"
                    />
                    <span>Apagar lista</span>
                  </Link>
                </li>
              </ul>
              {lista.midias.length !== 0 ? (
                lista.midias.map((midia) => (
                  <div
                    key={midia.id}
                    className={styles.midia}
                    onClick={() => navigate(`/midia/movie/${midia.id}`)}
                  >
                    <Close
                      handleClose={(e) => {
                        e.stopPropagation();
                        handleDeleteMidia(midia.id);
                      }}
                      extraClass={styles.closeMidia}
                    />
                    <img src={`${baseURL}${midia.banner}`} alt={midia.title} />
                    <p>{midia.title}</p>
                  </div>
                ))
              ) : (
                <div className={styles.noList}>Insira mídias na sua lista.</div>
              )}
            </div>
          </>
        ) : (
          <div className={styles.error}>
            <p>Ops! Lista não encontrada.</p>
            <Link to="/list" className="btn primary">
              <span>Voltar para listas</span>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default ListView;
