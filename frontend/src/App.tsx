import useFetchTodos from "./hooks/useFetchTodos";
import { TodoList } from "./components/TodoList";
import { AddTodoForm } from "./components/AddTodoForm";
import TodoSummary from "./components/TodoSummary";

const App = () => {
  const { todos, isPending } = useFetchTodos();

  if (isPending) return <h2>Loading...</h2>;

  return (
    <div className="flex flex-col bg-slate-300">
      <h1 className="bg-teal-500 text-5xl text-center font-bold p-3 mt-10">
        Todos
      </h1>
      <AddTodoForm />
      {todos && (
        <>
          <TodoList todos={todos} />
          <TodoSummary todos={todos} />
        </>
      )}
    </div>
  );
};

export default App;
