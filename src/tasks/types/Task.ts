import type {TaskStatus} from "./TaskStatus.ts";

export type TaskInput = {
    title: string;
    description: string;
}

export type TaskUpdateInput = Partial<TaskInput> & {
    status?: TaskStatus;
}

export type Task = TaskInput & {
    id: string;
    status: TaskStatus;
}

export type TaskError = {
    title?: string[];
    description?: string[];
}