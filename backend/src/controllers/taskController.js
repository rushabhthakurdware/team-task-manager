const db = require("../config/db");

// GET /api/tasks
const getTasks = async (req, res) => {
    try {
        const { status } = req.query;

        let query = "SELECT * FROM tasks";
        let params = [];

        if (status) {
            query += " WHERE status = $1";
            params.push(status);
        }

        query += " ORDER BY created_at DESC";

        const result = await db.query(query, params);

        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch tasks"
        });
    }
};

// GET /api/tasks/:id
const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await db.query(
            "SELECT * FROM tasks WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch task"
        });
    }
};

// POST /api/tasks
const createTask = async (req, res) => {
    try {
        const {
            title,
            description,
            status,
            priority,
            due_date
        } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        const result = await db.query(
            `INSERT INTO tasks
            (title, description, status, priority, due_date)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
            [
                title,
                description || null,
                status || "TODO",
                priority || "MEDIUM",
                due_date || null
            ]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to create task"
        });
    }
};

// PUT /api/tasks/:id
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            title,
            description,
            status,
            priority,
            due_date
        } = req.body;

        const result = await db.query(
            `UPDATE tasks
             SET title = $1,
                 description = $2,
                 status = $3,
                 priority = $4,
                 due_date = $5
             WHERE id = $6
             RETURNING *`,
            [
                title,
                description || null,
                status,
                priority,
                due_date || null,
                id
            ]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to update task"
        });
    }
};

// DELETE /api/tasks/:id
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await db.query(
            "DELETE FROM tasks WHERE id = $1",
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({
            message: "Task deleted successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to delete task"
        });
    }
};

module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};