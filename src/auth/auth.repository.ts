import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from '../shared/dtos/create-user.dto';

@Injectable()
export class AuthRepository {
  constructor(private userService: UserService) {}

  signUp(user: CreateUserDto) {
    return this.userService.create(user);
  }

  findUserByEmail(email: string) {
    return this.userService.getByEmail(email);
  }
}
