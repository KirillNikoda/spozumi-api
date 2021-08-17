import {
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
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

  public async findUser(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOne(id);
      if (!user) {
        throw new NotFoundException('User with that id was not found');
      }
      return user;
    } catch (e) {
      throw new InternalServerErrorException('Error while querying user by id');
    }
  }
}
