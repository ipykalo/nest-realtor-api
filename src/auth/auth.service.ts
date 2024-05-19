import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../shared/dtos/create-user.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

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
    const hashPassword = await this.hashPasword(userDto.password);

    return this.userService.create({
      ...userDto,
      password: hashPassword,
    });
  }

  private async hashPasword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }
}
