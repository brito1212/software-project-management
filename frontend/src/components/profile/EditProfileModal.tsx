import { useAppDispatch, useAppSelector } from "../../app/store";
import { closeModal } from "../../features/ui/uiSlice";
import EditProfile from "./EditProfile";
import styles from "./EditProfileModal.module.css";

const EditProfileModal = () => {
  const { modal } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();

  function handleOutsideClick(event) {
    if (event.target === event.currentTarget) dispatch(closeModal());
  }

  if (!modal) return null;
  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      <EditProfile />
    </div>
  );
};

export default EditProfileModal;
