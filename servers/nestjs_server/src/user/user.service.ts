import type { User } from '@repo/shared';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private users: User[] = [
    { id: 'u1', name: 'Ada Lovelace', email: 'ada@example.com' },
    { id: 'u2', name: 'Grace Hopper', email: 'grace@example.com' },
  ];

  findAll(): User[] {
    return this.users;
  }
}
