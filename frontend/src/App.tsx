import { TodoList } from "./components/TodoList";
import { AddTodoForm } from "./components/AddTodoForm";
import TodoSummary from "./components/TodoSummary";
import { useTodos } from "./hooks/useTodos";

const App = () => {
  const {
    todos,
    addTodo,
    setTodoCompleted,
    deleteTodo,
    deleteAllCompletedTodos,
  } = useTodos();

  return (
    <div className="flex flex-col bg-slate-300">
      <h1 className="bg-teal-500 text-5xl text-center font-bold p-3 mt-10">
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

export default App;
