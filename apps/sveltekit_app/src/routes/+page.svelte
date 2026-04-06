<script lang="ts">
  import type { ApiHealthResponse, ApiListResponse, Todo, User } from '@repo/shared';
  import { onMount } from 'svelte';

  const apiBase = import.meta.env.PUBLIC_API_URL ?? 'http://localhost:3000';

  let todos: Todo[] = $state([]);
  let title = $state('');
  let snapshot = $state('Loading…');

  async function fetchJson<T>(input: string, init?: RequestInit): Promise<T> {
    const res = await fetch(input, init);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as T;
  }

  async function loadTodos() {
    const res = await fetchJson<ApiListResponse<Todo>>(`${apiBase}/todos`);
    todos = res.data ?? [];
  }

  onMount(async () => {
    try {
      const [health, users] = await Promise.all([
        fetchJson<ApiHealthResponse>(`${apiBase}/health`),
        fetchJson<ApiListResponse<User>>(`${apiBase}/users`),
      ]);
      snapshot = JSON.stringify({ health, users }, null, 2);
      await loadTodos();
    } catch (e) {
      snapshot = `API error: ${String(e)}`;
    }
  });

  let count = $derived(todos.length);

  async function addTodo() {
    const t = title.trim();
    if (!t) return;
    await fetch(`${apiBase}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: t }),
    });
    title = '';
    await loadTodos();
  }

  async function toggle(todo: Todo, completed: boolean) {
    const updated = await fetchJson<Todo>(`${apiBase}/todos/${todo.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed }),
    });
    todos = todos.map((x) => (x.id === updated.id ? updated : x));
  }
</script>

<svelte:head>
  <title>SvelteKit</title>
</svelte:head>

<div class="repo-app">
  <div class="repo-container">
    <header class="repo-card">
      <h1 class="repo-title">SvelteKit</h1>
      <p class="repo-subtitle">
        Routing + SSR shell · API: <code>{apiBase}</code>
      </p>
      <div class="repo-row">
        <input class="repo-input" bind:value={title} placeholder="Add todo" onkeydown={(e) => e.key === 'Enter' && addTodo()} />
        <button class="repo-btn repo-btn--primary" type="button" onclick={() => addTodo()}>Add</button>
      </div>
      <p class="repo-badge">Count: {count}</p>
      <ul class="repo-list">
        {#each todos as todo (todo.id)}
          <li class="repo-item">
            <input
              type="checkbox"
              checked={todo.completed}
              onchange={(e) => toggle(todo, (e.currentTarget as HTMLInputElement).checked)}
            />
            <span style={`text-decoration:${todo.completed ? 'line-through' : 'none'}`}>{todo.title}</span>
          </li>
        {/each}
      </ul>
      <pre class="repo-kv">{snapshot}</pre>
    </header>
  </div>
</div>
