import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');
const counter = document.getElementById('counter');
const apiPanel = document.getElementById('api-panel');
const apiUrl = document.getElementById('api-url');

apiUrl.textContent = API_BASE;

/** @type {{ id: string; title: string; completed: boolean }[]} */
let todos = [];

function render() {
  list.innerHTML = '';
  todos.forEach((todo) => {
    const li = document.createElement('li');
    li.className =
      'list-group-item d-flex align-items-center gap-2 justify-content-between';
    const left = document.createElement('div');
    left.className = 'form-check m-0';
    const cb = document.createElement('input');
    cb.className = 'form-check-input';
    cb.type = 'checkbox';
    cb.checked = todo.completed;
    cb.addEventListener('change', () => void toggleTodo(todo.id, cb.checked));
    const label = document.createElement('label');
    label.className = 'form-check-label';
    label.textContent = todo.title;
    if (todo.completed) label.classList.add('text-decoration-line-through', 'text-secondary');
    left.append(cb, label);
    li.appendChild(left);
    list.appendChild(li);
  });
  counter.textContent = `Count: ${todos.length}`;
}

async function loadTodos() {
  const res = await fetch(`${API_BASE}/todos`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  todos = json.data ?? [];
  render();
}

async function toggleTodo(id, completed) {
  const res = await fetch(`${API_BASE}/todos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const updated = await res.json();
  todos = todos.map((t) => (t.id === id ? updated : t));
  render();
}

async function addTodo() {
  const title = /** @type {HTMLInputElement} */ (input).value.trim();
  if (!title) return;
  const res = await fetch(`${API_BASE}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  /** @type {HTMLInputElement} */ (input).value = '';
  await loadTodos();
}

addBtn.addEventListener('click', () => void addTodo());
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') void addTodo();
});

void (async () => {
  try {
    const [health, users] = await Promise.all([
      fetch(`${API_BASE}/health`).then((r) => r.json()),
      fetch(`${API_BASE}/users`).then((r) => r.json()),
    ]);
    apiPanel.textContent = JSON.stringify({ health, users }, null, 2);
    await loadTodos();
  } catch (err) {
    apiPanel.textContent = `API error (is Express running?)\n\n${String(err)}`;
  }
})();
