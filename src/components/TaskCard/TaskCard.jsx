import { useTasks } from "../../contexts/TasksContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./TaskCard.css";
import { API_URL } from "../../config/api";

function TaskCard({ task, showActions = false }) {
    const { setTasks, technicians = [] } = useTasks();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    


    const technicianChangeHandler = async (e) => {
        const technicianId = e.target.value
            ? Number(e.target.value)
            : null;

        try {
            const response = await fetch(`${API_URL}/api/tasks/${task.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    technicianId,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to update task");
            }

            setTasks((currentTasks) =>
                currentTasks.map((currentTask) =>
                    currentTask.id === task.id ? data : currentTask
                )
            );

        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    const statusChangeHandler = async (e) => {
        const status = e.target.value;

        try {
            const response = await fetch(`${API_URL}/api/tasks/${task.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    status,
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Failed to update task");
            }

            setTasks((currentTasks) =>
                currentTasks.map((currentTask) =>
                    currentTask.id === task.id ? data : currentTask
                )
            );

        } catch (error) {
            console.error(error);
            alert(error.message);
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
            alert()
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
            {isAuthenticated ? (
                <select
                    value={task.technicianId || ""}
                    onChange={technicianChangeHandler}
                    className="technician-select"
                >
                    <option value="">Select Technician</option>

                    {technicians.map((tech) => (
                        <option key={tech.id} value={tech.id}>
                            {tech.name}
                        </option>
                    ))}
                </select>
            ) : (
                <strong>
                    {task.technician?.name || "Not assigned"}
                </strong>
            )}
        </p>

        <p>
            <b>Status:</b>{" "}
            {isAuthenticated ? (
                <select
                    value={task.status}
                    onChange={statusChangeHandler}
                    className={`status-select status-${task.status
                        .toLowerCase()
                        .replaceAll("_", "-")}`}
                >
                    <option value="PENDING">Pending</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                </select>
            ) : (
                <span
                    className={`task-status status-${task.status
                        .toLowerCase()
                        .replaceAll("_", "-")}`}
                >
                    {formatStatus(task.status)}
                </span>
            )}
        </p>

        <p>
            <b>Priority:</b>{" "}
            <span
                className={`task-priority priority-${task.priority
                    .toLowerCase()
                    .replaceAll("_", "-")}`}
            >
                {formatStatus(task.priority)}
            </span>
        </p>

        <p className="task-date">
            <b>Date:</b> {formatDate(task.date)}
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

                {isAuthenticated && (
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
