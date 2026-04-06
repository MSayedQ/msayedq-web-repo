import { Module } from '@nestjs/common';
import { HealthController } from './health/health.controller.js';
import { TodoModule } from './todo/todo.module.js';
import { UserModule } from './user/user.module.js';

@Module({
  imports: [TodoModule, UserModule],
  controllers: [HealthController],
})
export class AppModule {}
