import Modal from "./Modal.tsx";
import CreateTaskForm from "./CreateTaskForm.tsx";
import type {Task} from "./types/Task.tsx";

type CreateTaskModalProps = {
    onClose: () => void,
    onCreate: (task: Task) => void
};

function CreateTaskModal({onClose, onCreate}: CreateTaskModalProps) {
    function handleSubmit(task: Task) {
        onCreate(task);
        onClose();
    }

    return <Modal title="Create Task" onClose={() => onClose()}><CreateTaskForm onSubmit={handleSubmit}/></Modal>
}

export default CreateTaskModal;