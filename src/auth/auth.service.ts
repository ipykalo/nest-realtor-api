import {
  ConflictException,
  HttpException,
  Injectable,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../shared/dtos/create-user.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SigninResponseDto } from './dtos/signin-response.dto';
import { TokenPayload } from './interfaces/token-payload.interface';
import { UserType } from 'src/shared';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
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

  async signUp(dto: CreateUserDto): Promise<SigninResponseDto> {
    const existingUser = await this.userService.getByEmail(dto.email);

    if (dto.userType !== UserType.BUYER) {
      if (!dto.productKey) {
        throw new UnauthorizedException();
      }

      const validProductKey = this.getProductKey(dto.email, dto.userType);

      const isProductKeyMatches = await bcrypt.compare(
        validProductKey,
        dto.productKey,
      );

      if (!isProductKeyMatches) {
        throw new UnauthorizedException();
      }
    }

    if (existingUser) {
      throw new ConflictException(
        `User with the email: ${dto.email} already exists.`,
      );
    }
    const hashedPassword = await this.hashByValue(dto.password);

    const user = await this.userService.create({
      ...dto,
      password: hashedPassword,
    });

    const access_token = await this.generateJwtToken({
      sub: user.id,
      username: user.name,
    });

    return {
      access_token,
    };
  }

  async generateProductKey(email: string, userType: UserType): Promise<string> {
    const productKey = this.getProductKey(email, userType);

    return await this.hashByValue(productKey);
  }

  private getProductKey(email: string, userType: UserType): string {
    const productKeySecret =
      this.configService.get<string>('PRODUCT_KEY_SECRET');

    return `${email}-${userType}-${productKeySecret}`;
  }

  private async hashByValue(value: string): Promise<string> {
    const hashSalt = this.configService.get<string>('HASH_SALT');

    return await bcrypt.hash(value, +hashSalt);
  }

  private async generateJwtToken(payload: TokenPayload): Promise<string> {
    const token = await this.jwtService.signAsync(payload);

    return `Bearer ${token}`;
  }
}
