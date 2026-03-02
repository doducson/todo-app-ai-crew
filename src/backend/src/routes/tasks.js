const express = require("express");
const pool = require("../db");
const authMiddleware = require("../middleware/auth");

const router = express.Router();
router.use(authMiddleware);

router.get("/", async (req, res) => {
  const { id } = req.user;
  try {
    const result = await pool.query(
      "SELECT id, title, description, status, due_date FROM tasks WHERE user_id = $1 ORDER BY created_at DESC",
      [id]
    );
    res.json({ tasks: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to fetch tasks" });
  }
});

router.post("/", async (req, res) => {
  const { id } = req.user;
  const { title, description, due_date } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO tasks (user_id, title, description, status, due_date) VALUES ($1, $2, $3, 'pending', $4) RETURNING id, title, description, status, due_date",
      [id, title, description || null, due_date || null]
    );

    res.status(201).json({ task: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to create task" });
  }
});

router.put("/:taskId", async (req, res) => {
  const { id } = req.user;
  const { taskId } = req.params;
  const { title, description, status, due_date } = req.body;

  try {
    const result = await pool.query(
      "UPDATE tasks SET title = COALESCE($1, title), description = COALESCE($2, description), status = COALESCE($3, status), due_date = COALESCE($4, due_date), updated_at = NOW() WHERE id = $5 AND user_id = $6 RETURNING id, title, description, status, due_date",
      [title, description, status, due_date, taskId, id]
    );

    if (!result.rowCount) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ task: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to update task" });
  }
});

router.delete("/:taskId", async (req, res) => {
  const { id } = req.user;
  const { taskId } = req.params;

  try {
    const result = await pool.query("DELETE FROM tasks WHERE id = $1 AND user_id = $2", [taskId, id]);
    if (!result.rowCount) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to delete task" });
  }
});

module.exports = router;
