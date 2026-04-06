import type { ApiHealthResponse } from '@repo/shared';
import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  health(): ApiHealthResponse {
    return {
      status: 'ok',
      service: 'nestjs',
      timestamp: new Date().toISOString(),
    };
  }
}
