<script setup lang="ts">
import type { ApiHealthResponse, ApiListResponse, Todo, User } from '@repo/shared';

const config = useRuntimeConfig();
const apiBase = computed(() => String(config.public.apiUrl));

const todos = ref<Todo[]>([]);
const title = ref('');
const snapshot = ref('Loading…');

async function fetchJson<T>(input: string, init?: RequestInit): Promise<T> {
  const res = await fetch(input, init);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()) as T;
}

async function loadTodos() {
  const res = await fetchJson<ApiListResponse<Todo>>(`${apiBase.value}/todos`);
  todos.value = res.data ?? [];
}

onMounted(async () => {
  try {
    const [health, users] = await Promise.all([
      fetchJson<ApiHealthResponse>(`${apiBase.value}/health`),
      fetchJson<ApiListResponse<User>>(`${apiBase.value}/users`),
    ]);
    snapshot.value = JSON.stringify({ health, users }, null, 2);
    await loadTodos();
  } catch (e) {
    snapshot.value = `API error: ${String(e)}`;
  }
});

const count = computed(() => todos.value.length);

async function addTodo() {
  const t = title.value.trim();
  if (!t) return;
  await fetch(`${apiBase.value}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: t }),
  });
  title.value = '';
  await loadTodos();
}

async function toggle(todo: Todo, completed: boolean) {
  const updated = await fetchJson<Todo>(`${apiBase.value}/todos/${todo.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed }),
  });
  todos.value = todos.value.map((x) => (x.id === updated.id ? updated : x));
}
</script>

<template>
  <div class="repo-app">
    <div class="repo-container">
      <header class="repo-card">
        <h1 class="repo-title">Nuxt 3</h1>
        <p class="repo-subtitle">
          SSR + pages · API: <code>{{ apiBase }}</code>
        </p>
        <div class="repo-row">
          <input
            v-model="title"
            class="repo-input"
            placeholder="Add todo"
            @keydown.enter="addTodo"
          />
          <button class="repo-btn repo-btn--primary" type="button" @click="addTodo">Add</button>
        </div>
        <p class="repo-badge">Count: {{ count }}</p>
        <ul class="repo-list">
          <li v-for="todo in todos" :key="todo.id" class="repo-item">
            <input
              type="checkbox"
              :checked="todo.completed"
              @change="toggle(todo, ($event.target as HTMLInputElement).checked)"
            />
            <span :style="{ textDecoration: todo.completed ? 'line-through' : undefined }">{{
              todo.title
            }}</span>
          </li>
        </ul>
        <pre class="repo-kv">{{ snapshot }}</pre>
      </header>
    </div>
  </div>
</template>
