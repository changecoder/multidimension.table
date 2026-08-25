import { Controller, Get } from '@nestjs/common';
import type { SuccessResponse } from './types/response';

@Controller()
export class AppController {
  @Get()
  root(): SuccessResponse {
    return { code: 200, message: 'success', data: 'Hello World!' };
  }
}
