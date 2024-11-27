import { useEffect, useState } from "react";
import { ReviewResponse } from "../../features/review/review.type";
import { getReviews } from "../../features/review/reviewApi";
import { useAppSelector } from "../../app/store";

import styles from "./ListReview.module.css";

import ViewReview from "./ViewReview";

export const ListReview = () => {
  const [reviews, setReviews] = useState([] as ReviewResponse[]);
  const [reload, setReload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { media } = useAppSelector((state) => state.media);

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
          <ViewReview review={review} key={review.id}/>
        ))}
    </div>
  );
};

export default ListReview;
