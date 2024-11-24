import { useNavigate } from "react-router-dom";
import styles from "./MediaCard.module.css";
import addIcon from "../../assets/icons/add-icon.svg";

const MediaCard = ({ slide, cardWidth }) => {
  const navigate = useNavigate();

  return (
    <div
      className={styles.card}
      style={{ width: `${cardWidth}px` }}
      onClick={() => navigate(`midia/${slide.media_type}/${slide.id}`)}
    >
      <button
        className={styles["add-list"]}
        onClick={(event) => event.stopPropagation()}
      >
        <img src={addIcon} alt="Add List" />
      </button>
      <img src={slide.banner} />
    </div>
  );
};

export default MediaCard;
