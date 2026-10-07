import "./EditTask.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTasks } from "../../contexts/TasksContext";

const formatDateForInput = (date) => {
    if (!date) {
        return "";
    }

    const value = new Date(date);

    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, "0");
    const day = String(value.getDate()).padStart(2, "0");
    const hours = String(value.getHours()).padStart(2, "0");
    const minutes = String(value.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
};

function EditTask(){
   const { taskId } = useParams();
   const navigate = useNavigate();
   const { tasks, setTasks, technicians = [], loading } = useTasks();

   const task = tasks.find(
      (task) => task.id === Number(taskId)
   );

    const [formData, setFormData] = useState(() => ({
        title: "",
        description: "",
        technicianId: "",
        address: "",
        status: "PENDING",
        priority: "LOW",
        date: "",
    }));

    useEffect (() => {
        if (loading || !task) {
            return;
        }

        setFormData({
            title: task.title || "",
            description: task.description || "",
            technicianId: task.technicianId || "",
            address: task.address || "",
            status: task.status || "PENDING",
            priority: task.priority || "LOW",
            date: formatDateForInput(task.date),
        });

    }, [task, loading]);



    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(!formData.title.trim()) {
            alert("Please enter a title!");
            return
        }
        
        if(!formData.description.trim()) {
            alert("Please enter a description!");
            return;
        }

        if(!formData.date) {
            alert("Please select a date!");
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:5000/api/tasks/${task.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",

                    },
                    credentials: "include",
                    body: JSON.stringify({
                        title: formData.title.trim(),
                        description: formData.description.trim(),
                        technicianId: formData.technicianId
                            ? Number(formData.technicianId)
                            : null,
                        address: formData.address.trim(),
                        status: formData.status,
                        priority: formData.priority,
                        date: formData.date,    
                    }),
                }
            );

            const data = await response.json(); 

            if(!response.ok) {
                throw new Error(
                    data.message || "Failed to update task"
                );
            }

            setTasks((currentTasks) => 
                currentTasks.map((currentTask) => currentTask.id === task.id ? data : currentTask)
            );

            navigate(`/tasks/${task.id}`);

        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

   if (loading) {
       return (
           <section className="edit-task">
               <h1>Loading task...</h1>
           </section>
       );
   }

   if (!task) {
       return (
           <section className="edit-task">
               <h1>Task not found</h1>
           </section>
       );
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
                   <select
                       id="technicianId"
                       name="technicianId"
                       value={formData.technicianId}
                       onChange={handleChange}
                   >
                       <option value="">Not assigned</option>

                       {technicians.map((technician) => (
                           <option
                               key={technician.id}
                               value={technician.id}
                           >
                               {technician.name}
                           </option>
                       ))}
                   </select>

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
