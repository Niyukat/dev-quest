import Modal from "../components/Modal.tsx";
import {useState} from "react";
import type {Task} from "./types/Task.ts";
import EditableInput from "../components/EditableInput.tsx";
import EditableText from "../components/EditableText.tsx";
import EditableSelect from "../components/EditableSelect.tsx";
import {TASK_STATUS, TASK_STATUS_LABELS} from "./types/TaskStatus.ts";

type TaskModalProps = {
    task: Task;
    onClose: () => void;
    onSave: (task: Task) => void;
};

function ShowTaskModal({task, onClose, onSave}: TaskModalProps) {
    const [isEditTitle, setIsEditTitle] = useState(false);
    const [isEditDescription, setIsEditDescription] = useState(false);

    function handleEdit(data: Partial<Task>) {
        const editedTask = {
            ...task,
            ...data,
        };

        onSave(editedTask);
    }

    return <Modal
        title={
            isEditTitle ?
                <EditableInput
                    name="title"
                    onCancel={() => setIsEditTitle(false)}
                    onSave={(value) => {
                        setIsEditTitle(false);
                        handleEdit({title: value});
                    }}
                    defaultValue={task.title}
                />
                : <h3 onClick={() => setIsEditTitle(true)} className="modal-title">{task.title}</h3>
        }
        onClose={onClose}>
        <EditableSelect onSave={(value) => handleEdit({status: value})} value={task.status} name="status">
            {
                Object.values(TASK_STATUS).map((status) =>
                    <option key={status} value={status}>{TASK_STATUS_LABELS[status]}</option>
                )
            }
        </EditableSelect>
        <div className="task-details">
            {
                isEditDescription ?
                    <EditableText
                        name="description"
                        onCancel={() => setIsEditDescription(false)}
                        onSave={(value) => {
                            setIsEditDescription(false);
                            handleEdit({description: value});
                        }}
                        defaultValue={task.description}
                    />
                    : <p onClick={() => setIsEditDescription(true)}>{task.description}</p>
            }
        </div>
    </Modal>
}

export default ShowTaskModal;