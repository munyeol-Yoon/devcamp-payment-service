import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { Role } from '../entities/user.entity';

export class UserResDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,30}$/)
  password: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^010-\d{4}-\d{4}$/)
  phone: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  role?: Role;
}
