import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../shared/dtos/create-user.dto';
import { SigninRequestDto } from './dto/signin-request.dto';
import { Public } from '../shared/decorators';
import { SigninResponseDto } from './dto/signin-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signin')
  signIn(@Body() body: SigninRequestDto): Promise<SigninResponseDto> {
    return this.authService.signIn(body.email, body.password);
  }

  @Public()
  @Post('signup')
  signUp(@Body() body: CreateUserDto) {
    return this.authService.signUp(body);
  }
}
