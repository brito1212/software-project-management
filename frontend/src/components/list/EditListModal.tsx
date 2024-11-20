import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { closeModal } from "../../features/ui/uiSlice";
import styles from "./EditListModal.module.css";
import Close from "../helper/Close";
import { updateListaAction } from "../../features/lista/listaSlice";

const EditListModal = ({ lista }) => {
  const { modal } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();

  const [name, setName] = React.useState(lista.name);
  const [description, setDescription] = React.useState(lista.description);

  function handleCloseModal(e) {
    e.preventDefault();
    dispatch(closeModal());
  }

  function handleOutsideClick(event) {
    if (event.target === event.currentTarget) dispatch(closeModal());
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      id: lista.id,
      name,
      description,
    };
    dispatch(
      updateListaAction(
        data,
        () => {
          dispatch(closeModal());
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
      <form className={`${styles.form} anime-left`} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Editar Lista</h2>
        <Close handleClose={handleCloseModal} />
        <input
          className={styles.input}
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          className={styles.textarea}
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn primary">Salvar</button>
      </form>
    </div>
  );
};

export default EditListModal;
