import { useRef, type FormEvent } from "react";

type NewTodoProps = {
  onAddTodo: (todo: string, summary: string) => void;
};

export default function NewTodo({ onAddTodo }: NewTodoProps) {
  const todo = useRef<HTMLInputElement>(null);
  const summary = useRef<HTMLInputElement>(null);

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
    onAddTodo(enteredTodo, enteredSummary);
  }

  return (
    <form className="mb-4" onSubmit={handleSubmit}>
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
    </form>
  );
}
