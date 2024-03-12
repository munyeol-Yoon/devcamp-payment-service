import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class LoginReqDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,30}$/)
  password: string;
}
