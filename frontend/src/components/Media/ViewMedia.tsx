import React, { useEffect } from "react";
import styles from "./ViewMedia.module.css";
import type { Media } from "../../features/media/media.type";
import { CreateReview } from "../review/CreateReview";
import ListReview from "../review/ListReview";
import { closeModal } from "../../features/ui/uiSlice";
import { useAppDispatch, useAppSelector } from "../../app/store";
import AddListasDropdown from "../list/AddListasDropdown";

const ViewMedia: React.FC<Media> = ({
  title,
  media_type,
  description,
  banner,
  genres,
  publish_date,
  duration,
  director,
  studio,
  seasons,
  episodes,
  publisher,
  avarage_playtime,
  avarage_price,
  cast,
  platforms,
}) => {
  const formattedDate = new Date(publish_date).toLocaleDateString("en-GB");
  const dispatch = useAppDispatch();

  const [showReview, setShowReview] = React.useState(false);
  const [showListas, setShowListas] = React.useState(false);
  const { media } = useAppSelector((state) => state.media);

  const showCreateReview = () => {
    setShowReview((showReview) => !showReview);
  };

  useEffect(() => {
    dispatch(closeModal());
  }, [dispatch]);

  const separateName = (member) => {
    const [actorName, characterName] = member.split(";");
    return {
      actorName: actorName?.trim(),
      characterName: characterName?.trim(),
    };
  };

  return (
    <>
      <div className={styles.view_media}>
        <div className={styles.mainSection}>
          <div className={styles.container}>
            <div className={styles.columnPoster}>
              <div className={styles.poster}>
                <img src={banner} alt={`${title} Poster`} />
              </div>
              <div className={styles.badge_area_plat}>
                {platforms?.map((platform, index) => (
                  <span key={index} className={styles.badge_status}>
                    {platform}
                  </span>
                ))}
              </div>
            </div>
            <div className={styles.columnDetails}>
              <div className={styles.media_details}>
                <p className={styles.title}>{title}</p>
                <div className={styles.badge_area}>
                  {genres?.map((genre, index) => (
                    <span key={index} className={styles.badge_status}>
                      {genre}
                    </span>
                  ))}
                </div>
                <div className={styles.info}>
                  {/* <span className={`${styles.badge_classification} ${getBadgeClass(classification)}`}>
                  {classification}
                </span> */}
                  {avarage_playtime && (
                    <>
                      <i
                        className="fas fa-hourglass"
                        style={{ color: "#3B57B7" }}
                      ></i>
                      <span className={styles.duration}>
                        {avarage_playtime}
                      </span>
                    </>
                  )}
                  {duration && (
                    <>
                      <i
                        className="fas fa-hourglass"
                        style={{ color: "#3B57B7" }}
                      ></i>
                      <span className={styles.duration}>{duration}</span>
                    </>
                  )}
                  {formattedDate && (
                    <>
                      <i
                        className="fas fa-calendar-alt"
                        style={{ color: "#3B57B7" }}
                      ></i>
                      <span className={styles.release_date}>
                        {formattedDate}
                      </span>
                    </>
                  )}
                  {director && (
                    <>
                      <i
                        className="fa-solid fa-clapperboard"
                        style={{ color: "#3B57B7" }}
                      ></i>
                      <span className={styles.director_name}>{director}</span>
                    </>
                  )}
                  {seasons && (
                    <>
                      <i
                        className="fa-solid fa-tv"
                        style={{ color: "#3B57B7" }}
                      ></i>
                      <span className={styles.studio_name}>
                        {seasons} seasons
                      </span>
                    </>
                  )}
                  {episodes && (
                    <>
                      <i
                        className="fa-solid fa-list"
                        style={{ color: "#3B57B7" }}
                      ></i>
                      <span className={styles.studio_name}>
                        {episodes} episodes
                      </span>
                    </>
                  )}
                  {studio && (
                    <>
                      <i
                        className={
                          media_type === "game"
                            ? "fa-solid fa-gamepad"
                            : "fa-solid fa-video"
                        }
                        style={{ color: "#3B57B7" }}
                      ></i>
                      <span className={styles.studio_name}>{studio}</span>
                    </>
                  )}
                  {publisher && (
                    <>
                      <i
                        className="fa-solid fa-building"
                        style={{ color: "#3B57B7" }}
                      ></i>
                      <span className={styles.studio_name}>{publisher}</span>
                    </>
                  )}
                  {avarage_price && (
                    <>
                      <i
                        className="fa-solid fa-dollar-sign"
                        style={{ color: "#3B57B7" }}
                      ></i>
                      <span className={styles.studio_name}>
                        {avarage_price}
                      </span>
                    </>
                  )}
                </div>
                <p className={styles.descriptionTitle}>{"DESCRIÇÃO"}</p>
                <p className={styles.description}>{description}</p>
                <div className={styles.ratings}>
                  {/* <span className={styles.user_rating}>User Rating: {userRating}/5</span> */}
                </div>
                <div className={styles.actions}>
                  <div className={styles.container_buttons}>
                    <div className={styles.column}>
                      {!showReview ? (
                        <button
                          className={styles.review_button}
                          onClick={showCreateReview}
                        >
                          <i className="fa-regular fa-star"></i> Criar Review
                        </button>
                      ) : (
                        <button
                          className={styles.review_button}
                          onClick={showCreateReview}
                        >
                          Mais Informações
                        </button>
                      )}
                    </div>
                    <div className={styles.column}>
                      <button
                        className={styles.add_to_list_button}
                        onClick={() => setShowListas(!showListas)}
                      >
                        <i className="fa-solid fa-plus"></i> Adicionar na Lista
                      </button>
                      <AddListasDropdown
                        showListas={showListas}
                        midiaId={media?.id}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.castSection}>
          {showReview ? (
            <CreateReview />
          ) : (
            <>
              {cast && <p className={styles.subtitle}>ELENCO</p>}
              <div className={styles.cast_list}>
                {cast?.map((member, index) => {
                  const { actorName, characterName } = separateName(member);
                  return (
                    <div key={index} className={styles.cast_member}>
                      <div className={styles.cast_image}>
                        {<div className={styles.placeholder_image}></div>}
                      </div>
                      <div className={styles.cast_info}>
                        <span className={styles.cast_name}>{actorName}</span>
                        <span className={styles.cast_character}>
                          {characterName}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <ListReview></ListReview>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewMedia;
