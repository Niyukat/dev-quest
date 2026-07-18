import type {Task} from "./types/Task.ts";
import {TASK_STATUS} from "./types/TaskStatus.ts";

type TaskFormProps = {
    onSubmit: (task: Task) => void
}

function CreateTaskForm({onSubmit}: TaskFormProps) {
    function handleSubmit(formData: FormData) {
        const task: Task = {
            id: crypto.randomUUID(),
            title: String(formData.get("taskTitle")),
            description: String(formData.get("taskDescription")),
            status: TASK_STATUS.TODO
        };

        onSubmit(task)
    }

    return (
        <form action={handleSubmit} className="create-task-form">
            <div className="input-group">
                <label className="input-label" htmlFor="taskTitle">Title</label>
                <input className="input-field" name="taskTitle" id="taskTitle" type="text"/>
            </div>
            <div className="input-group">
                <label className="input-label" htmlFor="taskDescription">Description</label>
                <textarea rows={6} className="input-field" name="taskDescription" id="taskDescription"/>
            </div>
            <button className="btn submit-btn">Create</button>
        </form>
    );
}

export default CreateTaskForm;