type TaskProps = {
    title: string;
}

function TaskCard({title}: TaskProps) {
    return (
        <div className="task-card">
            <h4 className="task-title">{title}</h4>
        </div>
    )
}

export default TaskCard;