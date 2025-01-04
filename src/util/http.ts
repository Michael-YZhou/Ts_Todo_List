import { QueryClient } from "@tanstack/react-query";
import {
  Todo,
  FetchTodosSuccessResponse,
  FetchTodosErrorResponse,
  FetchError,
  CreateTodoData,
  PatchTodoData,
  CreateTodoSuccessResponse,
} from "../types";

/**
 * Create and export a new instance of QueryClient here to use in other components.
 * e.g. invalidate cached data
 */
export const queryClient = new QueryClient();

/**
 * Fetch all todos from the server
 * @returns an array of todos
 */
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
  const { todos }: FetchTodosSuccessResponse = await response.json();
  return todos;
}

/**
 * Fetch a single todo from the server
 * @param id id of the todo to fetch
 * @param signal AbortSignal to cancel the request when needed (e.g. component unmount)
 * @returns
 */
export async function fetchTodo({
  id,
  signal,
}: {
  id: number;
  signal: AbortSignal;
}): Promise<Todo> {
  const response = await fetch(`http://localhost:3000/todos/${id}`, { signal });

  if (!response.ok) {
    // Read the error response in typed form
    const errorData: FetchTodosErrorResponse = await response.json();

    // Create a custom error object
    const error: FetchError<FetchTodosErrorResponse> = new Error(
      "An error occurred while fetching the task"
    ) as FetchError<FetchTodosErrorResponse>;

    error.code = response.status;
    error.info = errorData; // Strictly typed error info

    throw error;
  }

  // Success response
  // Expect the shape: { "todo": { ... } }
  const { todo }: CreateTodoSuccessResponse = await response.json();
  return todo;
}

/**
 * Create a new todo on the server
 * @param todoData the todo data to create
 * @returns the created todo
 */
export async function createNewTodo(todoData: CreateTodoData): Promise<Todo> {
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
  const { todo }: CreateTodoSuccessResponse = await response.json();
  return todo;
}

/**
 * Delete a todo from the server
 * @param id id of the todo to delete
 * @returns the deleted todo
 */
export async function deleteTodo({ id }: { id: number }): Promise<Todo> {
  const response = await fetch(`http://localhost:3000/todos/${id}`, {
    method: "DELETE",
  });

  // Handle error responses
  if (!response.ok) {
    const errorBody: { error: string; details?: string } =
      await response.json();

    const error: FetchError<{ error: string; details?: string }> = new Error(
      "An error occurred while deleting the task"
    ) as FetchError<{ error: string; details?: string }>;
    error.code = response.status;
    error.info = errorBody;

    throw error;
  }

  // Parse and return the deleted todo
  return response.json();
}

/**
 * Update a todo on the server
 * @param id id of the todo to update
 * @param todoData the updated todo data
 * @returns the updated todo
 */
export async function updateTodo({
  id,
  patchTodoData,
}: {
  id: number;
  patchTodoData: PatchTodoData;
}): Promise<Todo> {
  const response = await fetch(`http://localhost:3000/todos/${id}`, {
    method: "PATCH",
    body: JSON.stringify(patchTodoData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Handle error responses
  if (!response.ok) {
    const errorBody: { error: string; details?: string } =
      await response.json();

    const error: FetchError<{ error: string; details?: string }> = new Error(
      "An error occurred while deleting the task"
    ) as FetchError<{ error: string; details?: string }>;
    error.code = response.status;
    error.info = errorBody;

    throw error;
  }

  return response.json();
}
