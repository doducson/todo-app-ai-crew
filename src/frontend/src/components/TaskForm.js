import React, { useState } from "react";

export default function TaskForm({ onSubmit }) {
  const [state, setState] = useState({ title: "", description: "", due_date: "" });

  const handleChange = ({ target }) => setState({ ...state, [target.name]: target.value });

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(state);
    setState({ title: "", description: "", due_date: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>Create New Task</h3>
      <input name="title" placeholder="Title" value={state.title} onChange={handleChange} required />
      <textarea
        name="description"
        placeholder="Optional description"
        rows={3}
        value={state.description}
        onChange={handleChange}
      />
      <input name="due_date" type="date" value={state.due_date} onChange={handleChange} />
      <button type="submit" style={{ background: "#2563eb", color: "#fff" }}>
        Add Task
      </button>
    </form>
  );
}
