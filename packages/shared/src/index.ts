export type TodoId = string;

export interface Todo {
  id: TodoId;
  title: string;
  completed: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface ApiListResponse<T> {
  data: T[];
}

export interface ApiHealthResponse {
  status: 'ok';
  service: string;
  timestamp: string;
}

const newId = (): string => `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

export const createTodo = (partial: Pick<Todo, 'title'> & Partial<Omit<Todo, 'title'>>): Todo => ({
  id: partial.id ?? newId(),
  title: partial.title,
  completed: partial.completed ?? false,
});
