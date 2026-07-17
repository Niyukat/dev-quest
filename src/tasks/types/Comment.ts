import type {Task} from "./Task.ts";

export interface Comment {
    id: string;
    taskId: Task["id"]
    content: string;
    createdAt: string;
}