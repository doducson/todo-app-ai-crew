import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Routes>
          <Route
            path="/"
            element={token ? <Navigate replace to="/todos" /> : <Navigate replace to="/login" />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/todos" element={token ? <TodoPage /> : <Navigate replace to="/login" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
