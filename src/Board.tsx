import TaskCard from "./TaskCard.tsx";
import CreateTaskModal from "./CreateTaskModal.tsx";
import {useEffect, useState} from "react";
import type {Task} from "./types/Task.tsx"

function Board() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [tasks, setTasks] = useState<Task[]>(() => {
        const storedTasks = localStorage.getItem("tasks");

        return storedTasks ? JSON.parse(storedTasks) : [];
    });

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks])

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
                        { tasks.map((task) => (
                            <TaskCard key={task.id} title={task.title} />
                        ))}
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