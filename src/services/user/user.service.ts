import {
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from 'src/dtos/registerUser.dto';
import { UpdateUserDto } from 'src/dtos/updateUser.dto';
import { User } from 'src/entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  public async validateUser(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ email });
    return user;
  }

  public async getAllUsers(): Promise<Partial<User>[]> {
    try {
      return await this.userRepository.find({ select: ['id', 'email'] });
    } catch (e) {
      throw new InternalServerErrorException('Error while querying all users');
    }
  }

  public async deleteUser(id: number): Promise<DeleteResult> {
    try {
      return await this.userRepository.delete(id);
    } catch (e) {
      throw new InternalServerErrorException(
        'Error while deleting a user by id'
      );
    }
  }

  public async updateUser(id: number, updateUserDto: UpdateUserDto) {
    try {
      if (!updateUserDto.password) {
        delete updateUserDto.password;
        return await this.userRepository.update(id, updateUserDto);
      }

      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
      return await this.userRepository.update(id, updateUserDto);
    } catch (e) {
      throw new InternalServerErrorException('Error while updating a user');
    }
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
      throw new InternalServerErrorException(
        'Error while querying a user by id'
      );
    }
  }
}
