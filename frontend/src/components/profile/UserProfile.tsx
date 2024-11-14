import styles from "./UserProfile.module.css";
import EditIcon from "../icons/EditIcon";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { openModal } from "../../features/ui/uiSlice";
import { baseURL } from "../../api";
import profileImage from "../../assets/images/profile-image.png";
import bannerDefault from "../../assets/images/banner-default.jpg";

const UserProfile = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const bannerImage = user?.banner ? `${baseURL}${user.banner}` : bannerDefault;

  const userImage = user?.profile_image
    ? `${baseURL}${user.profile_image}`
    : profileImage;

  function handleClick() {
    dispatch(openModal());
  }

  return (
    <div className={styles.profile}>
      <img className={styles.banner} src={bannerImage} alt="Banner" />
      <div className={styles["user-info"]}>
        <div className={styles["info-wrapper"]}>
          <div className={styles["img-container"]}>
            <img className={styles.image} src={userImage} alt="Profile Image" />
            <div className={styles.name}>
              {`${user?.first_name} ${user?.last_name}`}
            </div>
          </div>
          <div className={styles.info}>
            <span>Seguindo </span> {user?.seguindo.length}
          </div>
          <div className={styles.info}>
            <span>Seguidores </span> {user?.seguidores.length}
          </div>
          <button className={styles.edit} onClick={handleClick}>
            <EditIcon color={"#d44949"} />
            <div>Editar Perfil</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
