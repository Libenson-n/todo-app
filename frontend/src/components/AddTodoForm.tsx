import { useState } from "react";

interface AddTodoFormProps {
  addNewTodo: (title: string) => void;
}

export const AddTodoForm = ({ addNewTodo }: AddTodoFormProps) => {
  const [input, setInput] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!input.trim()) return;

    addNewTodo(input);
    setInput("");
  };

  return (
    <form
      className="flex bg-slate-500 pl-10 pr-20 pt-8"
      onSubmit={handleSubmit}
    >
      <input
        value={input}
        maxLength={40}
        onChange={(e) => setInput(e.target.value)}
        placeholder="What needs to be done"
        className="rounded-s-md grow border border-gray-400 p-2"
      />
      <button
        type="submit"
        className="w-16 rounded-e-md bg-slate-900 text-white hover:bg-slate-800"
      >
        Add
      </button>
    </form>
  );
};
