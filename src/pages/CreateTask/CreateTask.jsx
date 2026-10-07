import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {useTasks} from "../../contexts/TasksContext";
import "./CreateTask.css";
import { API_URL } from "../../config/api";


function CreateTask() {
    const navigate = useNavigate();
    const [technicians, setTechnicians] = useState([]);

    useEffect(() => {
        const loadTechnicians = async () => {
            try {
                const response = await fetch(`${API_URL}/api/users/technicians`);
                if (!response.ok) {
                    throw new Error("Failed to load technicians");
                }
                const data = await response.json();
                setTechnicians(data);
            } catch (error) {
                console.error("Error loading technicians:", error);
            }
        };

        loadTechnicians();
    }, []);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        technicianId: "",
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

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (!formData.title || !formData.description || !formData.date) {
            alert("Please fill in all required fields.");
            return;
        }

       try {
            const response = await fetch(`${API_URL}/api/tasks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    title: formData.title,
                    description: formData.description,
                    technicianId: formData.technicianId 
                               ? Number(formData.technicianId)
                               : null,
                    status: formData.status,
                    priority: formData.priority,
                    date: formData.date,
                    address: formData.address,
                }),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to create task");
            }

            setTasks((currentTasks) => [...currentTasks, data]);


            navigate(`/tasks/${data.id}`);

       } catch(error) {
            console.error("Error creating task:", error);
            alert(error.message);

       }
        
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
                <select id="technicianId" name="technicianId" value={formData.technicianId} onChange={handleChange}>
                    <option value="">Select a technician</option>
                    {technicians.map((technician) => (
                        <option key={technician.id} value={technician.id}>
                            {technician.name}
                        </option>
                    ))}
                </select>
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
