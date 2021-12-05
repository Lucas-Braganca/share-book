import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.service.getById(id);
  }

  @Get(':id/borrowed-books')
  async borrowedBooks(@Param('id') id: string) {
    return this.service.borrowedBooks(id);
  }
}
