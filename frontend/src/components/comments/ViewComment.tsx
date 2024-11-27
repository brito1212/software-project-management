import { CommentResponse } from "../../features/review/review.type";
import { baseURL } from "../../api";
import profileImage from "../../assets/images/profile-image.png";

import styles from "./ViewComment.module.css";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { openModal } from "../../features/ui/uiSlice";



interface ViewCommentProps {
    comment: CommentResponse;
}


export const ViewComment: React.FC<ViewCommentProps> = ({ comment }) => {
    const dispatch = useAppDispatch();
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
    

    return (
        <div className={styles.comment_container}>
            <div className={styles.comment_header}>
                <img
                    className={styles.user_image}
                    src={getUserImage(comment.user)}
                    alt="Profile Image"
                />
                <span className={styles.username}>{comment.user.username}</span>
                {comment.user.id === user?.id && (
                    <i
                    className={`fa-solid fa-trash-can ${styles.trash_icon}`}
                    onClick={() => handleClick({ type: "deleteComment", commentId: comment.id })}
                    ></i>
                )}
            </div>
                <small className={styles.date}>
                {new Date(comment.created_at).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                })}
                </small>
                <p>{comment.content}</p>
        </div>
    );
};