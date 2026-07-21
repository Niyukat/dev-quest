import type {TaskError, TaskInput, TaskUpdateInput} from "../tasks/types/Task.ts";

const TITLE_MAX_LENGTH = 150;

const DESCRIPTION_MAX_LENGTH = 1000;

export function validateCreateTask(task: TaskInput): TaskError {
    const errors: TaskError = {};

    const titleErrors = validateTitle(task.title);

    if (titleErrors.length > 0) {
        errors.title = titleErrors;
    }

    const descriptionErrors = validateDescription(task.description);

    if (descriptionErrors.length > 0) {
        errors.description = descriptionErrors;
    }

    return errors;
}

export function validateUpdateTask(task: TaskUpdateInput): TaskError {
    const errors: TaskError = {};

    if ("title" in task) {
        const titleErrors = validateTitle(task.title);

        if (titleErrors.length > 0) {
            errors.title = titleErrors;
        }
    }

    if ("description" in task) {
        const descriptionErrors = validateDescription(task.description);

        if (descriptionErrors.length > 0) {
            errors.description = descriptionErrors;
        }
    }

    return errors;
}

export function validateTitle(title: TaskInput["title"]): string[] {
    const errors: string[] = [];
    const normalizedValue = title;

    if (normalizedValue.length === 0) {
        errors.push("Title is required");
    }

    if (normalizedValue.length > TITLE_MAX_LENGTH) {
        errors.push(`Title must not exceed ${TITLE_MAX_LENGTH} characters`);
    }

    return errors;
}

export function validateDescription(description: TaskInput["description"]): string[] {
    const errors: string[] = [];
    const normalizedValue = description;

    if (normalizedValue.length === 0) {
        errors.push("Description is required");
    }

    if (normalizedValue.length > DESCRIPTION_MAX_LENGTH) {
        errors.push(`Description must not exceed ${DESCRIPTION_MAX_LENGTH} characters`);
    }

    return errors;
}