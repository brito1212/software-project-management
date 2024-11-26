import { Rating } from "react-simple-star-rating";
import { baseURL } from "../../api";
import profileImage from "../../assets/images/profile-image.png";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { useState } from "react";

import styles from "./ViewReview.module.css";

import { openModal } from "../../features/ui/uiSlice";
import CreateComment from "../comments/CreateComment";

export const ViewReview = ({ review }) => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.user);

    const [isCommentFormVisible, setCommentFormVisible] = useState(false);

    const getUserImage = (user) => {
        const userImage = user?.profile_image
          ? `${baseURL}${user.profile_image}`
          : profileImage;
        return userImage;
    };

    function handleClick(data) {
        dispatch(openModal(data));
    }

    const createComment = () => {
        setCommentFormVisible(true);
    };

    return (
        <>
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
            <a className={styles.add_comment_link} onClick={createComment}>Adicione um comentário</a>

            {isCommentFormVisible && (
                <CreateComment closeForm={() => setCommentFormVisible(false)} reviewId={review.id}/>
            )}
        </>
    );
}

export default ViewReview;