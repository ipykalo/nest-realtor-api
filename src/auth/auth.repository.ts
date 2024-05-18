import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class AuthRepository {
  constructor(private userService: UserService) {}

  signUp(user: CreateUserDto) {
    return this.userService.create(user);
  }
}
