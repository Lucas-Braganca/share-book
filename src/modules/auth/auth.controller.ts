import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../users/users.entity';
import { AuthService } from './auth.service';
import { SigninRequestDto } from './dto/request/signin-request.dto';
import { SignupRequestDto } from './dto/request/signup-request.dto';
import { JwtResponse } from './dto/response/jwt-response.interface';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @ApiCreatedResponse({
    description: 'Cadastro do usuário foi realizado com sucesso',
    type: User,
  })
  @Post('/signup')
  async signup(@Body() request: SignupRequestDto): Promise<User> {
    return this.service.signup(request);
  }

  @ApiOkResponse({
    description: 'Login do usuário foi realizado com sucesso',
  })
  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() request: SigninRequestDto): Promise<JwtResponse> {
    return this.service.signin(request);
  }
}
