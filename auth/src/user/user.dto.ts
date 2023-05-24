import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsEmail()
  @IsNotEmpty()
  @Expose()
  email: string;

  @IsNotEmpty()
  password: string;
}
