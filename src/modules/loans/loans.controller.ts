import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUserId } from '../users/authguard/decorators/get-user-id.decorator';
import { LoansService } from './loans.service';

@Controller('loans')
export class LoansController {
  constructor(private readonly service: LoansService) {}

  @Post('/book/:id')
  @UseGuards(AuthGuard())
  async add(@Param('id') bookId: string, @GetUserId() userId: string) {
    return this.service.add(bookId, userId);
  }
}
