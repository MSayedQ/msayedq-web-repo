<script lang="ts">
  import type { ApiHealthResponse, ApiListResponse, Todo, User } from '@repo/shared';
  import { onMount } from 'svelte';
  import { get, writable, type Writable } from 'svelte/store';

  const apiBase = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

  const todos: Writable<Todo[]> = writable([]);
  const title = writable('');
  const snapshot = writable('Loading…');

  async function fetchJson<T>(input: string, init?: RequestInit): Promise<T> {
    const res = await fetch(input, init);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as T;
  }

  async function loadTodos() {
    const res = await fetchJson<ApiListResponse<Todo>>(`${apiBase}/todos`);
    todos.set(res.data ?? []);
  }

  onMount(async () => {
    try {
      const [health, users] = await Promise.all([
        fetchJson<ApiHealthResponse>(`${apiBase}/health`),
        fetchJson<ApiListResponse<User>>(`${apiBase}/users`),
      ]);
      snapshot.set(JSON.stringify({ health, users }, null, 2));
      await loadTodos();
    } catch (e) {
      snapshot.set(`API error: ${String(e)}`);
    }
  });

  async function addTodo() {
    const t = get(title).trim();
    if (!t) return;
    await fetch(`${apiBase}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: t }),
    });
    title.set('');
    await loadTodos();
  }

  async function toggle(todo: Todo, completed: boolean) {
    const updated = await fetchJson<Todo>(`${apiBase}/todos/${todo.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed }),
    });
    todos.update((list) => list.map((x) => (x.id === updated.id ? updated : x)));
  }

  $: count = $todos.length;
</script>

<div class="repo-app">
  <div class="repo-container">
    <header class="repo-card">
      <h1 class="repo-title">Svelte + Vite</h1>
      <p class="repo-subtitle">
        Store + component · API: <code>{apiBase}</code>
      </p>
      <div class="repo-row">
        <input
          class="repo-input"
          bind:value={$title}
          placeholder="Add todo"
          on:keydown={(e) => e.key === 'Enter' && addTodo()}
        />
        <button class="repo-btn repo-btn--primary" type="button" on:click={() => addTodo()}>Add</button>
      </div>
      <p class="repo-badge">Count: {count}</p>
      <ul class="repo-list">
        {#each $todos as todo (todo.id)}
          <li class="repo-item">
            <input
              type="checkbox"
              checked={todo.completed}
              on:change={(e) => toggle(todo, (e.currentTarget as HTMLInputElement).checked)}
            />
            <span style={`text-decoration:${todo.completed ? 'line-through' : 'none'}`}>{todo.title}</span>
          </li>
        {/each}
      </ul>
      <pre class="repo-kv">{$snapshot}</pre>
    </header>
  </div>
</div>
