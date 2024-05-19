import { UserType } from '../enums/user-type.enum';

import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\+380\d{9}$/, {
    message: 'phone number must be a valid phone (/^+380d{9}$/)',
  })
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  password: string;

  @IsEnum(UserType)
  @IsNotEmpty()
  userType: UserType;

  @ValidateIf((dto) => dto.userType !== UserType.BUYER)
  @IsString()
  @IsNotEmpty()
  productKey?: string;
}
