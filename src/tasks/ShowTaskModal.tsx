import Modal from "../components/Modal.tsx";
import {useEffect, useState} from "react";
import type {Task, TaskError, TaskUpdateInput} from "./types/Task.ts";
import EditableInput from "../components/EditableInput.tsx";
import EditableText from "../components/EditableText.tsx";
import EditableSelect from "../components/EditableSelect.tsx";
import {TASK_STATUS, TASK_STATUS_LABELS} from "./types/TaskStatus.ts";
import type {Comment, CommentError, CommentInput} from "./types/Comment.ts";
import CommentCard from "./CommentCard.tsx";
import {Trash2} from "lucide-react";
import {validateUpdateTask} from "../validation/taskValidation.ts";
import {isValid} from "../validation/validation.ts";
import {validateComment} from "../validation/commentValidation.ts";
import InputError from "../components/InputError.tsx";

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
    const [taskErrors, setTaskErrors] = useState<TaskError>({});
    const [commentErrors, setCommentErrors] = useState<CommentError>({});
    const [commentEditErrors, setCommentEditErrors] = useState<CommentError>({});

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
        setComments((currentComments) => currentComments.map((item) => item.id === comment.id ? comment : item));
    }

    function handleSubmit(data: CommentInput): boolean {
        const normalizedData = {content: data.content.trim()};
        const errors = validateComment(normalizedData);

        if (!isValid(errors)) {
            setCommentErrors(errors);
            return false;
        }

        const comment: Comment = {
            id: crypto.randomUUID(),
            content: normalizedData.content,
            taskId: task.id,
            createdAt: new Date().toISOString(),
        };

        setCommentErrors({});
        createComment(comment);

        return true;
    }

    function handleEditComment(editedComment: Comment, data: CommentInput): boolean {
        const normalizedData = {content: data.content.trim()};
        const errors = validateComment(normalizedData);

        if (!isValid(errors)) {
            setCommentEditErrors(errors);
            return false;
        }

        setCommentEditErrors({});
        editComment({...editedComment, ...normalizedData});
        setSelectedComment(null);

        return true;
    }

    function handleEditTask(data: TaskUpdateInput): boolean {
        const normalizedData: TaskUpdateInput = {
            ...data,
            ...("title" in data && {
                title: data.title.trim(),
            }),
            ...("description" in data && {
                description: data.description.trim(),
            }),
        };

        const errors = validateUpdateTask(normalizedData);

        if (!isValid(errors)) {
            setTaskErrors(errors);
            return false;
        }

        setTaskErrors({});
        onSave({...task, ...normalizedData});

        return true;
    }

    return <Modal
        title={
            isEditTitle ?
                <EditableInput
                    name="title"
                    onCancel={() => {
                        setTaskErrors({});
                        setIsEditTitle(false)
                    }}
                    onSave={(value) => {
                        if (!handleEditTask({title: value})) {
                            return false;
                        }

                        setIsEditTitle(false);
                        return true;
                    }}
                    defaultValue={task.title}
                    errors={taskErrors.title ?? []}
                />
                : <h3 onClick={() => {
                    setTaskErrors({});
                    setIsEditTitle(true)
                }} className="modal-title">{task.title}</h3>
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
                        onCancel={() => {
                            setTaskErrors({});
                            setIsEditDescription(false)
                        }}
                        onSave={(value) => {
                            if (!handleEditTask({description: value})) {
                                return false;
                            }

                            setIsEditDescription(false);
                            return true;
                        }}
                        defaultValue={task.description}
                        errors={taskErrors.description ?? []}
                    />
                    : <p onClick={() => {
                        setTaskErrors({});
                        setIsEditDescription(true)
                    }}>{task.description}</p>
            }
        </div>
        <div className="comments-section">
            <h3>Comments</h3>
            <form onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const formData = new FormData(form);
                const success = handleSubmit({content: String(formData.get("content"))});

                if (success) {
                    form.reset();
                }
            }} className="comment-form">
                <textarea name="content" className="input-field "></textarea>
                {
                    <InputError errors={commentErrors.content ?? []} />
                }
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
                                                    return handleEditComment(comment, {content: value});
                                                }}
                                                onCancel={() => {
                                                    setCommentEditErrors({});
                                                    setSelectedComment(null)
                                                }}
                                                defaultValue={comment.content}
                                                name="content"
                                                errors={commentEditErrors.content ?? []}
                                            />
                                            : <p onClick={() => {
                                                setCommentEditErrors({});
                                                setSelectedComment(comment)
                                            }} className="comment-content">{comment.content}</p>
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