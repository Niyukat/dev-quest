import TaskCard from "./TaskCard.tsx";
import CreateTaskModal from "./CreateTaskModal.tsx";
import {useState} from "react";
import type {Task} from "./types/Task.tsx"

function Board() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [, setTasks] = useState<Task[]>([]);

    function createTask(task: Task) : void {
        setTasks((currenTasks) => [...currenTasks, task]);
    }

    return (
        <div className="board">
            <div className="board-actions">
                <button type="button" onClick={() => setIsCreateModalOpen(true)} className="create-task-btn">Create</button>
            </div>
            <div className="task-board">
                <div className="board-column">
                    <h3 className="column-title">TODO</h3>
                    <div className="column-body">
                        <TaskCard title="[Feature] Create pets listing" />
                        <TaskCard title="[Feature] Edit pet" />
                    </div>
                </div>
                <div className="board-column">
                    <h3 className="column-title">BLOCKED</h3>
                    <div className="column-body"></div>
                </div>
                <div className="board-column">
                    <h3 className="column-title">IN PROGRESS</h3>
                    <div className="column-body"></div>
                </div>
                <div className="board-column">
                    <h3 className="column-title">IN TESTING</h3>
                    <div className="column-body"></div>
                </div>
                <div className="board-column">
                    <h3 className="column-title">CLOSED</h3>
                    <div className="column-body"></div>
                </div>
            </div>
            {
                isCreateModalOpen ? <CreateTaskModal onCreate={createTask} onClose={() => setIsCreateModalOpen(false)}/> : null
            }
        </div>
    );
}

export default Board;