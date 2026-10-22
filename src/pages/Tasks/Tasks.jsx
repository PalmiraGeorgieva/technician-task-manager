import { useTasks } from "../../contexts/TasksContext";
import TaskCard from "../../components/TaskCard/TaskCard";
import "./Tasks.css";

function Tasks() {
    const { tasks, loading, error } = useTasks();

    if (loading) {
        return <p>Loading tasks...</p>;
    }

    if (error) {
        return <p>Failed to load tasks: {error}</p>;
    }
    return (
        <section className="tasks-page">
        <h1>Tasks</h1>

            <div className="tasks-container">
                {tasks.length === 0 ? (
                    <p className="no-tasks">
                        No tasks have been created yet.
                    </p>
                ) : (
                    tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            showActions={true}
                        />
                    ))
                )}
            </div>
        </section>
      );
}

export default Tasks;