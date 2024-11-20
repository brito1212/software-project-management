import React, { useState } from "react";
import Input from "../forms/Input";
import styles from "./EditProfile.module.css";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { closeModal } from "../../features/ui/uiSlice";
import { updateUserAction } from "../../features/user/userSlice";
import profileImage from "../../assets/images/profile-image.png";
import bannerDefault from "../../assets/images/banner-default.jpg";
import { baseURL } from "../../api";
import Close from "../helper/Close";

interface Image {
  preview: string;
  raw: File;
}

const EditProfile = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const bannerImage = user?.banner ? `${baseURL}${user.banner}` : bannerDefault;

  const userImage = user?.profile_image
    ? `${baseURL}${user.profile_image}`
    : profileImage;

  const [firstName, setFirstName] = useState(user?.first_name);
  const [lastName, setLastName] = useState(user?.last_name);
  const [username, setUsername] = useState(user?.username);
  const [img, setImg] = React.useState<Image>({
    preview: userImage,
    raw: null as unknown as File,
  });
  const [banner, setBanner] = React.useState<Image>({
    preview: bannerImage,
    raw: null as unknown as File,
  });

  function handleImgChange({ target }) {
    if (target.files[0]) {
      setImg({
        preview: URL.createObjectURL(target.files[0]),
        raw: target.files[0],
      });
    }
  }

  function handleBannerChange({ target }) {
    if (target.files[0]) {
      setBanner({
        preview: URL.createObjectURL(target.files[0]),
        raw: target.files[0],
      });
    }
  }

  function handleCloseModal(e) {
    e.preventDefault();
    dispatch(closeModal());
  }

  async function handleUpdate(e) {
    e.preventDefault();
    const formData = new FormData();
    if (img.raw != null) formData.append("profile_image", img.raw);
    if (banner.raw != null) formData.append("banner", banner.raw);
    formData.append("first_name", firstName || "");
    formData.append("last_name", lastName || "");
    formData.append("username", username || "");
    dispatch(
      updateUserAction(
        user?.id,
        formData,
        () => dispatch(closeModal()),
        () => {}
      )
    );
  }

  return (
    <form className={`${styles.form} anime-left`}>
      <h2 className={styles.title}>Editar Perfil</h2>
      <Close handleClose={handleCloseModal} />
      <label className={styles.label}>Banner</label>
      <label
        htmlFor="banner"
        style={{ backgroundImage: `url('${banner.preview}')` }}
      ></label>
      <input
        className={styles.file}
        type="file"
        name="banner"
        id="banner"
        onChange={handleBannerChange}
      ></input>

      <label className={styles.label}>Foto de perfil</label>
      <label
        htmlFor="img"
        style={{ backgroundImage: `url('${img.preview}')` }}
      ></label>
      <input
        className={styles.file}
        type="file"
        name="img"
        id="img"
        onChange={handleImgChange}
      ></input>

      <div className={styles.name}>
        <Input
          label="Nome"
          type="text"
          name="first_name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          label="Sobrenome"
          type="text"
          name="last_name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <Input
        label="Username"
        type="text"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <div className={styles.buttons}>
        <button className="btn primary" onClick={handleUpdate}>
          Salvar
        </button>
        <button className="btn outline" onClick={handleCloseModal}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default EditProfile;
