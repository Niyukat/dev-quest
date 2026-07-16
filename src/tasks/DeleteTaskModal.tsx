import type {Task} from "./types/Task.ts";
import Modal from "../components/Modal.tsx";

type DeleteTaskModalProps = {
    onConfirm: (task: Task) => void;
    onClose: () => void;
    task: Task;
}

function DeleteTaskModal({task, onConfirm, onClose}: DeleteTaskModalProps) {
    function handleConfirm() {
        onConfirm(task);
        onClose();
    }

    return <Modal title={`Delete ${task.title}`} onClose={onClose}>
        <p>Are you sure you want to delete this task ?</p>
        <p className="delete-choices-container">
            <button className="delete-confirm-btn" onClick={handleConfirm}>Yes</button>
            <button className="delete-cancel-btn" onClick={onClose}>No</button>
        </p>
    </Modal>
}

export default DeleteTaskModal;