import { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import Todo from "./Todo";
import {
  type Todo as TodoTask,
  FetchError,
  FetchTodosErrorResponse,
} from "../types";
import InfoBox from "./InfoBox";
import { fetchTodos } from "../util/http";
import LoadingIndicator from "./LoadingIndicator";
import ErrorBlock from "./ErrorBlock";

type TodoListProps = {
  todos: TodoTask[];
  onDeleteTodo: (id: number) => void;
  onToggleTodo: (id: number) => void;
};

export default function TodoList({
  todos,
  onDeleteTodo,
  onToggleTodo,
}: TodoListProps) {
  // Fetch Todos from the server using React Query
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  let content: ReactNode = null;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    const fetchError = error as FetchError<FetchTodosErrorResponse>;
    content = (
      <ErrorBlock
        title="An error occurred"
        message={fetchError.info?.details || "Failed to fetch tasks"}
      />
    );
  }

  if (data) {
    console.log(data);
    content = (
      <ul className="grid gap-4 list-none p-0 m-0 grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] mt-8">
        {data.map((todo) => (
          <li
            className="bg-[#475357] p-4 rounded shadow-[0_0_10px_rgba(0,0,0,0.25)]"
            key={todo.id}
          >
            <Todo
              title={todo.title}
              id={todo.id}
              completed={todo.completed}
              onDelete={onDeleteTodo}
              toggleTodo={onToggleTodo}
            >
              {todo.description}
            </Todo>
          </li>
        ))}
      </ul>
    );
  }

  // Display a hint box if there are no Todos
  if (data && data.length === 0) {
    return <InfoBox mode="hint">No Tasks found. Maybe add one?</InfoBox>;
  }

  // Display a warning box if there are more than 3 Todos
  let warningBox: ReactNode;
  if (data && data.length >= 4) {
    warningBox = (
      <InfoBox mode="warning" severity="medium">
        You have a lot of Tasks. Don't put too much on your plate!
      </InfoBox>
    );
  }

  return (
    <>
      {warningBox}
      {content}
    </>
  );
}
