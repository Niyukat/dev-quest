import TaskCard from "./TaskCard.tsx";
import CreateTaskModal from "./CreateTaskModal.tsx";
import {type ReactNode, useEffect, useState} from "react";
import type {Task} from "./types/Task.ts"
import ShowTaskModal from "./ShowTaskModal.tsx";
import DeleteTaskModal from "./DeleteTaskModal.tsx";
import { Trash2 } from "lucide-react";
import {TASK_STATUS, TASK_STATUS_LABELS} from "./types/TaskStatus.ts";

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
        setTasks((currentTasks) => [...currentTasks, task]);
    }

    function deleteTask(task: Task) : void {
        setTasks((currentTasks) => currentTasks.filter((element) => element.id !== task.id));
    }

    function editTask(task: Task): void {
        setTasks((currentTasks) =>
            currentTasks.map((item) =>
                item.id === task.id ? task : item
            )
        );

        setSelectedTask(task);
    }

    return (
        <div className="board">
            <div  className="board-actions">
                <button type="button" onClick={() => setIsCreateModalOpen(true)} className="create-task-btn">Create</button>
            </div>
            <div className="task-board">
                {
                    Object.values(TASK_STATUS).map((status): ReactNode => {
                        return (<div key={status} className="board-column">
                            <h3 className="column-title">{TASK_STATUS_LABELS[status]}</h3>
                            <div className="column-body">
                                { tasks.map((task) => (
                                    status === task.status &&
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
                        </div>)
                    })
                }
            </div>
            {
                isCreateModalOpen && <CreateTaskModal onCreate={createTask} onClose={() => setIsCreateModalOpen(false)}/>
            }
            {
                selectedTask && <ShowTaskModal onSave={editTask} task={selectedTask} onClose={() => setSelectedTask(null)}/>
            }
            {
                deletedTask && <DeleteTaskModal onConfirm={deleteTask} task={deletedTask} onClose={() => setDeletedTask(null)}/>
            }
        </div>
    );
}

export default Board;