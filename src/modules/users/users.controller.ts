import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUserId } from '../auth/authguard/decorators/get-user-id.decorator';
import { BaseFilter } from '../common/base-filter';
import { UpdatePassWordRequestDto } from './dto/request/update-password-request.dto';
import { UpdateUserRequestDto } from './dto/request/update-user-request.dto';
import { UsersService } from './users.service';
@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get('/:id')
  async getById(@Param('id') id: string) {
    return this.service.getById(id);
  }

  @Get()
  async get(@Query() filters: BaseFilter) {
    return this.service.get(filters);
  }

  @Get('/:id/borrowed-books')
  async borrowedBooks(@Param('id') id: string) {
    return this.service.borrowedBooks(id);
  }

  @Put(':id')
  async update(
    @Param('id') paramUserId: string,
    @Body() request: UpdateUserRequestDto,
    @GetUserId() userId: string,
  ) {
    return this.service.update(request, userId, paramUserId);
  }

  @Patch('/:id/change-password')
  async changePassword(
    @Param('id') paramUserId: string,
    @Body() request: UpdatePassWordRequestDto,
    @GetUserId() userId: string,
  ) {
    return this.service.updatePassword(request, paramUserId, userId);
  }
}
