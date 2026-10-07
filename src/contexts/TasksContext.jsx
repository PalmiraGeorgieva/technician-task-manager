import { createContext, useState, useEffect, useContext } from "react";

const TasksContext = createContext();


export function TasksProvider({ children }) {
    const [tasks, setTasks] = useState([]);
    const [technicians, setTechnicians] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const loadTasks = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch("http://localhost:5000/api/tasks");

            if(!response.ok) {
                throw new Error("Failed to load tasks");
            }
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error(error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
      };

      const loadTechnicians = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/users/technicians");

            if(!response.ok) {
                throw new Error("Failed to load technicians");
            }
            const data = await response.json();
            console.log("Technicians loaded:", data);
            setTechnicians(data);
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
      };

      loadTasks();
      loadTechnicians();
   }, []);

    return (
        <TasksContext.Provider value={{ tasks, setTasks, technicians, loading, error }}>
            {children}
        </TasksContext.Provider>
    );
}

export function useTasks(){
    return useContext(TasksContext);
};