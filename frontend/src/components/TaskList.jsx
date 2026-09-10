function TaskList({ tasks, onDelete }) {

    if (tasks.length === 0) {
        return <p>No tasks found.</p>;
    }

    return (
        <div>

            {tasks.map((task) => (

                <div key={task.id} className="task-card">

                    <h3>{task.title}</h3>

                    <p>{task.description}</p>

                    <p>
                        Status: <strong>{task.status}</strong>
                    </p>

                    <p>
                        Priority: <strong>{task.priority}</strong>
                    </p>

                    <p>
                        Due: {task.due_date || "No deadline"}
                    </p>

                    <button
                        onClick={() => onDelete(task.id)}
                    >
                        Delete
                    </button>

                </div>

            ))}

        </div>
    );
}

export default TaskList;