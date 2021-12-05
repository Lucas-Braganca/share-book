import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUserId } from './authguard/decorators/get-user-id.decorator';
import { SigninRequestDto } from './dto/request/signin-request.dto';
import { SignupRequestDto } from './dto/request/signup-request.dto';
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

  @Get(':id')
  @UseGuards(AuthGuard())
  async getById(@Param('id') id: string) {
    return this.service.getById(id);
  }
  @Get(':id/borrowed-books')
  // @UseGuards(AuthGuard())
  async borrowedBooks(@Param('id') id: string) {
    return this.service.borrowedBooks(id);
  }
}
