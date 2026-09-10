import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api"
});

export const getTasks = (status = "") => {
    if (status) {
        return API.get(`/tasks?status=${status}`);
    }

    return API.get("/tasks");
};

export const createTask = (task) => {
    return API.post("/tasks", task);
};

export const updateTask = (id, task) => {
    return API.put(`/tasks/${id}`, task);
};

export const deleteTask = (id) => {
    return API.delete(`/tasks/${id}`);
};