import { Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUserId } from '../auth/authguard/decorators/get-user-id.decorator';
import { GetLoansRequestDto } from './dto/request/get-loans-request.dto';
import { LoansService } from './loans.service';

@Controller('loans')
@UseGuards(AuthGuard())
export class LoansController {
  constructor(private readonly service: LoansService) {}

  @Post('/book/:id')
  async add(@Param('id') bookId: string, @GetUserId() userId: string) {
    return this.service.add(bookId, userId);
  }

  @Get('/my-loans')
  async getMyLoans(
    @GetUserId() userId: string,
    @Query() filters: GetLoansRequestDto,
  ) {
    return this.service.getMyLoans(userId, filters);
  }

  @Get('/my-requested-loans')
  async getMyRequestedLoans(
    @GetUserId() userId: string,
    @Query() filters: GetLoansRequestDto,
  ) {
    return this.service.getMyRequestedLoans(userId, filters);
  }
}

//no list pode filtrar pelo status da solicitação
