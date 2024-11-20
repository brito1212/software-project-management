import styles from "./Close.module.css";

const Close = ({ handleClose, extraClass }) => {
  return (
    <button className={`${styles.close} ${extraClass}`} onClick={handleClose}>
      <i className="fa-solid fa-xmark"></i>
    </button>
  );
};

export default Close;
