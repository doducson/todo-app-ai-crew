import React, { useState } from "react";
import API from "../services/api";

const initialState = { email: "", password: "" };

export default function LoginPage() {
  const [form, setForm] = useState(initialState);
  const [mode, setMode] = useState("login");
  const [message, setMessage] = useState(null);

  const handleChange = ({ target }) => setForm({ ...form, [target.name]: target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const endpoint = mode === "login" ? "/auth/login" : "/auth/register";
      const response = await API.post(endpoint, form);
      localStorage.setItem("token", response.data.token);
      window.location.href = "/todos";
    } catch (error) {
      setMessage(error.response?.data?.message || "Unexpected error");
    }
  };

  return (
    <div className="card">
      <h2>{mode === "login" ? "Login to Todo" : "Create an account"}</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" style={{ background: "#111827", color: "#fff" }}>
          {mode === "login" ? "Login" : "Register"}
        </button>
      </form>
      <button
        style={{ marginTop: "1rem", background: "#e2e8f0" }}
        onClick={() => {
          setMode((mode) => (mode === "login" ? "register" : "login"));
          setMessage(null);
        }}
      >
        Switch to {mode === "login" ? "Register" : "Login"}
      </button>
      {message && <p style={{ color: "#b91c1c", marginTop: "1rem" }}>{message}</p>}
    </div>
  );
}
