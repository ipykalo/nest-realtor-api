import {
  ConflictException,
  HttpException,
  Injectable,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDto } from '../shared/dtos/create-user.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SigninResponseDto } from './dto/signin-response.dto';
import { TokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<SigninResponseDto> {
    const user = await this.userService.getByEmail(email);

    if (!user) {
      throw new HttpException(`Invalid credentials.`, HttpStatus.BAD_REQUEST);
    }

    const isPasswordMatches = await bcrypt.compare(password, user.password);

    if (!isPasswordMatches) {
      throw new HttpException(`Invalid credentials.`, HttpStatus.BAD_REQUEST);
    }

    const access_token = await this.generateJwtToken({
      sub: user.id,
      username: user.name,
    });

    return {
      access_token,
    };
  }

  async signUp(userDto: CreateUserDto): Promise<SigninResponseDto> {
    const existingUser = await this.userService.getByEmail(userDto.email);

    if (existingUser) {
      throw new ConflictException(
        `User with the email: ${userDto.email} already exists.`,
      );
    }
    const hashPassword = await this.hashPasword(userDto.password);

    const user = await this.userService.create({
      ...userDto,
      password: hashPassword,
    });

    const access_token = await this.generateJwtToken({
      sub: user.id,
      username: user.name,
    });

    return {
      access_token,
    };
  }

  private async hashPasword(password: string): Promise<string> {
    const saltOrRounds = 10;

    return await bcrypt.hash(password, saltOrRounds);
  }

  private async generateJwtToken(payload: TokenPayload): Promise<string> {
    const token = await this.jwtService.signAsync(payload);

    return `Bearer ${token}`;
  }
}
