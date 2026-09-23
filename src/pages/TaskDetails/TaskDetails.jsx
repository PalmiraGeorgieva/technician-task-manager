import { useParams, useNavigate } from "react-router-dom";
import { useTasks } from "../../contexts/TasksContext";
import "./TaskDetails.css";



function TaskDetails(){
    const { taskId } = useParams();
    const { tasks } = useTasks();
    const navigate = useNavigate();
   

    const task = tasks.find(
        (task) => task.id === Number(taskId)
    );

    if(!task) {
        return (
            <section className="task-details">
                <div className="task-details-card">
                <h1>Task not found</h1>
                <button className="back-btn" onClick={() => navigate("/tasks")}>
                   ← Back to Tasks
                </button>
                </div>
            </section>
        );
    }

    return (
        <section className="task-details">
           <div className="task-details-card">
            <h1>Task Details</h1>
            <h2>{task.title}</h2>
            <div className="task-details-info">
                <p>
                    <b>Description:</b>{" "}
                    {task.description || "No description"}
                </p>
                <p>
                    <b>Technician:</b>{" "}
                    {task.technician?.name || "Not assigned"}
                </p>
                <p>
                    <b>Address:</b>{" "}
                    {task.address || "No address"}
                </p>

                <p>
                    <b>Status:</b>{" "}
                    {task.status
                     ? task.status
                          .toLowerCase()
                          .replaceAll("_", " ")
                          .replace(/\b\w/g, (char) => char.toUpperCase()) : "No status"}
                </p>

                <p>
                    <b>Priority:</b>{" "}
                    {task.priority 
                    ? task.priority
                          .toLowerCase()
                          .replace(/\b\w/g, (char) => char.toUpperCase()) : "No priority"}
                </p>
                <p>
                    <b>Date:</b>{" "}
                    {task.date ? new Date(task.date).toLocaleString("bg-BG") : "No date"}
                </p>
            </div>
            <button className="back-btn" onClick={() => navigate("/tasks")}>← Back to Tasks</button>
           </div>
        </section>
    );
}

export default TaskDetails;
