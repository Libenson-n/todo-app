import { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "../types/todos";
import { LoggedInUserContext } from "../context/LoggedInUserContext";

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>();

  const { loggedInUser } = useContext(LoggedInUserContext);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await fetch(`/api/todos/${loggedInUser}`);
    const data = await res.json();
    setTodos(data.userTodos);
  };

  const addTodo = async (input: string) => {
    const todo = {
      id: uuidv4(),
      userId: loggedInUser,
      title: input,
    };

    try {
      const res = await fetch("api/todo", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(todo),
      });
      const data = await res.json();
      setTodos([...(todos as []), data.todo]);
    } catch (error) {
      console.error(error);
    }
  };

  const setTodoCompleted = async (id: string, completed: boolean) => {
    completed = !completed;
    const body = {
      id: id,
      completed: completed,
    };

    try {
      fetch("/api/todo", {
        method: "PUT",
        headers: {
          "content-type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(body),
      });
      setTodos((prevTodos) =>
        (prevTodos as []).map((todo: Todo) =>
          todo.id === id ? { ...todo, completed } : todo
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id: string) => {
    await fetch(`/api/todo/${id}`, {
      method: "DELETE",
    });

    setTodos((prevTodos) =>
      (prevTodos as []).filter((todo: { id: string }) => todo.id !== id)
    );
  };

  const deleteAllCompletedTodos = async () => {
    try {
      const response = await fetch("/api/all-completed", {
        method: "DELETE",
      });
      const data = await response.json();
      setTodos(data.todos);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    todos,
    addTodo,
    setTodoCompleted,
    deleteTodo,
    deleteAllCompletedTodos,
  };
};
