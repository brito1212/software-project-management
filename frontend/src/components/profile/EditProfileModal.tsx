import { useAppDispatch, useAppSelector } from "../../app/store";
import { closeModal } from "../../features/ui/uiSlice";
import EditProfile from "./EditProfile";

const EditProfileModal = () => {
  const { modal } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();

  function handleOutsideClick(event) {
    if (event.target === event.currentTarget) dispatch(closeModal());
  }

  if (!modal) return null;
  return (
    <div className="modal" onClick={handleOutsideClick}>
      <EditProfile />
    </div>
  );
};

export default EditProfileModal;
