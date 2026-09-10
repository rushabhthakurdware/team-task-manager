import { useEffect, useState } from "react";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

import {
    getTasks,
    createTask,
    deleteTask
} from "./services/taskApi";

import "./App.css";

function App() {

    const [tasks, setTasks] = useState([]);
    const [statusFilter, setStatusFilter] = useState("");

    const loadTasks = async () => {

        try {

            const response = await getTasks(statusFilter);

            setTasks(response.data);

        } catch (error) {

            console.error(error);

            alert("Failed to load tasks");
        }
    };

    useEffect(() => {
        loadTasks();
    }, [statusFilter]);

    const handleCreateTask = async (task) => {

        try {

            await createTask(task);

            await loadTasks();

        } catch (error) {

            console.error(error);

            alert("Failed to create task");
        }
    };

    const handleDeleteTask = async (id) => {

        try {

            await deleteTask(id);

            await loadTasks();

        } catch (error) {

            console.error(error);

            alert("Failed to delete task");
        }
    };

    return (

        <div className="container">

            <h1>Team Task Manager</h1>

            <section>

                <h2>Create Task</h2>

                <TaskForm
                    onTaskCreated={handleCreateTask}
                />

            </section>

            <section>

                <h2>Tasks</h2>

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="">All</option>
                    <option value="TODO">TODO</option>
                    <option value="IN_PROGRESS">
                        In Progress
                    </option>
                    <option value="COMPLETED">
                        Completed
                    </option>
                </select>

                <TaskList
                    tasks={tasks}
                    onDelete={handleDeleteTask}
                />

            </section>

        </div>
    );
}

export default App;