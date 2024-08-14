import { Trash2Icon } from "lucide-react";
import { Todo } from "../types/todos";

interface TodoItemProps {
  todo: Todo;
}

const toggleCompleted = async (todo: Todo) => {
  const body = {
    id: todo.id,
    completed: todo.completed,
  };

  fetch("/api/todo", {
    method: "PUT",
    headers: {
      "content-type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(body),
  });
};

const onChange = (todo: Todo) => {
  todo.completed = !todo.completed;
  toggleCompleted(todo);
};

const handleDelete = async (id: string) => {
  await fetch(`/api/todo/${id}`, {
    method: "DELETE",
  });
};

export const TodoItem = ({ todo }: TodoItemProps) => {
  return (
    <div className="flex items-center gap-1">
      <label className="flex items-center gap-2 border rounded-md p-2 border-gray-400 bg-white hover:bg-slate-50 grow">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onChange(todo)}
          className="scale-125"
        />
        <span className={todo.completed ? "line-through text-gray-400" : ""}>
          {todo.title}
        </span>
      </label>
      <button className="p-2" onClick={() => handleDelete(todo.id)}>
        <Trash2Icon size={20} className="text-gray-500" />
      </button>
    </div>
  );
};
