import { useTasks } from "../../contexts/TasksContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./TaskCard.css";
import { API_URL } from "../../config/api";

function TaskCard({ task, showActions = false }) {
    const { setTasks, technicians = [] } = useTasks();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();
    const isOwner = isAuthenticated && user != null && Number(task.ownerId) === Number(user.id);
    const [editingField, setEditingField] = useState(null);
    const [updatingField, setUpdatingField] = useState(null);

    const updateTaskField = async (field, value) => {
        setUpdatingField(field);

        try {
            const response = await fetch(`${API_URL}/api/tasks/${task.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    [field]: value,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to update task");
            }

            setTasks((currentTasks) =>
                currentTasks.map((currentTask) =>
                    currentTask.id === task.id
                        ? { ...currentTask, ...data }
                        : currentTask
                )
            );

            setEditingField(null);
        } catch (error) {
            console.error(error);
            alert(error.message);
        } finally {
            setUpdatingField(null);
        }
    };

    const deleteHandler = async() => {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${task.title}"`
        );

        if (!confirmed) {
            return;
        }

        try {
            const response = await fetch(
                `${API_URL}/api/tasks/${task.id}`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );

            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.message || "Failed to delete task");

            }

            setTasks((currentTask) =>
                currentTask.filter(
                    (currentTask) => currentTask.id !== task.id
                )
            );

        } catch (error) {
            console.error(error);
            alert(error.message)
        }
    };

    const formatStatus = (status) => {
        return status
            .toLowerCase()
            .replaceAll("_", " ")
            .replace(/\b\w/g, (char) => char.toUpperCase());
    };

    const formatDate = (date) => {
        return new Intl.DateTimeFormat("bg-BG", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hourCycle: "h23",
        }).format(new Date(date));
    };

   return (
    <article className="task-card">
        <h3>{task.title}</h3>

        <p>
            <b>Technician:</b>{" "}
            {isOwner && editingField === "technicianId" ? (
                <select
                    autoFocus
                    value={task.technicianId ?? ""}
                    disabled={updatingField !== null}
                    onChange={(e) => updateTaskField(
                        "technicianId",
                        e.target.value ? Number(e.target.value) : null
                    )}
                    onBlur={() => {
                        if (!updatingField) setEditingField(null)
                    }}
                    className="technician-select"
                >
                    <option value="">Select Technician</option>

                    {technicians.map((tech) => (
                        <option key={tech.id} value={tech.id}>
                            {tech.name}
                        </option>
                    ))}
                </select>
            ) : isOwner ? (
                <strong>
                    <button type="button"
                           className="inline-edit-button"
                           onClick={() => setEditingField("technicianId")}
                           disabled={updatingField !== null}
                    >
                        {task.technician?.name || "Not assigned"}
                        <span aria-hidden="true"> ▾</span>
                    </button>
                </strong>
            ) : (
                <strong>{task.technician?.name || "Not assigned"}</strong>
            )}
        </p>

        <p>
            <b>Status:</b>{" "}
            {isOwner && editingField === "status" ? (
                <select
                    autoFocus
                    value={task.status}
                    disabled={updatingField !== null}
                    onChange={(e) =>
                        updateTaskField("status", e.target.value)
                    }
                    className={`status-select status-${task.status
                        .toLowerCase()
                        .replaceAll("_", "-")}`}
                >
                    <option value="PENDING">Pending</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                </select>
            ) : isOwner ? (
                <button
                   type="button"
                   className={`inline-edit-button task-status status-${task.status.toLowerCase().replaceAll("_", "-")}`}
                   onClick={() => setEditingField("status")}
                   disabled={updatingField !== null}
                >
                    {formatStatus(task.status)} ▾
                </button>
            ) : (
                <span className={`task-status status-${task.status.toLowerCase().replaceAll("_", "-")}`}>
                    {formatStatus(task.status)}
                </span>
            )}
        </p>

        <p>
            <b>Priority:</b>{" "}
            {isOwner && editingField === "priority" ? (
                <select autoFocus
                     value={task.priority}
                     disabled={updatingField !== null}
                     onChange={(e) =>
                        updateTaskField("priority", e.target.value)
                     }
                     onBlur={() => {
                        if (!updatingField) setEditingField(null)
                     }}
                    className="priority-select"
                >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                </select>
            ) : isOwner ? (
                <button type="button"
                    className={`inline-edit-button task-priority priority-${task.priority.toLowerCase()}`}
                    onClick={() => setEditingField("priority")}
                    disabled={updatingField !== null}
                >
                    {formatStatus(task.priority)} ▾
                </button>
            ) : (
                <span className={`task-priority priority-${task.priority.toLowerCase()}`}>
                    {formatStatus(task.priority)}
                </span>
            )}
        </p>

        <p className="task-date">
            <b>Date:</b> {formatDate(task.date)}
        </p>
        <p className="task-comments-count">
            <span aria-hidden="true">💬</span>{" "}
            {task._count?.comments ?? 0}{" "}
            {(task._count?.comments ?? 0) === 1 ? "comment" : "comments"}
        </p>

        {showActions && (
            <div className="task-actions">
                <button
                    onClick={() =>
                        navigate(`/tasks/${task.id}`)
                    }
                >
                    Details
                </button>

                {isOwner && (
                    <>
                        <button
                            onClick={() =>
                                navigate(`/tasks/${task.id}/edit`)
                            }
                        >
                            Edit
                        </button>

                        <button onClick={deleteHandler}>
                            Delete
                        </button>
                    </>
                )}
            </div>
        )}
    </article>
    );

}

export default TaskCard;
