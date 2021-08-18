import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/dtos/loginUser.dto';
import { UserService } from '../user/user.service';
import { RegisterUserDto } from 'src/dtos/registerUser.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  public async getMe(token: string): Promise<User> {
    const splittedToken = token.split(' ')[1];
    const decoded = this.jwtService.decode(splittedToken);
    if (!decoded) {
      throw new UnauthorizedException('You are not authorized');
    }

    const user = await this.userService.findUser(decoded.sub);
    console.log(user);

    return user;
  }

  public async register(user: RegisterUserDto) {
    const { email, password } = user;

    const validatedUser = await this.userService.validateUser(email);

    if (validatedUser) {
      throw new BadRequestException('User with that email already exists.');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    user.password = hashedPassword;
    const createdUser = await this.userService.createUser(user);
    return {
      id: createdUser.id,
      email: createdUser.email
    };
  }

  public async login(user: LoginUserDto) {
    const { email, password } = user;

    const validatedUser = await this.userService.validateUser(email);

    if (!validatedUser) {
      throw new NotFoundException('User not found.');
    }

    const isPassEqual = await bcrypt.compare(password, validatedUser.password);

    if (!isPassEqual) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const payload = {
      email: user.email,
      sub: validatedUser.id,
      role: validatedUser.role
    };

    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
