import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, "database.json");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// --------------------------------------------------
// Helper functions to read/write Todos
// --------------------------------------------------
function readTodos() {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading data file:", error);
    // Rethrow to be caught in the route handlers
    throw error;
  }
}

function writeTodos(todos) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing to data file:", error);
    // Rethrow to be caught in the route handlers
    throw error;
  }
}

// --------------------------------------------------
// API Endpoints
// --------------------------------------------------

// GET /todos - Fetch all todos
app.get("/todos", (req, res) => {
  try {
    const todos = readTodos();
    return res.json({ todos });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Failed to fetch todos", details: err.message });
  }
});

// POST /todos - Create a new todo
app.post("/todos", (req, res) => {
  try {
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
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Failed to create a new todo", details: err.message });
  }
});

// DELETE /todos/:id - Delete a todo by ID
app.delete("/todos/:id", (req, res) => {
  try {
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
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Failed to delete todo", details: err.message });
  }
});

// PATCH /todos/:id - Edit a Todo item
app.patch("/todos/:id", (req, res) => {
  try {
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

    writeTodos(todos);
    return res.json(todos[index]);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Failed to edit todo", details: err.message });
  }
});

// --------------------------------------------------
// Start the Server
// --------------------------------------------------
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
