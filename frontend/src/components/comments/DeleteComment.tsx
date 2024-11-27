
import { useAppDispatch, useAppSelector } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { closeModal } from "../../features/ui/uiSlice";

import styles from "./DeleteComment.module.css";
import { deleteCommentAction, deleteReviewAction } from "../../features/review/reviewSlice";

export const DeleteComment = () => {
  const { modal, modalData } = useAppSelector((state) => state.ui);
  const commentId = modalData?.commentId;
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  function handleCloseModal(e) {
    e.preventDefault();
    dispatch(closeModal());
  }

  async function handleDelete(e) {
    e.preventDefault();
    console.log("Delete comment: ", commentId);
    dispatch(
        deleteCommentAction(
            commentId,
            () => {
                dispatch(closeModal());
                navigate(0)
            },
            () => {console.log("Erro ao deletar Comentario")}
        )
    );
  }

  function handleOutsideClick(event) {
    if (event.target === event.currentTarget) dispatch(closeModal());
  }

  if (!modal) return null;

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
        <div className={styles.conteiner}>
            <h2>Tem certeza que deseja apagar seu comentário?</h2>
            <div className={styles.buttons}>
                <button className="btn primary-red" onClick={handleDelete}>
                    Apagar
                </button>
                <button className="btn outline" onClick={handleCloseModal}>
                    Cancelar
                </button>
            </div>
        </div>
    </div>
  );
} 