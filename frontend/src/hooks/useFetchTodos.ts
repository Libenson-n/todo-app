import { useQuery } from "@tanstack/react-query";

const useFetchTodos = () => {
  const { data, isPending } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await fetch("/api/todos");
      return (await response.json()) as any;
    },
  });

  const todos = data?.todos;

  return { todos, isPending };
};

export default useFetchTodos;
