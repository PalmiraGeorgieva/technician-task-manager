import { useTasks} from '../../contexts/TasksContext';
import StatCard from '../../components/StatCard/StatCard';
import TaskCard from '../../components/TaskCard/TaskCard';
import "./Dashboard.css";

function Dashboard() {
    const { tasks } = useTasks();
    const totalTasks = tasks.length;
    const recentTasks = tasks.slice(-3).reverse();

    const pendingTasks = tasks.filter(
        (task) => task.status === "PENDING"
    ).length;

    const inProgressTasks = tasks.filter(
        (task) => task.status === "IN_PROGRESS"
    ).length;

    const completedTasks = tasks.filter(
        (task) => task.status === "COMPLETED"
    ).length;

    const lowPriorityTasks = tasks.filter(
        (task) => task.priority === "LOw"
    ).length;

    const mediumPriorityTasks = tasks.filter(
        (task) => task.priority === "MEDIUM"
    ).length;

    const highPriorityTasks = tasks.filter(
        (task) => task.priority === "HIGH"
    ).length;


    return (
        <section className='dashboard'>
            <h1>Dashboard</h1>

            <div className='stats-container'>
                <StatCard title="Total Tasks" value={totalTasks} />
                <StatCard title="Pending" value={pendingTasks} />
                <StatCard title="In Progress" value={inProgressTasks} />
                <StatCard title="Completed" value={completedTasks} />
                <StatCard title="Low Priority" value={lowPriorityTasks} />
                <StatCard title="Medium Priority" value={mediumPriorityTasks} />
                <StatCard title="High Priority" value={highPriorityTasks} />
            </div>

            <div className='recent-tasks'>
                <h2>Recent Tasks</h2>
                {tasks.length === 0 ? (
                    <p className="no-tasks">
                        No tasks have been created yet.
                    </p>
                ) : (
                    <div className='recent-task-list'>
                        {recentTasks.map((task) => (
                            <TaskCard
                               key={task.id}
                               task={task}
                            />
                        ))}
                    </div>
                  )}
            </div>
        </section>
    );
}

export default Dashboard;