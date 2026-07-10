import Task from "./Task.tsx";
import * as React from "react";
import CreateTaskModal from "./CreateTaskModal.tsx";

function Board() {
    const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);

    return (
        <div className="board">
            <div className="board-actions">
                <button type="button" onClick={() => setIsCreateModalOpen(true)} className="create-task-btn">Create</button>
            </div>
            <div className="task-board">
                <div className="board-column">
                    <h3 className="column-title">TODO</h3>
                    <div className="column-body">
                        <Task title="[Feature] Create pets listing" />
                        <Task title="[Feature] Edit pet" />
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
                isCreateModalOpen ? <CreateTaskModal onClose={() => setIsCreateModalOpen(false)}/> : null
            }
        </div>
    );
}

export default Board;