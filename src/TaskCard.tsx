type TaskCardProps = {
    onClick: () => void;
    title: string
};

function TaskCard({title, onClick}: TaskCardProps) {
    return (
        <>
            <div onClick={onClick} className="task-card">
                <h4 className="task-title">{title}</h4>
            </div>
        </>
    )
}

export default TaskCard;