import React from "react";
import styles from "./ViewMedia.module.css";
// import '@fortawesome/fontawesome-free/css/all.min.css';
import type { Media } from "../../features/media/media.type";
import { baseURL } from "../../api";

interface CastMember {
  name: string;
  character: string;
  image?: string;
}

// interface ViewMediaProps {
//   title: string;
//   // genres: string[];
//   // duration: string;
//   // classification: string;
//   // releaseDate: string;
//   description: string;
//   // imdbRating: number;
//   // userRating: number;
//   cast: CastMember[];
//   // posterUrl: string;
// }

const getBadgeClass = (classification) => {
  switch (classification) {
    case "L":
      return styles.badge_green;
    case "10":
      return styles.badge_blue;
    case "12":
      return styles.badge_yellow;
    case "14":
      return styles.badge_orange;
    case "16":
      return styles.badge_red;
    case "18":
      return styles.badge_black;
    default:
      return "";
  }
};

const ViewMedia: React.FC<Media> = ({ title, description, banner }) => {
  const bannerImage = banner
    ? `${baseURL}${banner}`
    : "https://placehold.co/250x350";

  return (
    <div className={styles.view_media}>
      <div className={styles.mainSection}>
        <div className={styles.container}>
          <div className={styles.columnPoster}>
            <div className={styles.poster}>
              <img src={bannerImage} alt={`${title} Poster`} />
            </div>
          </div>
          <div className={styles.columnDetails}>
            <div className={styles.media_details}>
              <h1>{title}</h1>
              {/* <div className={styles.badge_area}>
                {genres.map((genre) => (
                  <span className={styles.badge_status}>{genre}</span>
                ))}
              </div> */}
              <div className={styles.info}>
                {/* <span className={`${styles.badge_classification} ${getBadgeClass(classification)}`}>
                  {classification}
                </span> */}
                <i
                  className="fas fa-hourglass"
                  style={{ color: "#F5D563" }}
                ></i>
                {/* <span className={styles.duration}>{duration}</span> */}
                <i
                  className="fas fa-calendar-alt"
                  style={{ color: "#3B57B7" }}
                ></i>
                {/* <span className={styles.release_date}>{releaseDate}</span> */}
              </div>
              <p className={styles.description}>{description}</p>
              <div className={styles.ratings}>
                <div className={styles.imdbContainer}>
                  <i
                    className="fa-brands fa-imdb fa-2xl"
                    style={{ color: "#FFD43B" }}
                  ></i>
                  {/* <span className={styles.imdb_rating}> {imdbRating}/10</span> */}
                </div>
                {/* <span className={styles.user_rating}>User Rating: {userRating}/5</span> */}
              </div>
              <div className={styles.actions}>
                <div className={styles.container}>
                  <div className={styles.column}>
                    <button className={styles.review_button}>
                      Create Review
                    </button>
                  </div>
                  <div className={styles.column}>
                    <button className={styles.add_to_list_button}>
                      Add to List
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.castSection}>
        <h2>Cast</h2>
        <div className={styles.cast_list}>
          {/* {cast.map((member, index) => (
            <div key={index} className={styles.cast_member}>
              <div className={styles.cast_image}>
                {member.image ? <img src={member.image} alt={member.name} /> : <div className={styles.placeholder_image}></div>}
              </div>
              <div className={styles.cast_info}>
                <span className={styles.cast_name}>{member.name}</span>
                <span className={styles.cast_character}>{member.character}</span>
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default ViewMedia;
