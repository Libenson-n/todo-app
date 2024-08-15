import { Trash2Icon } from "lucide-react";
import { Todo } from "../types/todos";

interface TodoItemProps {
  todo: Todo;
  onCompletedChange: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export const TodoItem = ({
  todo,
  onCompletedChange,
  onDelete,
}: TodoItemProps) => {
  return (
    <div className="flex items-center gap-1">
      <label className="flex items-center gap-2 border rounded-md p-2 border-gray-400 bg-white hover:bg-slate-50 grow">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onCompletedChange(todo.id, todo.completed)}
          className="scale-125"
        />
        <span className={todo.completed ? "line-through text-gray-400" : ""}>
          {todo.title}
        </span>
      </label>
      <button className="p-2" onClick={() => onDelete(todo.id)}>
        <Trash2Icon size={20} className="text-red-600" />
      </button>
    </div>
  );
};
