import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { CreateUserDto } from '../shared/dtos/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  async signUp(userDto: CreateUserDto) {
    const user = await this.authRepository.findUserByEmail(userDto.email);

    if (user) {
      throw new ConflictException(
        `User with the email: ${userDto.email} already exists.`,
      );
    }
    return this.authRepository.signUp(userDto);
  }
}
