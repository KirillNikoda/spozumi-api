import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRegisterDto } from 'src/dtos/userRegister.dto';
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

  async createUser(user: UserRegisterDto) {
    try {
      return await this.userRepository.save(user);
    } catch (e) {}
  }
}
