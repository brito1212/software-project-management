import React from "react";
import styles from "./Close.module.css";

const Close = ({ handleClose }) => {
  return (
    <button className={styles.close} onClick={handleClose}>
      <span>X</span>
    </button>
  );
};

export default Close;
