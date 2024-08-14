import { Todo } from "../types/todos";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
}

export const TodoList = ({ todos }: TodoListProps) => {
  return (
    <>
      <div className="space-y-2 bg-slate-500 p-10">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
      {todos.length === 0 && (
        <p className="text-center text-sm text-gray-500">No todos yet</p>
      )}
    </>
  );
};
