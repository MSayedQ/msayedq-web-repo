import type { ApiListResponse, Todo } from '@repo/shared';
import { createTodo } from '@repo/shared';
import { NextResponse } from 'next/server';

const todos: Todo[] = [
  createTodo({ title: 'Next.js API route' }),
  createTodo({ title: 'Proxy pattern', completed: true }),
];

export async function GET() {
  const body: ApiListResponse<Todo> = { data: todos };
  return NextResponse.json(body);
}

export async function POST(req: Request) {
  const json = (await req.json()) as { title?: string };
  const title = String(json?.title ?? '').trim();
  if (!title) {
    return NextResponse.json({ error: 'title is required' }, { status: 400 });
  }
  const todo = createTodo({ title });
  todos.unshift(todo);
  return NextResponse.json(todo, { status: 201 });
}
