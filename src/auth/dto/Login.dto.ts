import { IsEmail, IsString, MinLength } from 'class-validator';

export default class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
