import Todo from "./Todo";
import { type Todo as TodoTask } from "../App";
import InfoBox from "./InfoBox";
import { ReactNode } from "react";

type TodoListProps = {
  todos: TodoTask[];
  onDeleteTodo: (id: number) => void;
};

export default function TodoList({ todos, onDeleteTodo }: TodoListProps) {
  // Display a hint box if there are no Todos
  if (todos.length === 0) {
    return <InfoBox mode="hint">No Tasks found. Maybe add one?</InfoBox>;
  }

  // Display a warning box if there are more than 3 Todos
  let warningBox: ReactNode;
  if (todos.length >= 4) {
    warningBox = (
      <InfoBox mode="warning" severity="medium">
        You have a lot of Tasks. Don't put too much on your plate!
      </InfoBox>
    );
  }

  return (
    <>
      {warningBox}
      <ul className="grid gap-4 list-none p-0 m-0 grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] mt-8">
        {todos.map((todo) => (
          <li
            className="bg-[#475357] p-4 rounded shadow-[0_0_10px_rgba(0,0,0,0.25)]"
            key={todo.id}
          >
            <Todo title={todo.title} id={todo.id} onDelete={onDeleteTodo}>
              <p className="m-0 text-[0.85rem] text-[#dfd9be]">
                {todo.description}
              </p>
            </Todo>
          </li>
        ))}
      </ul>
    </>
  );
}
