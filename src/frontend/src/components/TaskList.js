import React from "react";

const statusClasses = {
  pending: "status-badge status-pending",
  completed: "status-badge status-completed",
};

export default function TaskList({ tasks, onDelete, onStatusChange }) {
  if (!tasks.length) {
    return <p>No tasks yet. Add one!</p>;
  }

  return (
    <div className="card">
      <h3>Your Tasks</h3>
      {tasks.map((task) => (
        <div className="task" key={task.id}>
          <div>
            <strong>{task.title}</strong>
            {task.description && <p>{task.description}</p>}
            {task.due_date && <small>Due: {new Date(task.due_date).toLocaleDateString()}</small>}
          </div>
          <div style={{ textAlign: "right" }}>
            <span className={statusClasses[task.status]}>{task.status}</span>
            <div style={{ marginTop: "0.5rem" }}>
              <select
                value={task.status}
                onChange={(event) => onStatusChange(task.id, event.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
              <button
                style={{ marginLeft: "0.5rem", background: "#ef4444", color: "#fff" }}
                onClick={() => onDelete(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
