import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { LoginUserDto } from 'src/dtos/loginUser.dto';
import { RegisterUserDto } from 'src/dtos/registerUser.dto';
import { AuthService } from 'src/services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  public async register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('me')
  public async getMe(@Headers('authorization') token: string) {
    return this.authService.getMe(token);
  }
}
