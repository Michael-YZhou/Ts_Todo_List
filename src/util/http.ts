// fetchTodos.ts
import {
  Todo,
  FetchTodosSuccessResponse,
  FetchTodosErrorResponse,
  FetchError,
} from "../types";

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
