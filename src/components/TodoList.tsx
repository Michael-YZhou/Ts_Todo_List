import { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import Todo from "./Todo";
import { FetchError } from "../types";
import InfoBox from "./UI/InfoBox";
import { fetchTodos } from "../util/http";
import LoadingIndicator from "./UI/LoadingIndicator";
import ErrorBlock from "./UI/ErrorBlock";

export default function TodoList() {
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
    content = (
      <ErrorBlock
        title="An error occurred"
        message={
          // use typescript as to check if error is a FetchError
          // if it is, get the details from the info property
          (error as FetchError<{ details: string }>)?.info?.details ||
          "Failed to fetch tasks"
        }
      />
    );
  }

  if (data) {
    content = (
      <ul className="grid gap-4 list-none p-0 m-0 grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] mt-8">
        {data.map((todo) => (
          <li
            className="bg-[#475357] p-4 rounded shadow-[0_0_10px_rgba(0,0,0,0.25)]"
            key={todo.id}
          >
            <Todo title={todo.title} id={todo.id} completed={todo.completed}>
              {todo.summary}
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
