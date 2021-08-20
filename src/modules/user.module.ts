import { Module } from '@nestjs/common';
import { UserService } from '../services/user/user.service';
import { UserController } from '../controllers/user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';

@Module({
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
