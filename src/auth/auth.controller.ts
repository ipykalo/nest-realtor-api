import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../shared/dtos/create-user.dto';
import { SigninRequestDto } from './dto/signin-request.dto';
import { Public } from '../shared/decorators';
import { SigninResponseDto } from './dto/signin-response.dto';
import { GenerateProductKeyDto } from './dto/generate-product-key.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signin')
  signIn(
    @Body() { email, password }: SigninRequestDto,
  ): Promise<SigninResponseDto> {
    return this.authService.signIn(email, password);
  }

  @Public()
  @Post('signup')
  signUp(@Body() body: CreateUserDto): Promise<SigninResponseDto> {
    return this.authService.signUp(body);
  }

  @Public()
  @Post('product-key')
  generateProductKey(
    @Body() { email, userType }: GenerateProductKeyDto,
  ): Promise<string> {
    return this.authService.generateProductKey(email, userType);
  }
}
