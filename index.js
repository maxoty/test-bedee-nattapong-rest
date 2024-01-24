const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

let todos = [
  { id: "1", title: "Test React native", completed: true },
  { id: "2", title: "Test function longest common prefix", completed: false },
];

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.get("/todos/:id", (req, res) => {
  const todoId = req.params.id;
  const todo = todos.find((t) => t.id === todoId);

  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ error: "Todo not found" });
  }
});

app.post("/todos", (req, res) => {
  const { title } = req.body;
  const MOCK_ID = String(todos.length + 1)
  const newTodo = { id: MOCK_ID, title, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.patch("/todos/:id", (req, res) => {
  const todoId = req.params.id;
  const { title } = req.body
  const findIndex = todos.findIndex((t) => t.id === todoId);

  if (findIndex !== -1) {
    todos[findIndex] = { ...todos[findIndex], title: title };
    res.json(todos[findIndex]);
  } else {
    res.status(404).json({ error: "Todo not found" });
  }
});

app.patch("/todos/:id/completed", (req, res) => {
  const todoId = req.params.id;
  const findIndex = todos.findIndex((t) => t.id === todoId);

  if (findIndex !== -1) {
    todos[findIndex] = { ...todos[findIndex], completed: true };
    res.json(todos[findIndex]);
  } else {
    res.status(404).json({ error: "Todo not found" });
  }
});

app.delete("/todos/:id", (req, res) => {
  const todoId = req.params.id;
  const findIndex = todos.findIndex((t) => t.id === todoId);

  if (findIndex !== -1) {
    todos = todos.filter((t) => t.id !== todoId);
    res.json({ message: "Todo deleted success" });
  } else {
    res.status(404).json({ error: "Todo not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
