import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MediaCard.module.css";
import addIcon from "../../assets/icons/add-icon.svg";
import AddListasDropdown from "../list/AddListasDropdown";

const MediaCard = ({ slide, cardWidth }) => {
  const [showListas, setShowListas] = React.useState(false);
  const navigate = useNavigate();

  return (
    <div
      className={styles.card}
      style={{ width: `${cardWidth}px` }}
      onClick={() => navigate(`midia/${slide.media_type}/${slide.id}`)}
    >
      <button
        className={styles["add-list"]}
        onClick={(event) => {
          event.stopPropagation();
          setShowListas(!showListas);
        }}
      >
        <img src={addIcon} alt="Add List" />
      </button>
      <img src={slide.banner} />
      <AddListasDropdown showListas={showListas} midiaId={slide.id} />
    </div>
  );
};

export default MediaCard;
