import type { Todo } from '@repo/shared';
import { createTodo } from '@repo/shared';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    createTodo({ title: 'Learn NestJS' }),
    createTodo({ title: 'Wire monorepo packages', completed: true }),
  ];

  findAll(): Todo[] {
    return this.todos;
  }

  create(title: string): Todo {
    const todo = createTodo({ title });
    this.todos.unshift(todo);
    return todo;
  }

  update(id: string, patch: { completed?: boolean; title?: string }): Todo | undefined {
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) return undefined;
    if (typeof patch.completed === 'boolean') {
      todo.completed = patch.completed;
    }
    if (typeof patch.title === 'string' && patch.title.trim()) {
      todo.title = patch.title.trim();
    }
    return todo;
  }
}
