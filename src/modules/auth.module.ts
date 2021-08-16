import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth/auth.service';
import { AuthController } from '../controllers/auth/auth.controller';
import { UserModule } from 'src/modules/user.module';

@Module({
    providers: [AuthService],
    controllers: [AuthController],
    imports: [UserModule]
})
export class AuthModule {}
