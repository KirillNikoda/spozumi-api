import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UserController {
  @Get()
  getTest() {
    return 'hello user';
  }
}
