
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { deleteReviewAction } from "../../features/review/reviewSlice";
import { closeModal } from "../../features/ui/uiSlice";
import styles from "./DeleteReview.module.css";


const DeleteReview = () => {
  const { modal, modalData } = useAppSelector((state) => state.ui);
  const reviewId = modalData?.reviewId;
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleCloseModal(e) {
    e.preventDefault();
    dispatch(closeModal());
  }

  async function handleDelete(e) {
    e.preventDefault();
    dispatch(
        deleteReviewAction(
            reviewId,
            () => {
                dispatch(closeModal());
                navigate(0)
            },
            () => {}
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
            <h2>Tem certeza que deseja apagar sua Review?</h2>
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
};

export default DeleteReview;
