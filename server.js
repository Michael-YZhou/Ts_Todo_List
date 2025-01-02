import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

// --------------------------------------------------
// Setup ESM __dirname & __filename equivalents
// --------------------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --------------------------------------------------
// Path to our JSON "database"
// --------------------------------------------------
const DATA_FILE = path.join(__dirname, "database.json");

// --------------------------------------------------
// Express App Setup
// --------------------------------------------------
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// --------------------------------------------------
// Helper functions to read/write Todos
// --------------------------------------------------
function readTodos() {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading data file:", error);
    return [];
  }
}

function writeTodos(todos) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing to data file:", error);
  }
}

// --------------------------------------------------
// API Endpoints
// --------------------------------------------------

// GET /todos - Fetch all todos
app.get("/todos", (req, res) => {
  const todos = readTodos();
  res.json(todos);
});

// POST /todos - Create a new todo
app.post("/todos", (req, res) => {
  const { title, summary } = req.body;

  if (!title || !summary) {
    return res
      .status(400)
      .json({ error: "Please provide both 'title' and 'summary'." });
  }

  const todos = readTodos();

  const newTodo = {
    id: Date.now(),
    title,
    summary,
    completed: false,
  };

  todos.push(newTodo);
  writeTodos(todos);

  return res.status(201).json(newTodo);
});

// DELETE /todos/:id - Delete a todo by ID
app.delete("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id, 10);
  let todos = readTodos();

  const index = todos.findIndex((t) => t.id === todoId);
  if (index === -1) {
    return res.status(404).json({ error: "Todo not found." });
  }

  const deletedTodo = todos[index];
  todos = todos.filter((t) => t.id !== todoId);
  writeTodos(todos);

  return res.json(deletedTodo);
});

// PATCH /todos/:id - Edit a Todo item
app.patch("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id, 10);
  const todos = readTodos();

  const index = todos.findIndex((t) => t.id === todoId);
  if (index === -1) {
    return res.status(404).json({ error: "Todo not found." });
  }

  // Destructure any fields you want to allow for editing
  const { title, summary, completed } = req.body;

  // If a field is provided in the request, update it
  if (title !== undefined) {
    todos[index].title = title;
  }

  if (summary !== undefined) {
    todos[index].summary = summary;
  }

  if (completed !== undefined) {
    todos[index].completed = completed;
  }

  // Save changes
  writeTodos(todos);

  return res.json(todos[index]);
});

// --------------------------------------------------
// Start the Server
// --------------------------------------------------
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
