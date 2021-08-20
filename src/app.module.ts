import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth.module';
import { ProductsModule } from './modules/products/products.module';
import { UserModule } from './modules/user.module';

@Module({
  imports: [AuthModule, UserModule, ProductsModule, TypeOrmModule.forRoot()]
})
export class AppModule {}
