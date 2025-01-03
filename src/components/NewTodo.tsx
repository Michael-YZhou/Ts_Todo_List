import { useRef, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../util/http";
import { createNewTodo } from "../util/http";
import ErrorBlock from "./ErrorBlock";
import { FetchError } from "../types";

export default function NewTodo() {
  const todo = useRef<HTMLInputElement>(null);
  const summary = useRef<HTMLInputElement>(null);

  // Create a new todo on the server using useMutation
  const { data, mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewTodo,
    onSuccess: () => {
      console.log(`Task ${data?.title} added successfully`);
      // Invalidate the query to refetch the data
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      // can navigate to a new page using navigate('/destination') if needed
    },
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const enteredTodo = todo.current!.value.trim();
    const enteredSummary = summary.current!.value.trim();

    // both input must not be empty
    if (!enteredTodo || !enteredSummary) {
      alert("Please fill out both fields.");
      return; // stop here if inputs are empty
    }

    event.currentTarget.reset();
    // Call the mutation function with the entered values
    mutate({ title: enteredTodo, summary: enteredSummary });
  }

  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      {isPending && (
        <p className="w-full h-32 text-[#f7e596]">Adding task...</p>
      )}
      {isError && (
        <ErrorBlock
          title="An error occurred"
          // use typescript as to check if error is a FetchError
          // if it is, get the details from the info property
          message={
            (error as FetchError<{ details: string }>)?.info?.details ||
            "Failed to create task"
          }
        />
      )}
      {!isPending && (
        <>
          <p>
            <label
              className="block text-[0.85rem] font-bold uppercase text-[#dfd9be]"
              htmlFor="todo"
            >
              Your Task
            </label>
            <input
              className="w-full p-2 bg-[#b4b6c4] border-none rounded"
              id="todo"
              type="text"
              ref={todo}
            />
          </p>
          <p>
            <label
              className="block text-[0.85rem] font-bold uppercase text-[#dfd9be]"
              htmlFor="Summary"
            >
              Short Summary
            </label>
            <input
              className="w-full p-2 bg-[#b4b6c4] border-none rounded"
              id="Summary"
              type="text"
              ref={summary}
            />
          </p>
          <p>
            <button className="block w-full p-3 mt-4 bg-[#f7e596] text-[#3a4346] font-bold rounded hover:bg-[#f9e175]">
              Add Task
            </button>
          </p>
        </>
      )}
    </form>
  );
}
