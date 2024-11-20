import { useAppDispatch, useAppSelector } from "../../app/store";
import { closeModal } from "../../features/ui/uiSlice";
import styles from "./DeleteListModal.module.css";
import Close from "../helper/Close";
import { deleteListaAction } from "../../features/lista/listaSlice";
import { useNavigate } from "react-router-dom";

const DeleteListModal = ({ id }) => {
  const { modal } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleCloseModal(e) {
    e.preventDefault();
    dispatch(closeModal());
  }

  function handleOutsideClick(event) {
    if (event.target === event.currentTarget) dispatch(closeModal());
  }

  function handleDeleteLista(e) {
    e.preventDefault();
    dispatch(
      deleteListaAction(
        id,
        () => {
          dispatch(closeModal());
          navigate("/list");
        },
        () => {
          console.log("error");
        }
      )
    );
  }

  if (!modal) return null;
  return (
    <div className="modal" onClick={handleOutsideClick}>
      <form className={`${styles.form} anime-left`}>
        <h2 className={styles.title}>
          Tem certeza que deseja apagar essa lista?
        </h2>
        <Close handleClose={handleCloseModal} />
        <div className={styles.buttons}>
          <button className="btn primary red" onClick={handleDeleteLista}>
            Apagar
          </button>
          <button className="btn outline" onClick={handleCloseModal}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeleteListModal;
