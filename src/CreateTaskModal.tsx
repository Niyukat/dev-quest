import Modal from "./Modal.tsx";
import CreateTaskForm from "./CreateTaskForm.tsx";

type CreateTaskModalProps = {
    onClose: () => void;
};

function CreateTaskModal({onClose}: CreateTaskModalProps) {
    return <Modal title="Create Task" onClose={() => onClose()}><CreateTaskForm/></Modal>
}

export default CreateTaskModal;