import styles from "./ListProfile.module.css";

const UserProfile = () => {
  return (
    <div>
      <h2>Minhas Listas</h2>
      <div className={styles["list-container"]}>
        <p>Você não possui nenhuma lista</p>
      </div>
    </div>
  );
};

export default UserProfile;
