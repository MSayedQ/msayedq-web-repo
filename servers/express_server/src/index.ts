import type { ApiHealthResponse, ApiListResponse, Todo, User } from '@repo/shared';
import { createTodo } from '@repo/shared';
import cors from 'cors';
import express from 'express';

const PORT = Number(process.env.PORT ?? 3000);

const todos: Todo[] = [
  createTodo({ title: 'Learn Express' }),
  createTodo({ title: 'Compare frameworks', completed: true }),
];

const users: User[] = [
  { id: 'u1', name: 'Ada Lovelace', email: 'ada@example.com' },
  { id: 'u2', name: 'Grace Hopper', email: 'grace@example.com' },
];

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  const body: ApiHealthResponse = {
    status: 'ok',
    service: 'express',
    timestamp: new Date().toISOString(),
  };
  res.json(body);
});

app.get('/todos', (_req, res) => {
  const body: ApiListResponse<Todo> = { data: todos };
  res.json(body);
});

app.post('/todos', (req, res) => {
  const title = String(req.body?.title ?? '').trim();
  if (!title) {
    res.status(400).json({ error: 'title is required' });
    return;
  }
  const todo = createTodo({ title });
  todos.unshift(todo);
  res.status(201).json(todo);
});

app.patch('/todos/:id', (req, res) => {
  const { id } = req.params;
  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    res.status(404).json({ error: 'not found' });
    return;
  }
  if (typeof req.body?.completed === 'boolean') {
    todo.completed = req.body.completed;
  }
  if (typeof req.body?.title === 'string' && req.body.title.trim()) {
    todo.title = req.body.title.trim();
  }
  res.json(todo);
});

app.get('/users', (_req, res) => {
  const body: ApiListResponse<User> = { data: users };
  res.json(body);
});

app.listen(PORT, () => {
  console.log(`Express API listening on http://localhost:${PORT}`);
});
