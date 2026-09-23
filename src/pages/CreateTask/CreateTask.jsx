import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useTasks} from "../../contexts/TasksContext";
import "./CreateTask.css";


function CreateTask() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        technician: "",
        status: "PENDING",
        priority: "LOW",
        date: "",
        address: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const { setTasks } = useTasks();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.title || !formData.description || !formData.date) {
            alert("Please fill in all required fields.");
            return;
        }

        const newTask = {
            id: Date.now(),
            title: formData.title,
            description: formData.description,
            technician: formData.technician
                ? { name: formData.technician }
                : null,
            status: formData.status,
            priority: formData.priority,
            date: formData.date,
            address: formData.address,
        };

        setTasks((currentTasks) => [
            ...currentTasks,
            newTask
        ]);

        setFormData({
            title: "",
            description: "",
            technician: "",
            status: "PENDING",
            priority: "LOW",
            date: "",
            address: "",
        });

        navigate("/dashboard");
    };
    return (
        <section className="create-task">
        <h1>Create Task</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" 
                  value={formData.title}
                  onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" 
                    value={formData.description}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="technician">Technician</label>
                <input type="text" id="technician" name="technician" 
                  value={formData.technician}
                  onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="address">Address</label>
                <input type="text" id="address" name="address" 
                  value={formData.address}
                  onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="status">Status</label>
                <select name="status" id="status" value={formData.status} onChange={handleChange}>
                    <option value="PENDING">Pending</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                </select>
            </div>

            <div>
                <label htmlFor="priority">Priority</label>
                <select name="priority" id="priority" value={formData.priority} onChange={handleChange}>
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                </select>
            </div>
            
            <div>
                <label htmlFor="date">Date</label>
                <input type="datetime-local" id="date" name="date" 
                 value={formData.date}
                 onChange={handleChange}
                />
            </div>

            <button type="submit">Create Task</button>
        </form>
        </section>
    );
}

export default CreateTask;
