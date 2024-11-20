import React, { useEffect, useState } from "react";
import styles from "./ViewMedia.module.css";
import type { Media } from "../../features/media/media.type";
import { baseURL } from "../../api";
import { CreateReview } from "../review/CreateReview";
import ListReview from "../review/ListReview";
import { closeModal } from "../../features/ui/uiSlice";
import { useAppDispatch, useAppSelector } from "../../app/store";
import {
  createListaAction,
  updateListaAction,
} from "../../features/lista/listaSlice";
import { Link, useNavigate } from "react-router-dom";
import { MidiaList } from "../../features/lista/lista.type";

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

const separateName = (member) => {
  const [actorName, characterName] = member.split(";");
  return {
    actorName: actorName?.trim(),
    characterName: characterName?.trim(),
  };
};

const ViewMedia: React.FC<Media> = ({
  title,
  description,
  banner,
  genres,
  duration,
  publish_date,
  director,
  studio,
  cast,
}) => {
  const bannerImage = banner
    ? `${baseURL}${banner}`
    : "https://placehold.co/300x400";
  const formattedDate = new Date(publish_date).toLocaleDateString("en-GB");

  const [showReview, setShowReview] = React.useState(false);

  const showCreateReview = () => {
    setShowReview((showReview) => !showReview);
  };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(closeModal());
  }, [dispatch]);
  const { user } = useAppSelector((state) => state.user);
  const { media } = useAppSelector((state) => state.media);
  const { listas } = useAppSelector((state) => state.user.user);
  const [showListas, setShowListas] = React.useState(false);

  function addToLista(id: number) {
    const lista = listas.find((lista) => lista.id == id);
    const data = {
      id: lista.id,
      name: lista.name,
      description: lista.description,
      midias: [...lista.midias.map((midia) => midia.id), media?.id],
    };
    dispatch(
      updateListaAction(
        data,
        () => {
          navigate(`/list/${lista.id}`);
        },
        () => {}
      )
    );
  }

  function handleCreateList() {
    console.log(user?.listas);
    const newLista = {
      name: "Minha Lista",
      description: "Adicione uma descrição...",
      midias: [],
      user: user?.id,
    };
    dispatch(
      createListaAction(
        newLista,
        () => {
          navigate("/list");
        },
        () => {
          console.log("erro");
        }
      )
    );
  }

  return (
    <>
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
                <p className={styles.title}>{title}</p>
                <div className={styles.badge_area}>
                  {genres.map((genre, index) => (
                    <span key={index} className={styles.badge_status}>
                      {genre}
                    </span>
                  ))}
                </div>
                <div className={styles.info}>
                  {/* <span className={`${styles.badge_classification} ${getBadgeClass(classification)}`}>
                  {classification}
                </span> */}
                  <i
                    className="fas fa-hourglass"
                    style={{ color: "#3B57B7" }}
                  ></i>
                  <span className={styles.duration}>{duration}</span>
                  <i
                    className="fas fa-calendar-alt"
                    style={{ color: "#3B57B7" }}
                  ></i>
                  <span className={styles.release_date}>{formattedDate}</span>
                  <i
                    className="fa-solid fa-clapperboard"
                    style={{ color: "#3B57B7" }}
                  ></i>
                  <span className={styles.director_name}>{director}</span>
                  <i
                    className="fa-solid fa-video"
                    style={{ color: "#3B57B7" }}
                  ></i>
                  <span className={styles.studio_name}>{studio}</span>
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
                    </div>
                  </div>
                </div>
              </div>
              <ul
                className={
                  showListas
                    ? `${styles.config} ${styles["dropdown-anime"]}`
                    : `${styles.config}`
                }
              >
                {listas.length !== 0 ? (
                  listas.map((lista) => (
                    <li key={lista.id}>
                      <button
                        className={styles.btnAddLista}
                        onClick={() => addToLista(lista.id)}
                      >
                        <span>{lista.name}</span>
                      </button>
                    </li>
                  ))
                ) : (
                  <li>
                    <button to="#" onClick={handleCreateList}>
                      <span>Criar lista</span>
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.castSection}>
          {showReview ? (
            <CreateReview />
          ) : (
            <>
              <p className={styles.subtitle}>{"Elenco:"}</p>
              <div className={styles.cast_list}>
                {cast.map((member, index) => {
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
