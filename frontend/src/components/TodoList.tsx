import { Todo } from "../types/todos";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  onCompletedChange: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export const TodoList = ({
  todos,
  onCompletedChange,
  onDelete,
}: TodoListProps) => {
  return (
    <>
      <div className="space-y-2 bg-slate-500 p-10">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onCompletedChange={onCompletedChange}
            onDelete={onDelete}
          />
        ))}
      </div>
      {todos.length === 0 && (
        <p className="text-center text-sm text-gray-500">No todos yet</p>
      )}
    </>
  );
};
