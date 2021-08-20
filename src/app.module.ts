import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth.module';
import { BrandsModule } from './modules/brands/brands.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ProductsModule } from './modules/products/products.module';
import { UserModule } from './modules/user.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ProductsModule,
    CategoriesModule,
    BrandsModule,
    TypeOrmModule.forRoot()
  ]
})
export class AppModule {}
