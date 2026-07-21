import type {CommentError, CommentInput} from "../tasks/types/Comment.ts";

const CONTENT_MAX_LENGTH = 250;

export function validateComment(comment: CommentInput): CommentError {
    const errors: CommentError = {};

    const contentErrors = validateContent(comment.content);

    if (contentErrors.length > 0) {
        errors.content = contentErrors;
    }

    return errors;
}

export function validateContent(content: CommentInput["content"]): string[] {
    const errors: string[] = [];

    if (content.length === 0) {
        errors.push("Content is required");
    }

    if (content.length > CONTENT_MAX_LENGTH) {
        errors.push(`Content must not exceed ${CONTENT_MAX_LENGTH} characters`);
    }

    return errors;
}