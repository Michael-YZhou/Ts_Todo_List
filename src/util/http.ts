import { QueryClient } from "@tanstack/react-query";

// Create a new instance of QueryClient to use in other components
export const queryClient = new QueryClient();

// fetchTodos.ts
import {
  Todo,
  FetchTodosSuccessResponse,
  FetchTodosErrorResponse,
  FetchError,
  CreateTodoRequest,
  CreateTodoSuccessResponse,
} from "../types";

// Fetch all todos from the server
export async function fetchTodos(): Promise<Todo[]> {
  const response = await fetch("http://localhost:3000/todos");

  if (!response.ok) {
    // Read the error response in typed form
    const errorData: FetchTodosErrorResponse = await response.json();

    // Create a custom error object
    const error: FetchError<FetchTodosErrorResponse> = new Error(
      "An error occurred while fetching the tasks"
    ) as FetchError<FetchTodosErrorResponse>;

    error.code = response.status;
    error.info = errorData; // Strictly typed error info

    throw error;
  }

  // We expect the JSON body to match FetchTodosSuccessResponse
  const data: FetchTodosSuccessResponse = await response.json();
  return data.todos;
}

// Create a new todo on the server
export async function createNewTodo(
  todoData: CreateTodoRequest
): Promise<Todo> {
  const response = await fetch("http://localhost:3000/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todoData),
  });

  // If the response is not OK, throw a typed error
  if (!response.ok) {
    const errorBody: FetchTodosErrorResponse = await response.json();

    // Create our custom typed error
    const error: FetchError<FetchTodosErrorResponse> = new Error(
      "An error occurred while creating the task"
    ) as FetchError<FetchTodosErrorResponse>;
    error.code = response.status;
    error.info = errorBody; // Strictly typed error info

    throw error;
  }

  // Success response
  // Expect the shape: { "todo": { ... } }
  const data: CreateTodoSuccessResponse = await response.json();
  return data.todo;
}
