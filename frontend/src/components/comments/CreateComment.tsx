import { useState } from "react";
import { useAppDispatch } from "../../app/store";
import { Comment } from "../../features/review/review.type";
import styles from "./CreateComment.module.css";
import { createCommentAction } from "../../features/review/reviewSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";


export const CreateComment = ({ closeForm, reviewId }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [content, setContent] = useState("");
    const user = useSelector(selectUser)

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
    
        const commentData: Comment = {
          content: content,
          review: reviewId,
          user: user?.id
        }

        console.log("Comment:", commentData)
        dispatch(
            createCommentAction(
                commentData,
                () => navigate(0),
                () => console.log("erro")
            )
        );
      }

    
    return (
        <form className={styles.create_comment_container} onSubmit={handleSubmit}>
            <h3>Comente sobre a Review</h3>
            <textarea
                placeholder="..." 
                name="content" 
                className={styles.textarea} 
                onChange={(e) => setContent(e.target.value)}
                value={content}
            />
            <div className={styles.buttons}>
                <button className={`btn primary ${styles.button}`}>
                    Submit
                </button>
                <button className="btn outline" onClick={closeForm}>
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default CreateComment;