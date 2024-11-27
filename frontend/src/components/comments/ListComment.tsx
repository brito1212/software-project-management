import { CommentResponse } from "../../features/review/review.type";
import { ViewComment } from "./ViewComment";


interface ListCommentProps {
    comments: CommentResponse[];
}


export const ListComment: React.FC<ListCommentProps> = ({ comments }) => {
    return (
        <div>
        {comments.map((comment) => (
            <ViewComment key={comment.id} comment={comment}></ViewComment>
        ))}
        </div>
    );
};

export default ListComment;