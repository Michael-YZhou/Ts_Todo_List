import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/http.ts";
import TodoList from "./components/TodoList.tsx";
import Header from "./components/Header.tsx";
import todosImg from "./assets/todo-list.jpg";
import NewTodo from "./components/NewTodo.tsx";

export default function App() {
  return (
    // Wrap the entire app with QueryClientProvider
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen pt-12 bg-gradient-to-b from-[#f0f6f8] to-[#e0e1e7] font-poppins">
        <main className="w-[90%] max-w-[40rem] mx-auto p-8 bg-[#3a4346] text-[#1b1b1b] rounded-md shadow-[0_0_10px_rgba(0,0,0,0.25)]">
          <Header image={{ src: todosImg, alt: "A list of todos" }}>
            <h1 className="m-0 text-[1.75rem] text-[#f7e596]">TODO LIST</h1>
          </Header>
          <NewTodo />
          <TodoList />
        </main>
      </div>
    </QueryClientProvider>
  );
}
