import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth.module';
import { UserModule } from './modules/user.module';
import { configService } from './services/config/config.service';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig())
  ]
})
export class AppModule {}
