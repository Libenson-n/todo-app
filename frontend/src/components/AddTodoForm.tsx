import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const AddTodoForm = () => {
  const [input, setInput] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input.trim()) return;

    onSubmit(input);
    setInput("");
  };

  const onSubmit = (input: string) => {
    const todo = {
      id: uuidv4(),
      title: input,
    };

    fetch("api/todo", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(todo),
    });
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
