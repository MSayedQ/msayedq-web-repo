'use client';

import type { ApiHealthResponse, ApiListResponse, Todo, User } from '@repo/shared';
import { useCallback, useEffect, useMemo, useState } from 'react';

const apiBase = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

async function fetchJson<T>(input: string, init?: RequestInit): Promise<T> {
  const res = await fetch(input, init);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()) as T;
}

export function TodoClient() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [snapshot, setSnapshot] = useState<string>('Loading…');

  const load = useCallback(async () => {
    const res = await fetchJson<ApiListResponse<Todo>>(`${apiBase}/todos`);
    setTodos(res.data ?? []);
  }, []);

  useEffect(() => {
    void (async () => {
      try {
        const [health, users] = await Promise.all([
          fetchJson<ApiHealthResponse>(`${apiBase}/health`),
          fetchJson<ApiListResponse<User>>(`${apiBase}/users`),
        ]);
        setSnapshot(JSON.stringify({ health, users }, null, 2));
        await load();
      } catch (e) {
        setSnapshot(`API error: ${String(e)}`);
      }
    })();
  }, [load]);

  const count = useMemo(() => todos.length, [todos]);

  async function addTodo() {
    const t = title.trim();
    if (!t) return;
    await fetch(`${apiBase}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: t }),
    });
    setTitle('');
    await load();
  }

  async function toggle(id: string, completed: boolean) {
    const updated = await fetchJson<Todo>(`${apiBase}/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed }),
    });
    setTodos((prev) => prev.map((x) => (x.id === id ? updated : x)));
  }

  return (
    <div className="repo-app">
      <div className="repo-container">
        <header className="repo-card">
          <h1 className="repo-title">Next.js (App Router)</h1>
          <p className="repo-subtitle">
            Client fetch + SSR shell · API: <code>{apiBase}</code>
          </p>
          <div className="repo-row">
            <input
              className="repo-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add todo"
              onKeyDown={(e) => e.key === 'Enter' && void addTodo()}
            />
            <button className="repo-btn repo-btn--primary" type="button" onClick={() => void addTodo()}>
              Add
            </button>
          </div>
          <p className="repo-badge">Count: {count}</p>
          <ul className="repo-list">
            {todos.map((todo) => (
              <li key={todo.id} className="repo-item">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={(e) => void toggle(todo.id, e.target.checked)}
                />
                <span style={{ textDecoration: todo.completed ? 'line-through' : undefined }}>{todo.title}</span>
              </li>
            ))}
          </ul>
          <pre className="repo-kv">{snapshot}</pre>
        </header>
      </div>
    </div>
  );
}
