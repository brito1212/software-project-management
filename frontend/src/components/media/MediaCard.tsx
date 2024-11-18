import { useNavigate } from "react-router-dom";
import styles from "./MediaCard.module.css";
import addIcon from "../../assets/icons/add-icon.svg";

const MediaCard = ({ slide, cardWidth, type }) => {
  const navigate = useNavigate();

  const imagesMoviesPath = "https://image.tmdb.org/t/p/w500/";
  const imagesGamesPath =
    "https://images.igdb.com/igdb/image/upload/t_cover_big/";
  const image =
    type === "game"
      ? `${imagesGamesPath}${slide.cover.image_id}.png`
      : `${imagesMoviesPath}${slide.poster_path}`;

  return (
    <div
      className={styles.card}
      style={{ width: `${cardWidth}px` }}
      onClick={() => navigate(`media/${type}/${slide.id}`)}
    >
      <button
        className={styles["add-list"]}
        onClick={(event) => event.stopPropagation()}
      >
        <img src={addIcon} alt="Add List" />
      </button>
      <img src={`${image}`} />
    </div>
  );
};

export default MediaCard;
