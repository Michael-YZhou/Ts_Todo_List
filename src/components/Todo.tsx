import { type ReactNode } from "react";

type TodoProps = {
  title: string;
  children: ReactNode;
  id: number;
  completed: boolean;
  onDelete: (id: number) => void;
  toggleTodo: (id: number) => void;
};

export default function Todo({
  title,
  children,
  id,
  completed,
  onDelete,
  toggleTodo,
}: TodoProps) {
  return (
    <article className="flex items-start justify-between">
      <input
        type="checkbox"
        checked={completed}
        onChange={() => toggleTodo(id)}
        className="mr-2"
      />
      <div>
        <h2
          className={`m-0 text-xl text-[#b1c1c3] ${
            completed ? "line-through text-gray-500" : ""
          }`}
        >
          {title}
        </h2>
        <p
          className={`m-0 text-[0.85rem] text-[#dfd9be] ${
            completed ? "line-through text-gray-500" : ""
          }`}
        >
          {children}
        </p>
      </div>
      <button
        className="px-2 bg-transparent border-none text-[#909a9a] cursor-pointer hover:text-[#f9a73b]"
        onClick={() => onDelete(id)}
      >
        Delete
      </button>
    </article>
  );
}
