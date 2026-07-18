import type {Comment} from "./types/Comment.ts";
import type {ReactNode} from "react";

type CommentProps = {
    comment: Comment;
    actions: ReactNode;
}

function CommentCard({comment, actions}: CommentProps) {
    return (
        <div className="comment-card">
            <div className="comment-header">
                <p className="comment-date">{new Date(comment.createdAt).toLocaleString("en-GB")}</p>
                <div onClick={(event) => event.stopPropagation()} className="actions-btn">
                    {actions}
                </div>
            </div>
            <p className="comment-content">{comment.content}</p>
        </div>
    )
}

export default CommentCard;