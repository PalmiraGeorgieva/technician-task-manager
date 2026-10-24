import { createContext, useState, useEffect, useContext } from "react";
import { API_URL } from "../config/api";

const TasksContext = createContext();


export function TasksProvider({ children }) {
    const [tasks, setTasks] = useState([]);
    const [technicians, setTechnicians] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
       const controller = new AbortController();
      const loadTasks = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`${API_URL}/api/tasks`, {
                signal: controller.signal,
            });

            if(!response.ok) {
                throw new Error("Failed to load tasks");
            }
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            if (error.name === "AbortError") return;
            console.error(error);
            setError(error.message);
        } finally {
            if (!controller.signal.aborted){
                setLoading(false);
            }

        }
      };

      const loadTechnicians = async () => {
        try {
           const response = await fetch(`${API_URL}/api/users/technicians`, {
            signal: controller.signal,
           });

            if(!response.ok) {
                throw new Error("Failed to load technicians");
            }
            const data = await response.json();
            console.log("Technicians loaded:", data);
            setTechnicians(data);
        } catch (error) {
            if (error.name === "AbortError") return;
            console.error(error);
            setError(error.message);
        }
      };

      loadTasks();
      loadTechnicians();
      return () => {
        controller.abort();
      }
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