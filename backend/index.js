import express from "express";
import morgan from "morgan";
import "dotenv/config";
import {
  addTodos,
  completedTodo,
  createUser,
  deleteCompletedTodos,
  deleteTodo,
  getTodos,
  getUser,
} from "./controller.js";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/api/todos/:userId", getTodos);

app.post("/api/todo", addTodos);
app.post("/api/user", createUser);
app.post("/api/auth", getUser);

app.delete("/api/todo/:id", deleteTodo);
app.delete("/api/all-completed", deleteCompletedTodos);

app.put("/api/todo", completedTodo);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
