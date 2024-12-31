import { type ReactNode } from "react";

type CourseGoalProps = {
  title: string;
  children: ReactNode;
  id: number;
  onDelete: (id: number) => void;
};

export default function CourseGoal({
  title,
  children,
  id,
  onDelete,
}: CourseGoalProps) {
  return (
    <article className="flex items-start justify-between">
      <div>
        <h2 className="m-0 text-xl text-[#b1c1c3]">{title}</h2>
        {children}
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
