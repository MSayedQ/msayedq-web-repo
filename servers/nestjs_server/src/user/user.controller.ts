import type { ApiListResponse, User } from '@repo/shared';
import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly users: UserService) {}

  @Get()
  list(): ApiListResponse<User> {
    return { data: this.users.findAll() };
  }
}
