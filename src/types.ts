/**
 * Shape of a single Todo item.
 */
export interface Todo {
  id: number;
  title: string;
  summary: string;
  completed: boolean;
}

/**
 * Shape of a successful JSON response from the server.
 * Example: { "todos": Todo[] }
 */
export interface FetchTodosSuccessResponse {
  todos: Todo[];
}

/**
 * Shape of an error response. Adjust fields based on your server's response.
 * Example: { "error": string; "details": string; }
 */
export interface FetchTodosErrorResponse {
  error: string;
  details?: string;
}

/**
 * Custom error type that includes an HTTP status code
 * and a typed `info` property for additional error details.
 */
export interface FetchError<T> extends Error {
  code?: number;
  info?: T;
}

/**
 * The properties needed to create a new todo and send in POST request
 */
export interface CreateTodoData {
  title: string;
  summary: string;
}

/**
 * The properties needed to update a todo and send in PATCH request
 */
export interface PatchTodoData {
  title: string;
  summary: string;
  completed: boolean;
}

/**
 * The shape of a success response returned by the server.
 */
export interface CreateTodoSuccessResponse {
  todo: Todo;
}
