import type {ReactNode} from "react";

type TaskCardProps = {
    onClick: () => void;
    title: string;
    actions: ReactNode
};

function TaskCard({title, onClick, actions}: TaskCardProps) {
    return (
        <div onClick={onClick} className="task-card" role="button">
            <div className="task-card-header">
                <h4 className="task-title">{title}</h4>
                <div onClick={(event) => event.stopPropagation()} className="task-actions">
                    {actions}
                </div>
            </div>
        </div>
    )
}

export default TaskCard;