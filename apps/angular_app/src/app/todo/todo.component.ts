import type { ApiHealthResponse, ApiListResponse, Todo, User } from '@repo/shared';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { environment } from '../../environments/environment';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="repo-app">
      <div class="repo-container">
        <header class="repo-card">
          <h1 class="repo-title">Angular</h1>
          <p class="repo-subtitle">
            Service + routing · API: <code>{{ apiUrl }}</code>
          </p>
          <div class="repo-row">
            <input
              class="repo-input"
              [(ngModel)]="title"
              (keydown.enter)="add()"
              placeholder="Add todo"
            />
            <button class="repo-btn repo-btn--primary" type="button" (click)="add()">Add</button>
          </div>
          <p class="repo-badge">Count: {{ todos().length }}</p>
          <ul class="repo-list">
            @for (todo of todos(); track todo.id) {
              <li class="repo-item">
                <input
                  type="checkbox"
                  [checked]="todo.completed"
                  (change)="onToggle(todo, $event)"
                />
                <span [style.text-decoration]="todo.completed ? 'line-through' : 'none'">{{
                  todo.title
                }}</span>
              </li>
            }
          </ul>
          <pre class="repo-kv">{{ snapshot() }}</pre>
        </header>
      </div>
    </div>
  `,
})
export class TodoComponent implements OnInit {
  private readonly api = inject(TodoService);

  readonly apiUrl = environment.apiUrl;
  todos = signal<Todo[]>([]);
  snapshot = signal('Loading…');
  title = '';

  ngOnInit(): void {
    forkJoin({
      health: this.api.health(),
      users: this.api.users(),
    }).subscribe({
      next: (res: { health: ApiHealthResponse; users: ApiListResponse<User> }) => {
        this.snapshot.set(JSON.stringify(res, null, 2));
        this.refresh();
      },
      error: (err: unknown) => this.snapshot.set(`API error: ${String(err)}`),
    });
  }

  refresh(): void {
    this.api.todos().subscribe((r) => this.todos.set(r.data ?? []));
  }

  add(): void {
    const t = this.title.trim();
    if (!t) return;
    this.api.addTodo(t).subscribe(() => {
      this.title = '';
      this.refresh();
    });
  }

  onToggle(todo: Todo, event: Event): void {
    const target = event.target as HTMLInputElement;
    this.api.patchTodo(todo.id, { completed: target.checked }).subscribe((updated) => {
      this.todos.update((list) => list.map((x) => (x.id === updated.id ? updated : x)));
    });
  }
}
