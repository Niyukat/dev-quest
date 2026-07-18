import type {Comment} from "./types/Comment.ts";
import type {ReactNode} from "react";

type CommentCardProps = {
    comment: Comment;
    children: ReactNode;
    actions: ReactNode;
}

function CommentCard({comment, children, actions}: CommentCardProps) {
    return (
        <div className="comment-card">
            <div className="comment-header">
                <p className="comment-date">{new Date(comment.createdAt).toLocaleString("en-GB")}</p>
                <div onClick={(event) => event.stopPropagation()} className="actions-btn">
                    {actions}
                </div>
            </div>
            {children}
        </div>
    )
}

export default CommentCard;