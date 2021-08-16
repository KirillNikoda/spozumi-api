import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth/auth.service';
import { AuthController } from '../controllers/auth/auth.controller';
import { UserModule } from 'src/modules/user.module';
import { JwtModule } from '@nestjs/jwt';
import { configService } from 'src/services/config/config.service';
import { JwtStrategy } from 'src/strategies/jwt.strategy';

@Module({
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  imports: [
    UserModule,
    JwtModule.register({
      secret: configService.getJwtSecret(),
      signOptions: { expiresIn: 60 * 60 + 's' }
    })
  ]
})
export class AuthModule {}
