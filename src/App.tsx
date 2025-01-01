import TodoList from "./components/TodoList.tsx";
import Header from "./components/Header.tsx";
import todosImg from "./assets/todo-list.jpg";
import { useState } from "react";
import NewTodo from "./components/NewTodo.tsx";

export type Todo = {
  title: string;
  description: string;
  id: number;
};

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  function handleAddTodo(todo: string, summary: string) {
    const newTodo: Todo = {
      title: todo,
      description: summary,
      id: Math.random(),
    };

    setTodos((prevTodos) => {
      return [...prevTodos, newTodo];
    });
  }

  function handleDeleteTodo(id: number) {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id != id);
    });
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0f6f8] to-[#e0e1e7] font-poppins">
      <main className="w-[90%] max-w-[40rem] mt-12 mx-auto p-8 bg-[#3a4346] text-[#1b1b1b] rounded-md shadow-[0_0_10px_rgba(0,0,0,0.25)]">
        <Header image={{ src: todosImg, alt: "A list of todos" }}>
          <h1 className="m-0 text-[1.75rem] text-[#f7e596]">TODO LIST</h1>
        </Header>
        <NewTodo onAddTodo={handleAddTodo} />
        <TodoList todos={todos} onDeleteTodo={handleDeleteTodo} />
      </main>
    </div>
  );
}
