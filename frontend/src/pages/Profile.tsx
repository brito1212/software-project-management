import React from "react";
import UserProfile from "../components/profile/UserProfile";
import EditProfileModal from "../components/profile/EditProfileModal";
import { useAppDispatch, useAppSelector } from "../app/store";
import { closeModal } from "../features/ui/uiSlice";
import ProtectedRoute from "../components/helper/ProtectedRoute";
import SearchField from "../components/forms/SearchField";
import { useNavigate } from "react-router-dom";
import styles from "../components/profile/VisitProfile.module.css";

const Profile = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSearchSubmit = (searchText) => {
    navigate(`/profile/${searchText}`);
  };

  React.useEffect(() => {
    dispatch(closeModal());
  });

  return (
    <ProtectedRoute>
      <EditProfileModal />
      <div
        className="anime-left"
        style={{ display: "flex", flexDirection: "column", gap: "25px" }}
      >
        <UserProfile user={user} />
        <h2 className={styles.title}>Pesquisar pessoas</h2>
        <SearchField
          onSubmit={handleSearchSubmit}
          extraStyle={styles.searchField}
          placeholder={"Pesquisar pessoas..."}
        />
      </div>
    </ProtectedRoute>
  );
};

export default Profile;
