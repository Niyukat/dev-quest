import type {Task, TaskError, TaskInput} from "./types/Task.ts";
import {TASK_STATUS} from "./types/TaskStatus.ts";
import {validateCreateTask} from "../validation/taskValidation.ts";
import {isValid} from "../validation/validation.ts";
import {useState} from "react";
import InputError from "../components/InputError.tsx";

type TaskFormProps = {
    onSubmit: (task: Task) => void
}

function CreateTaskForm({onSubmit}: TaskFormProps) {
    const [errors, setErrors] = useState<TaskError>({});

    function handleSubmit(data: TaskInput): void {
        const normalizedData = {title: data.title.trim(), description: data.description.trim()};
        const taskErrors = validateCreateTask(normalizedData);

        if (!isValid(taskErrors)) {
            setErrors(taskErrors);
            return;
        }

        const task: Task = {
            id: crypto.randomUUID(),
            title: normalizedData.title,
            description: normalizedData.description,
            status: TASK_STATUS.TODO
        };

        setErrors({});
        onSubmit(task)
    }

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleSubmit({title: String(formData.get("title")), description: String(formData.get("description"))});
        }} className="create-task-form">
            <div className="input-group">
                <label className="input-label" htmlFor="taskTitle">Title</label>
                <input className="input-field" name="title" id="taskTitle" type="text"/>
                <InputError errors={errors.title ?? []} />
            </div>
            <div className="input-group">
                <label className="input-label" htmlFor="taskDescription">Description</label>
                <textarea rows={6} className="input-field" name="description" id="taskDescription"/>
                <InputError errors={errors.description ?? []} />
            </div>
            <button type="submit" className="btn submit-btn">Create</button>
        </form>
    );
}

export default CreateTaskForm;