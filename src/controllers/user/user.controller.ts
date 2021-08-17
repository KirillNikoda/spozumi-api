import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Put
} from '@nestjs/common';
import { UpdateUserDto } from 'src/dtos/updateUser.dto';
import { UserService } from 'src/services/user/user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  public async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  public async getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findUser(id);
  }

  @Delete(':id')
  @HttpCode(204)
  public async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }

  @Put(':id')
  public async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }
}
