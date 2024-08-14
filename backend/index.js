import express from "express";
import morgan from "morgan";
import "dotenv/config";
import {
  addTodos,
  completedTodo,
  deleteCompletedTodos,
  deleteTodo,
  getTodos,
} from "./controller.js";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(morgan("tiny"));

app.get("/api/todos", getTodos);

app.post("/api/todo", addTodos);

app.delete("/api/todo/:id", deleteTodo);
app.delete("/api/all-completed", deleteCompletedTodos);

app.put("/api/todo", completedTodo);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
