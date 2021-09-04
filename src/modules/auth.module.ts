import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth/auth.service';
import { AuthController } from '../controllers/auth/auth.controller';
import { UserModule } from 'src/modules/user.module';
import { JwtModule } from '@nestjs/jwt';
import { configService } from 'src/services/config/config.service';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { CategoriesModule } from './categories/categories.module';
import { BrandsModule } from './brands/brands.module';
import { OrderModule } from './order/order.module';

@Module({
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  imports: [
    UserModule,
    JwtModule.register({
      secret: configService.getJwtSecret(),
      signOptions: { expiresIn: 60 * 60 + 's' }
    }),
    CategoriesModule,
    BrandsModule,
    OrderModule
  ]
})
export class AuthModule {}
