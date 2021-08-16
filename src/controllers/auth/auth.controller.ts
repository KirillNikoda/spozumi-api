import { Body, Controller, Post } from '@nestjs/common';
import { UserLoginDto } from 'src/dtos/userLogin.dto';
import { UserRegisterDto } from 'src/dtos/userRegister.dto';
import { AuthService } from 'src/services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() userRegisterDto: UserRegisterDto) {
    return this.authService.register(userRegisterDto);
  }

  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto) {
    return this.authService.login(userLoginDto);
  }
}
