import { AddTodoForm } from "../components/AddTodoForm";
import { TodoList } from "../components/TodoList";
import TodoSummary from "../components/TodoSummary";
import { useTodos } from "../hooks/useTodos";

export const Todos = () => {
  const {
    todos,
    addTodo,
    setTodoCompleted,
    deleteTodo,
    deleteAllCompletedTodos,
  } = useTodos();

  return (
    <div className="flex flex-col bg-slate-300 h-screen">
      <h1 className="bg-orange-300 text-5xl text-center font-bold p-3 ">
        Todos
      </h1>
      <AddTodoForm addNewTodo={addTodo} />
      {todos && (
        <>
          <TodoList
            todos={todos}
            onCompletedChange={setTodoCompleted}
            onDelete={deleteTodo}
          />
          <TodoSummary
            todos={todos}
            deleteAllCompleted={deleteAllCompletedTodos}
          />
        </>
      )}
    </div>
  );
};
