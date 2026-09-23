import "./EditTask.css";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTasks } from "../../contexts/TasksContext";


function EditTask(){
   const { taskId } = useParams();
   const navigate = useNavigate();
   const { tasks, setTasks } = useTasks();

   const task = tasks.find(
      (task) => task.id === Number(taskId)
   );

    const [formData, setFormData] = useState(() => ({
        title: task?.title || "",
        description: task?.description || "",
        technician: task?.technician?.name || "",
        address: task?.address || "",
        status: task?.status || "PENDING",
        priority: task?.priority || "LOW",
        date: task?.date
            ? new Date(task.date).toISOString().split("T")[0]
            : "",
    }));

    if(!task) {
        return (
           <section className="edit-task">
            <h1>Task not found</h1>
           </section>
        )
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!formData.title.trim()) {
            alert("Please enter a technician!");
            return
        }
        if(!formData.technician.trim()) {
            alert("Please enter a technician!");
            return;
        }

        const updatedTasks = {
            ...task,
            ...formData,
            technician: {
                ...task.technician,
                name: formData.technician,
            },
        };

        setTasks((currentTasks) => 
            currentTasks.map((currentTask) => 
                currentTask.id === task.id ? updatedTasks : currentTask

            )
        );
        navigate(`/tasks/${task.id}`);
    }

   return (
    <section className="edit-task">
        <div className="edit-task-card">
        <h1>Edit Task</h1>
               <form onSubmit={handleSubmit}>
                   <label htmlFor="title">Title</label>
                   <input type="text"
                       id="title"
                       name="title"
                       value={formData.title}
                       onChange={handleChange}
                   />

                   <label htmlFor="description">Decription</label>
                   <textarea name="description" id="description"
                       value={formData.description}
                       onChange={handleChange}
                   />

                   <label htmlFor="technician">Technician</label>
                   <input
                       id="technician"
                       type="text"
                       name="technician"
                       value={formData.technician}
                       onChange={handleChange}
                   />

                   <label htmlFor="address">Address</label>
                   <input
                       id="address"
                       type="text"
                       name="address"
                       value={formData.address}
                       onChange={handleChange}
                   />

                   <label htmlFor="status">Status</label>
                   <select
                       id="status"
                       name="status"
                       value={formData.status}
                       onChange={handleChange}
                   >
                       <option value="PENDING">Pending</option>
                       <option value="IN_PROGRESS">In Progress</option>
                       <option value="COMPLETED">Completed</option>
                   </select>

                   <label htmlFor="priority">Priority</label>
                   <select
                       id="priority"
                       name="priority"
                       value={formData.priority}
                       onChange={handleChange}
                   >
                       <option value="LOW">Low</option>
                       <option value="MEDIUM">Medium</option>
                       <option value="HIGH">High</option>
                   </select>

                   <label htmlFor="date">Date</label>
                   <input
                       id="date"
                       type="datetime-local"
                       name="date"
                       value={formData.date}
                       onChange={handleChange}
                   />

                   <div className="edit-task-actions">
                    <button type="submit">Save Changes</button>
                    <button type="button" onClick={() => navigate(`/tasks/${task.id}`)}>Cancel</button>
                   </div>
               </form>
        </div>
    </section>
   );
}

export default EditTask;