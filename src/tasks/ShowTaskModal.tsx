import Modal from "../components/Modal.tsx";
import {useEffect, useState} from "react";
import type {Task} from "./types/Task.ts";
import EditableInput from "../components/EditableInput.tsx";
import EditableText from "../components/EditableText.tsx";
import EditableSelect from "../components/EditableSelect.tsx";
import {TASK_STATUS, TASK_STATUS_LABELS} from "./types/TaskStatus.ts";
import type {Comment} from "./types/Comment.ts";
import CommentCard from "./CommentCard.tsx";
import {Trash2} from "lucide-react";

type TaskModalProps = {
    task: Task;
    onClose: () => void;
    onSave: (task: Task) => void;
};

function ShowTaskModal({task, onClose, onSave}: TaskModalProps) {
    const [isEditTitle, setIsEditTitle] = useState(false);
    const [isEditDescription, setIsEditDescription] = useState(false);
    const [selectedComment, setSelectedComment] = useState<Comment|null>(null);
    const indexStorage = `${task.id}_comments`

    const [comments, setComments] = useState<Comment[]>(() => {
        const data = localStorage.getItem(indexStorage);

        return data ? JSON.parse(data) : [];
    });

    useEffect(() => {
        localStorage.setItem(indexStorage, JSON.stringify(comments));
    }, [comments, indexStorage])

    function deleteComment(comment: Comment) {
        setComments((currentComments) => currentComments.filter(item => item.id !== comment.id));
    }

    function createComment(comment: Comment) {
        setComments((currentComments) => [...currentComments, comment]);
    }

    function editComment(comment: Comment) {
        setSelectedComment(null);
        setComments((currentComments) => currentComments.map((item) => item.id === comment.id ? comment : item));
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

    function handleEditComment(editedComment: Comment, data: Partial<Comment>) {
        editComment({...editedComment, ...data,});
    }

    function handleEditTask(data: Partial<Task>) {
        onSave({...task, ...data});
    }

    return <Modal
        title={
            isEditTitle ?
                <EditableInput
                    name="title"
                    onCancel={() => setIsEditTitle(false)}
                    onSave={(value) => {
                        setIsEditTitle(false);
                        handleEditTask({title: value});
                    }}
                    defaultValue={task.title}
                />
                : <h3 onClick={() => setIsEditTitle(true)} className="modal-title">{task.title}</h3>
        }
        onClose={onClose}
        >
        <EditableSelect onSave={(value) => handleEditTask({status: value})} value={task.status} name="status">
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
                            handleEditTask({description: value});
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
                <button className="btn submit-btn">Create</button>
            </form>
            {
                comments.length !== 0 ?
                    <div className="comments-container">
                        {
                            comments.map((comment) => {
                                return <CommentCard
                                    key={comment.id}
                                    comment={comment}
                                    actions={
                                        <button onClick={() => deleteComment(comment)} type="button" className="action-delete-btn">
                                            <Trash2 size={18} />
                                        </button>
                                    }
                                >
                                    {
                                        selectedComment?.id === comment.id ?
                                            <EditableText
                                                onSave={(value) => {
                                                    handleEditComment(comment, {content: value});
                                                }}
                                                onCancel={() => setSelectedComment(null)}
                                                defaultValue={comment.content}
                                                name="content"
                                            />
                                            : <p onClick={() => setSelectedComment(comment)} className="comment-content">{comment.content}</p>
                                    }
                                </CommentCard>
                            })
                        }
                    </div>
                    : <div className="empty-comments">No Comments</div>
            }
        </div>
    </Modal>
}

export default ShowTaskModal;