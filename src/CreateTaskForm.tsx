import type {Task} from "./types/Task.tsx";

type TaskFormProps = {
    onSubmit: (task: Task) => void
}

function CreateTaskForm({onSubmit}: TaskFormProps) {
    function handleSubmit(formData: FormData) {
        const task: Task = {
            id: crypto.randomUUID(),
            title: String(formData.get("taskTitle")),
            description: String(formData.get("taskDescription"))
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
            <button className="create-task-submit">Create</button>
        </form>
    );
}

export default CreateTaskForm;