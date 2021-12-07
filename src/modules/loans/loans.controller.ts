import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetUserId } from '../auth/authguard/decorators/get-user-id.decorator';
import { GetLoansRequestDto } from './dto/request/get-loans-request.dto';
import { UpdateRequestStatusRequestDto } from './dto/request/update-request-status-request.dto';
import { GetLoansResponseDto } from './dto/response/get-loans-response.dto';
import { Loan } from './loans.entity';
import { LoansService } from './loans.service';

@Controller('loans')
@UseGuards(AuthGuard())
@ApiTags('Loans')
@ApiBearerAuth()
export class LoansController {
  constructor(private readonly service: LoansService) {}

  @Post('/book/:id')
  @ApiOkResponse({
    description: 'Empréstimo do livro com id {id} solicitado com sucesso',
    type: Loan,
  })
  async add(
    @Param('id') bookId: string,
    @GetUserId() userId: string,
  ): Promise<Loan> {
    return this.service.add(bookId, userId);
  }

  @Get('/my-loans')
  @ApiOkResponse({
    description: 'Empréstimos realizados retornados com sucesso',
    type: GetLoansResponseDto,
  })
  async getMyLoans(
    @GetUserId() userId: string,
    @Query() filters: GetLoansRequestDto,
  ) {
    return this.service.getMyLoans(userId, filters);
  }

  @Get('/my-requested-loans')
  @ApiOkResponse({
    description: 'Empréstimos solicitados retornados com sucesso',
    type: GetLoansResponseDto,
  })
  async getMyRequestedLoans(
    @GetUserId() userId: string,
    @Query() filters: GetLoansRequestDto,
  ) {
    return this.service.getMyRequestedLoans(userId, filters);
  }

  @Patch('/:id/update-request-status')
  @ApiOkResponse({
    description: 'Status da solicitação de empréstimo atualizado com sucesso',
    type: Loan,
  })
  async updateRequestStatus(
    @GetUserId() userId: string,
    @Param('id') loanId: string,
    @Body() request: UpdateRequestStatusRequestDto,
  ): Promise<Loan> {
    return this.service.updateRequestStatus(userId, loanId, request);
  }

  @Patch('/:id/return-book')
  @ApiOkResponse({
    description: 'Status do empréstimo atualizado com sucesso',
    type: Loan,
  })
  async returnBook(@GetUserId() userId: string, @Param('id') loanId: string) {
    return this.service.returnBook(userId, loanId);
  }
}
