import type {Task} from "./Task.ts";

export type CommentInput = {
    content: string;
}

export type Comment = CommentInput & {
    id: string;
    taskId: Task["id"]
    createdAt: string;
}

export type CommentError = {
    content?: string[];
}