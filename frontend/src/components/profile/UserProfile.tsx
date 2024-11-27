import styles from "./UserProfile.module.css";
import EditIcon from "../icons/EditIcon";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { openModal } from "../../features/ui/uiSlice";
import { baseURL } from "../../api";
import profileImage from "../../assets/images/profile-image.png";
import bannerDefault from "../../assets/images/banner-default.jpg";
import {
  followUser,
  getUser,
  getUserByUsername,
  unfollowUser,
} from "../../features/user/userApi";
import React from "react";
import { setUser } from "../../features/user/userSlice";
import { User } from "../../features/user/user.type";

const UserProfile = ({ user }) => {
  const [currentUser, setCurrentUser] = React.useState<User | null>(user);

  const userLogged = useAppSelector((state) => state.user.user);
  const alreadyFollow = userLogged?.seguindo.includes(user.id);
  const dispatch = useAppDispatch();

  const bannerImage = currentUser?.banner
    ? `${baseURL}${currentUser.banner}`
    : bannerDefault;

  const userImage = currentUser?.profile_image
    ? `${baseURL}${currentUser.profile_image}`
    : profileImage;

  function handleEdit() {
    dispatch(openModal(""));
  }

  const followOrUnfollow = async (username: string, type: string) => {
    try {
      if (type === "follow") await followUser(username);
      else await unfollowUser(username);
      getUser().then((user) => {
        dispatch(setUser(user));
      });
      const res = await getUserByUsername(username);
      setCurrentUser(res);
    } catch (error) {
      console.log(error);
    }
  };

  function handleFollowOrUnfollow(type: string) {
    if (currentUser != null) followOrUnfollow(currentUser.username, type);
  }

  if (userLogged)
    return (
      <div className={styles.profile}>
        <img className={styles.banner} src={bannerImage} alt="Banner" />
        <div className={styles["user-info"]}>
          <div className={styles["info-wrapper"]}>
            <div className={styles["img-container"]}>
              <img
                className={styles.image}
                src={userImage}
                alt="Profile Image"
              />
              <div className={styles.name}>
                {`${currentUser?.first_name} ${currentUser?.last_name}`}
              </div>
            </div>
            <div className={styles.info}>
              <span>Seguindo </span> {currentUser?.seguindo.length}
            </div>
            <div className={styles.info}>
              <span>Seguidores </span> {currentUser?.seguidores.length}
            </div>
            {currentUser?.id === userLogged.id ? (
              <button className={styles.edit} onClick={handleEdit}>
                <EditIcon color={"#d44949"} />
                <div>Editar Perfil</div>
              </button>
            ) : (
              <>
                {!alreadyFollow ? (
                  <button
                    className={`${styles.edit} ${styles.follow}`}
                    onClick={() => handleFollowOrUnfollow("follow")}
                  >
                    <i className="fa-solid fa-heart"></i>
                    <div>Seguir</div>
                  </button>
                ) : (
                  <button
                    className={`${styles.edit} ${styles.unfollow}`}
                    onClick={() => handleFollowOrUnfollow("unfollow")}
                  >
                    <i className="fa-solid fa-heart"></i>
                    <div>Deixar de seguir</div>
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
};

export default UserProfile;
