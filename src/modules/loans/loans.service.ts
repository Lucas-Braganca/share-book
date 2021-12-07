import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { BooksService } from '../books/books.service';
import { LoanRequestStatus, LoanStatus } from '../common/types';
import { GetLoansRequestDto } from './dto/request/get-loans-request.dto';
import { UpdateRequestStatusRequestDto } from './dto/request/update-request-status-request.dto';
import { GetLoansResponseDto } from './dto/response/get-loans-response.dto';
import { Loan } from './loans.entity';

@Injectable()
export class LoansService {
  private logger = new Logger('Loans Service');

  constructor(
    @InjectRepository(Loan)
    private loanRepository: Repository<Loan>,

    private bookService: BooksService,
  ) {}

  async add(bookId: string, userId: string) {
    try {
      const book = await this.bookService.getById(bookId);
      if (userId === book.user.id) {
        this.logger.error(`can't borrow your own book. UserId: ${userId}`);
        throw new BadRequestException();
      }
      const loan = this.loanRepository.create({
        ownerId: book.user.id,
        BorrowedUserId: userId,
        book: { id: bookId },
      });
      return await this.loanRepository.save(loan);
    } catch (error) {
      this.logger.error(error.message);
      if (error instanceof NotFoundException) {
        throw new NotFoundException(
          `Owner not found for Book with id ${bookId}`,
        );
      }
      if (error instanceof BadRequestException) {
        throw new BadRequestException(`can't borrow your own book.`);
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async getMyLoans(userId: string, filters: GetLoansRequestDto) {
    const query = this.loanRepository
      .createQueryBuilder('loan')
      .where('loan.owner_id = :userId', { userId });

    return this.getLoanFilters(query, filters);
  }

  async getMyRequestedLoans(userId: string, filters: GetLoansRequestDto) {
    const query = this.loanRepository
      .createQueryBuilder('loan')
      .where('loan.borrowed_user_id = :userId', { userId });

    return this.getLoanFilters(query, filters);
  }

  async updateRequestStatus(
    userId: string,
    id: string,
    request: UpdateRequestStatusRequestDto,
  ): Promise<Loan> {
    const loan = await this.loanRepository.findOne({
      relations: ['book'],
      where: { id },
    });
    if (!loan) {
      throw new NotFoundException(`Loan with id ${id} not found`);
    }

    if (loan.ownerId !== userId) {
      throw new UnauthorizedException(`Different ids for user. Id ${userId}`);
    }

    if (loan.requestStatus !== LoanRequestStatus.PENDENT) {
      throw new BadRequestException(`Only pendent loans can be updated`);
    }

    loan.requestStatus = request.requestStatus;
    loan.status =
      request.requestStatus === LoanRequestStatus.ACCEPTED
        ? LoanStatus.BORROWED
        : LoanStatus.NONE;

    if (request.requestStatus === LoanRequestStatus.ACCEPTED) {
      loan.book.isBorrowed = true;
    }

    return this.loanRepository.save(loan);
  }

  async returnBook(userId: string, id: string): Promise<Loan> {
    const loan = await this.loanRepository.findOne({
      relations: ['book'],
      where: { id },
    });

    if (!loan) {
      throw new NotFoundException(`Loan with id ${id} not found`);
    }

    if (loan.BorrowedUserId !== userId) {
      throw new UnauthorizedException(`Different ids for user. Id ${userId}`);
    }

    if (loan.status !== LoanStatus.BORROWED) {
      throw new BadRequestException(`Only borrowed loans can be updated`);
    }

    loan.status = LoanStatus.DELIVERED;
    loan.book.isBorrowed = false;
    return this.loanRepository.save(loan);
  }
  private async getLoanFilters(
    query: SelectQueryBuilder<Loan>,
    filters: GetLoansRequestDto,
  ): Promise<GetLoansResponseDto> {
    if (filters.requestStatus) {
      query.where('loan.request_status = :requestStatus', {
        requestStatus: filters.requestStatus,
      });
    }

    if (filters.status) {
      query.where('loan.status = :status', { status: filters.status });
    }

    const [data, count] = await Promise.all([
      query
        .clone()
        .limit(filters.take)
        .offset(filters.skip)
        .getMany(),
      query.clone().getCount(),
    ]);

    return { loans: data, count };
  }
}
