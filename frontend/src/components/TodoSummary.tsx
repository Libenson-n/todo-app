import { Todo } from "../types/todos";

interface TodoSummaryPropos {
  todos: Todo[];
}

const TodoSummary = ({ todos }: TodoSummaryPropos) => {
  const completedTodos = todos?.filter((todo) => todo.completed);

  const deleteAllCompleted = async () => {
    await fetch("/api/all-completed", {
      method: "DELETE",
    });
  };

  return (
    <div className="text-center space-y-2">
      <p className="text-sm font-medium">
        {completedTodos?.length}/{todos?.length} completed
      </p>
      {completedTodos?.length > 0 && (
        <button
          onClick={deleteAllCompleted}
          className="text-red-500 hover:underline text-sm font-medium"
        >
          Delete All Completed
        </button>
      )}
    </div>
  );
};

export default TodoSummary;
