import Modal from "../components/Modal.tsx";
import {useEffect, useState} from "react";
import type {Task} from "./types/Task.ts";
import EditableInput from "../components/EditableInput.tsx";
import EditableText from "../components/EditableText.tsx";
import EditableSelect from "../components/EditableSelect.tsx";
import {TASK_STATUS, TASK_STATUS_LABELS} from "./types/TaskStatus.ts";
import type {Comment} from "./types/Comment.ts";

type TaskModalProps = {
    task: Task;
    onClose: () => void;
    onSave: (task: Task) => void;
};

function ShowTaskModal({task, onClose, onSave}: TaskModalProps) {
    const [isEditTitle, setIsEditTitle] = useState(false);
    const [isEditDescription, setIsEditDescription] = useState(false);
    const indexStorage = `${task.id}_comments`

    const [comments, setComments] = useState<Comment[]>(() => {
        const data = localStorage.getItem(indexStorage);

        return data ? JSON.parse(data) : [];
    });

    useEffect(() => {
        localStorage.setItem(indexStorage, JSON.stringify(comments));
    }, [comments, indexStorage])

    function createComment(comment: Comment) {
        setComments((currentComments) => [...currentComments, comment]);
    }

    function handleSubmit(formData: FormData) {
        const comment: Comment = {
            id: crypto.randomUUID(),
            content: String(formData.get("content")),
            taskId: task.id,
            createdAt: new Date().toISOString(),
        };

        createComment(comment);
    }

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
        onClose={onClose}
        >
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
        <div className="comments-section">
            <h3>Comments</h3>
            <form action={handleSubmit} className="comment-form">
                <textarea name="content" className="input-field "></textarea>
                <button className="submit-btn">Create</button>
            </form>
            {
                comments.length !== 0 ?
                    <div className="comments-container">
                        {
                            comments.map((comment) => {
                                return (
                                    <div key={comment.id} className="comment">
                                        <p className="comment-date">{new Date(comment.createdAt).toLocaleString("en-GB")}</p>
                                        <p className="comment-content">{comment.content}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    : <div className="empty-comments">No Comments</div>
            }
        </div>
    </Modal>
}

export default ShowTaskModal;