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

  public async validateUser(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ email });
    return user;
  }

  public async createUser(user: RegisterUserDto): Promise<Partial<User>> {
    try {
      return await this.userRepository.save(user);
    } catch (e) {}
  }

  public async findUser(id: number) {
    try {
      const user = await this.userRepository.findOne(id, {
        select: ['id', 'email']
      });
      if (!user) {
        return new NotFoundException('User does not exist').getResponse();
      }
      console.log(user);

      return user;
    } catch (e) {
      throw new InternalServerErrorException('Error while querying user by id');
    }
  }
}
