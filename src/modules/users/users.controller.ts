import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SigninRequestDto } from './dto/signin-request.dto';
import { SignupRequestDto } from './dto/signup-request.dto';
import { GetUserId } from './get-user-id.decorator';
import { User } from './users.entity';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}
  @Post('/signup')
  async signup(@Body() request: SignupRequestDto): Promise<User> {
    return this.service.signup(request);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/signin')
  async signin(@Body() request: SigninRequestDto) {
    return this.service.signin(request);
  }

  @UseGuards(AuthGuard())
  @Get('/test')
  async test(@GetUserId() id: string) {
    return { test: 'OK' };
  }
}
