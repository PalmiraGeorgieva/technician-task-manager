import { createContext, useState, useEffect, useContext } from "react";

const TasksContext = createContext();


export function TasksProvider({ children }) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(true)

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

        } catch (error) {
            console.error(error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
      };

      loadTasks();
   }, []);

    return (
        <TasksContext.Provider value={{ tasks, setTasks, loading, error }}>
            {children}
        </TasksContext.Provider>
    );
}

export function useTasks(){
    return useContext(TasksContext);
};