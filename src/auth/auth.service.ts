import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { CreateUserDto } from '../shared/dtos/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  signUp(user: CreateUserDto) {
    return this.authRepository.signUp(user);
  }
}
