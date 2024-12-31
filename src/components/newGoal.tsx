import { useRef, type FormEvent } from "react";

type NewGoalProps = {
  onAddGoal: (goal: string, summary: string) => void;
};

export default function NewGoal({ onAddGoal }: NewGoalProps) {
  const goal = useRef<HTMLInputElement>(null);
  const summary = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const enteredGoal = goal.current!.value;
    const enteredSummary = summary.current!.value;

    event.currentTarget.reset();
    onAddGoal(enteredGoal, enteredSummary);
  }

  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      <p>
        <label
          className="block text-[0.85rem] font-bold uppercase text-[#dfd9be]"
          htmlFor="goal"
        >
          Your Goal
        </label>
        <input
          className="w-full p-2 bg-[#b4b6c4] border-none rounded"
          id="goal"
          type="text"
          ref={goal}
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
          Add Goal
        </button>
      </p>
    </form>
  );
}
