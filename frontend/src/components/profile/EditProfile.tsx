import React, { useState } from "react";
import Input from "../forms/Input";
import styles from "./EditProfile.module.css";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { closeModal } from "../../features/ui/uiSlice";
import { updateUserAction } from "../../features/user/userSlice";

interface Image {
  preview: string;
  raw: File;
}

const EditProfile = () => {
  const { user } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const [firstName, setFirstName] = useState(user?.first_name);
  const [lastName, setLastName] = useState(user?.last_name);
  const [username, setUsername] = useState(user?.username);
  const [img, setImg] = React.useState<Image>({
    preview: "",
    raw: null as unknown as File,
  });

  function handleImgChange({ target }) {
    setImg({
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0],
    });
  }

  function handleCloseModal(e) {
    e.preventDefault();
    dispatch(closeModal());
  }

  async function handleUpdate(e) {
    e.preventDefault();
    const userUpdated = {
      first_name: firstName,
      last_name: lastName,
      username: username,
    };
    dispatch(
      updateUserAction(
        user?.id,
        userUpdated,
        () => dispatch(closeModal()),
        () => {}
      )
    );
  }

  return (
    <form className={`${styles.form} anime-left`}>
      <h2 className={styles.title}>Editar Perfil</h2>
      <button className={styles.close} onClick={handleCloseModal}>
        <span>X</span>
      </button>
      <div className={styles["upload-photo"]}>
        <div>
          {img.preview && (
            <div
              className={styles.preview}
              style={{ backgroundImage: `url('${img.preview}')` }}
            ></div>
          )}
        </div>
        <div>
          <label htmlFor="img">Mudar foto</label>
          <input
            className={styles.file}
            type="file"
            name="img"
            id="img"
            onChange={handleImgChange}
          ></input>
        </div>
      </div>

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
        <button className="btn primary-red" onClick={handleUpdate}>
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
