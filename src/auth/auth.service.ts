import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../shared/dtos/create-user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signUp(userDto: CreateUserDto) {
    const user = await this.userService.getByEmail(userDto.email);

    if (user) {
      throw new ConflictException(
        `User with the email: ${userDto.email} already exists.`,
      );
    }
    return this.userService.create(userDto);
  }
}
