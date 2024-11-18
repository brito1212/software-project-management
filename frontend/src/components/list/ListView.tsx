import { Link } from "react-router-dom";
import deleteIcon from "../../assets/icons/x-symbol.svg";
import styles from "./ListView.module.css";

const ListView = () => {
  return (
    <div className={styles["list-view"]}>
      <h1>Minha Lista</h1>
      <div className={styles["description-container"]}>
        <p>Adicione uma descrição</p>
        <Link to="delete" className="btn primary red">
          <img
            src={deleteIcon}
            alt="Deletar Lista"
            width="15px"
            height="15px"
          />
          <span>Exluir Lista</span>
        </Link>
      </div>
      <div className={styles["list-wrapper"]}></div>
    </div>
  );
};

export default ListView;
