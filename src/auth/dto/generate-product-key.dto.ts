import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { UserType } from 'src/shared';

export class GenerateProductKeyDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(UserType)
  @IsNotEmpty()
  userType: UserType;
}
