import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SigninRequestDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  password: string;
}
