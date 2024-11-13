import React from "react";
import UserProfile from "../components/profile/UserProfile";
import ListProfile from "../components/profile/ListProfile";
import EditProfileModal from "../components/profile/EditProfileModal";
import { useAppDispatch } from "../app/store";
import { closeModal } from "../features/ui/uiSlice";

const Profile = () => {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(closeModal());
  });
  return (
    <>
      <EditProfileModal />
      <div
        className="anime-left"
        style={{ display: "flex", flexDirection: "column", gap: "50px" }}
      >
        <UserProfile />
        <ListProfile />
      </div>
    </>
  );
};

export default Profile;
