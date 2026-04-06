import type { ApiListResponse, Todo } from '@repo/shared';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todos: TodoService) {}

  @Get()
  list(): ApiListResponse<Todo> {
    return { data: this.todos.findAll() };
  }

  @Post()
  create(@Body() body: { title?: string }): Todo {
    const title = String(body?.title ?? '').trim();
    if (!title) {
      throw new BadRequestException('title is required');
    }
    return this.todos.create(title);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: { completed?: boolean; title?: string }
  ): Todo {
    const updated = this.todos.update(id, body);
    if (!updated) {
      throw new NotFoundException('not found');
    }
    return updated;
  }
}
