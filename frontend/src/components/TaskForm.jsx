import { useState } from "react";

function TaskForm({ onTaskCreated }) {

    const [form, setForm] = useState({
        title: "",
        description: "",
        status: "TODO",
        priority: "MEDIUM",
        due_date: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.title.trim()) {
            alert("Title is required");
            return;
        }

        await onTaskCreated(form);

        setForm({
            title: "",
            description: "",
            status: "TODO",
            priority: "MEDIUM",
            due_date: ""
        });
    };

    return (
        <form onSubmit={handleSubmit}>

            <input
                name="title"
                placeholder="Task title"
                value={form.title}
                onChange={handleChange}
            />

            <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
            />

            <select
                name="status"
                value={form.status}
                onChange={handleChange}
            >
                <option value="TODO">TODO</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
            </select>

            <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
            >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
            </select>

            <input
                type="date"
                name="due_date"
                value={form.due_date}
                onChange={handleChange}
            />

            <button type="submit">
                Create Task
            </button>

        </form>
    );
}

export default TaskForm;