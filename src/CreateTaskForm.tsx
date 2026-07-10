function CreateTaskForm() {
    return (
        <form className="create-task-form">
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