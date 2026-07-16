import type {TaskStatus} from "./TaskStatus.ts";

export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
}