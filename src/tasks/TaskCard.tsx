import type {ReactNode} from "react";
import type {Task} from "./types/Task.ts";

type TaskCardProps = {
    onClick: () => void;
    task: Task;
    actions: ReactNode
};

function TaskCard({task, onClick, actions}: TaskCardProps) {
    return (
        <div onClick={onClick} className="task-card" role="button">
            <div className="task-card-header">
                <h4 className="task-title">{task.title}</h4>
                <div onClick={(event) => event.stopPropagation()} className="actions-btn">
                    {actions}
                </div>
            </div>
        </div>
    )
}

export default TaskCard;