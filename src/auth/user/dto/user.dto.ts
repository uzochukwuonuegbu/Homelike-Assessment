import { IsString, IsUUID, IsEmail, IsOptional, MinLength } from 'class-validator';

export class UserDto {
  @IsString()
  @IsUUID()
  id: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsOptional()
  @MinLength(6)
  password?: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
