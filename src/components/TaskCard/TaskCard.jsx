import { useTasks } from "../../contexts/TasksContext";
import { useNavigate } from "react-router-dom";
import "./TaskCard.css";

function TaskCard({ task, showActions = false }) {
    const { setTasks } = useTasks();
    const navigate = useNavigate();

    const deleteHandler = () => {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${task.title}"`
        );

        if (!confirmed) {
            return;
        }

        setTasks((currentTasks) => 
            currentTasks.filter((currentTask) => currentTask.id !== task.id) 
        );

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
        <p><b>Description:</b>{task.description || "No description"}</p>
        <p><b>Technician:</b> <strong>{task.technician?.name || "Not assigned"}</strong></p>
        <p><b>Status:</b> <span className={`task-status status-${task.status.trim().toLowerCase().replace(/[\s_]+/g, "-")}`}>{formatStatus(task.status)}</span></p>
        <p><b>Priority:</b> <span className={`task-priority priority-${task.priority.toLowerCase().replaceAll("_", "-")}`}>{formatStatus(task.priority)}</span></p>
        <p><b>Address:</b>{task.address || "No address"}</p>
        <p className="task-date"><b>Date:</b> {formatDate(task.date)}</p>
        {showActions && (
            <div className="task-actions">
                <button onClick={() => navigate(`/tasks/${task.id}`)}>Details</button>
                <button onClick={() => navigate(`/tasks/${task.id}/edit`)}>Edit</button>
                <button onClick={deleteHandler}>Delete</button>
            </div>
        )}
       </article>
    );
}
 

export default TaskCard;
