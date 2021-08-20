import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  email: string;

  @MinLength(4)
  @MaxLength(40)
  password: string;
}
