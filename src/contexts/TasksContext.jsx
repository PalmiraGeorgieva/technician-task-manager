import { createContext, useState, useEffect, useContext } from "react";

const TasksContext = createContext();

const initialTasks = [
    {
        id: 1,
        title: "Check internet connection",
        technician: "Ivan",
        status: "In Progress",
        priority: "High",
        date: "2026-08-08",
    },
    {
        id: 2,
        title: "Replace customer router",
        technician: "Georgi",
        status: "Pending",
        priority: "Medium",
        date: "2026-08-09",
    },
    {
        id: 3,
        title: "Install new equipment",
        technician: "Petar",
        status: "Completed",
        priority: "High",
        date: "2026-08-10",
    },
];

export function TasksProvider({ children }) {
    const [tasks, setTasks] = useState(() => {
        const storedTasks = localStorage.getItem("tasks");

        return storedTasks ? JSON.parse(storedTasks) : initialTasks;
    });

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
   }, [tasks]);

    return (
        <TasksContext.Provider value={{ tasks, setTasks }}>
            {children}
        </TasksContext.Provider>
    );
}

export function useTasks(){
    return useContext(TasksContext);
};