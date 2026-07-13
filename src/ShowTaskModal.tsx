import Modal from "./Modal.tsx";
import type {Task} from "./types/Task.tsx";

type TaskModalProps = {
    task: Task;
    onClose: () => void;
};

function ShowTaskModal({task, onClose}: TaskModalProps) {
    return <Modal title={task.title} onClose={onClose}>
        {task.description}
    </Modal>
}

export default ShowTaskModal;