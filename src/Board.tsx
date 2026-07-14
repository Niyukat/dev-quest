import TaskCard from "./TaskCard.tsx";
import CreateTaskModal from "./CreateTaskModal.tsx";
import {useEffect, useState} from "react";
import type {Task} from "./types/Task.ts"
import ShowTaskModal from "./ShowTaskModal.tsx";
import {Trash2} from "lucide-react";
import DeleteTaskModal from "./DeleteTaskModal.tsx";

function Board() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [deletedTask, setDeletedTask] = useState<Task | null>(null);
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

    function deleteTask(task: Task) : void {
        setTasks((currenTasks) => currenTasks.filter((element) => element.id !== task.id));
    }

    return (
        <div className="board">
            <div  className="board-actions">
                <button type="button" onClick={() => setIsCreateModalOpen(true)} className="create-task-btn">Create</button>
            </div>
            <div className="task-board">
                <div className="board-column">
                    <h3 className="column-title">TODO</h3>
                    <div className="column-body">
                        { tasks.map((task) => (
                            <TaskCard
                                onClick={() => setSelectedTask(task)}
                                key={task.id}
                                title={task.title}
                                actions={
                                    <button onClick={() => setDeletedTask(task)} type="button" className="task-delete">
                                        <Trash2 size={18} />
                                    </button>
                                }
                            />
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
                isCreateModalOpen && <CreateTaskModal onCreate={createTask} onClose={() => setIsCreateModalOpen(false)}/>
            }
            {
                selectedTask && <ShowTaskModal task={selectedTask} onClose={() => setSelectedTask(null)}/>
            }
            {
                deletedTask && <DeleteTaskModal onConfirm={deleteTask} task={deletedTask} onClose={() => setDeletedTask(null)}/>
            }
        </div>
    );
}

export default Board;