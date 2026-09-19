import { useTasks } from "../../contexts/TasksContext";
import TaskCard from "../../components/TaskCard/TaskCard";
import "./Tasks.css";

function Tasks() {
    const { tasks } = useTasks();

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