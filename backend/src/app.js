const express = require("express");
const cors = require("cors");

const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(cors());
app.use(express.json());  // IMPORTANT

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Team Task Manager API"
    });
});

app.use("/api/tasks", taskRoutes);

app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

module.exports = app;