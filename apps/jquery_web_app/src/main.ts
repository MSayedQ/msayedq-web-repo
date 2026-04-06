import type { ApiHealthResponse, ApiListResponse, Todo, User } from '@repo/shared';
import $ from 'jquery';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

$('#api-url').text(API_BASE);

function renderTodos(todos: Todo[]) {
  const $list = $('#todo-list').empty();
  todos.forEach((todo) => {
    const $row = $('<li/>', { class: 'repo-item' });
    const $cb = $('<input/>', { type: 'checkbox', checked: todo.completed });
    $cb.on('change', () => {
      void $.ajax({
        url: `${API_BASE}/todos/${encodeURIComponent(todo.id)}`,
        method: 'PATCH',
        contentType: 'application/json',
        data: JSON.stringify({ completed: $cb.prop('checked') }),
      }).then((updated: Todo) => {
        todos = todos.map((t) => (t.id === updated.id ? updated : t));
        renderTodos(todos);
      });
    });
    const $label = $('<span/>', { text: todo.title });
    if (todo.completed) {
      $label.css('text-decoration', 'line-through');
    }
    $row.append($cb, $label);
    $list.append($row);
  });
  $('#counter').text(`Count: ${todos.length}`);
}

let todos: Todo[] = [];

function loadTodos() {
  return $.getJSON(`${API_BASE}/todos`).done((res: ApiListResponse<Todo>) => {
    todos = res.data ?? [];
    renderTodos(todos);
  });
}

$('#add-btn').on('click', () => {
  const title = String($('#todo-input').val() ?? '').trim();
  if (!title) return;
  void $.ajax({
    url: `${API_BASE}/todos`,
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({ title }),
  }).done(() => {
    $('#todo-input').val('');
    void loadTodos();
  });
});

$('#todo-input').on('keydown', (e) => {
  if (e.key === 'Enter') $('#add-btn').trigger('click');
});

void (async () => {
  try {
    const [health, users] = await Promise.all([
      $.getJSON(`${API_BASE}/health`) as JQuery.Promise<ApiHealthResponse>,
      $.getJSON(`${API_BASE}/users`) as JQuery.Promise<ApiListResponse<User>>,
    ]);
    $('#api-panel').text(JSON.stringify({ health, users }, null, 2));
    await loadTodos();
  } catch (err) {
    $('#api-panel').text(`API error: ${String(err)}`);
  }
})();
