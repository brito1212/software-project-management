import { useEffect, useState } from "react";
import { ReviewResponse } from "../../features/review/review.type";
import { getReviews } from "../../features/review/reviewApi";
import { useAppDispatch, useAppSelector } from "../../app/store";

import styles from "./ListReview.module.css";
import { baseURL } from "../../api";
import profileImage from "../../assets/images/profile-image.png";

import { Rating } from "react-simple-star-rating";
import { openModal } from "../../features/ui/uiSlice";

export const ListReview = () => {
  const dispatch = useAppDispatch();

  const [reviews, setReviews] = useState([] as ReviewResponse[]);
  const [reload, setReload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { media, loading, error } = useAppSelector((state) => state.media);
  const { user } = useAppSelector((state) => state.user);

  const getUserImage = (user) => {
    const userImage = user?.profile_image
      ? `${baseURL}${user.profile_image}`
      : profileImage;
    return userImage;
  };

  function handleClick(data) {
    dispatch(openModal(data));
  }

  useEffect(() => {
    getReviews(media?.id)
      .then((response) => {
        setReviews(response);
      })
      .catch((error) => {})
      .finally(() => setIsLoading(false));
  }, [reload]);

  if (reviews.length === 0) {
    return (
      <>
        <h4 className={styles.title}>AVALIAÇÕES</h4>
        <div className={styles.noReviews}>
          <h3>Sem Reviews...</h3>
        </div>
      </>
    );
  }

  return (
    <div>
      <h4 className={styles.title}>AVALIAÇÕES</h4>
      {reviews
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
        .map((review) => (
          <div key={review.id} className={styles.review_container}>
            <div className={styles.review_header}>
              <img
                className={styles.user_image}
                src={getUserImage(review.user)}
                alt="Profile Image"
              />
              <span className={styles.username}>{review.user.username}</span>
              <Rating initialValue={review.rate} size={28} readonly={true} />
              {review.user.id === user?.id && (
                <i
                  className={`fa-solid fa-trash-can ${styles.trash_icon}`}
                  onClick={() => handleClick({ reviewId: review.id })}
                ></i>
              )}
            </div>
            <small className={styles.date}>
              {new Date(review.created_at).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </small>
            <h3>{review.title}</h3>
            <p>{review.content}</p>
          </div>
        ))}
    </div>
  );
};

export default ListReview;
