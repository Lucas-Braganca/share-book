import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { User } from '../users/users.entity';
import { AuthService } from './auth.service';
import { SigninRequestDto } from './dto/request/signin-request.dto';
import { SignupRequestDto } from './dto/request/signup-request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('/signup')
  async signup(@Body() request: SignupRequestDto): Promise<User> {
    return this.service.signup(request);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/signin')
  async signin(@Body() request: SigninRequestDto) {
    return this.service.signin(request);
  }
}
