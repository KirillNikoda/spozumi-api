import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  public async getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findUser(id);
  }
}
