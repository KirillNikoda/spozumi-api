import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from 'src/dtos/registerUser.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async validateUser(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ email });
    return user;
  }

  async createUser(user: RegisterUserDto) {
    try {
      return await this.userRepository.save(user);
    } catch (e) {}
  }
}
