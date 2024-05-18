import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../shared/dtos/create-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  getUsers() {
    return this.userRepository.getUsers();
  }

  async create(user: CreateUserDto) {
    return await this.userRepository.create(user);
  }
}
