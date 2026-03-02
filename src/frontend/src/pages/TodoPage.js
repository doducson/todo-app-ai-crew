import React, { useEffect, useState } from "react";
import API from "../services/api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function TodoPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await API.get("/tasks");
      setTasks(response.data.tasks);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (payload) => {
    try {
      const response = await API.post("/tasks", payload);
      setTasks((prev) => [response.data.task, ...prev]);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to create task");
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await API.delete(`/tasks/${taskId}`);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete task");
    }
  };

  const handleStatusChange = async (taskId, status) => {
    try {
      const response = await API.put(`/tasks/${taskId}`, { status });
      setTasks((prev) => prev.map((task) => (task.id === taskId ? response.data.task : task)));
    } catch (err) {
      setError(err.response?.data?.message || "Unable to update status");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <>
      <div className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Todo Dashboard</h2>
        <button style={{ background: "#ef4444", color: "#fff" }} onClick={handleLogout}>
          Logout
        </button>
      </div>
      <TaskForm onSubmit={handleCreate} />
      {loading ? <p>Loading tasks...</p> : <TaskList tasks={tasks} onDelete={handleDelete} onStatusChange={handleStatusChange} />}
      {error && <p style={{ color: "#b91c1c" }}>{error}</p>}
    </>
  );
}
