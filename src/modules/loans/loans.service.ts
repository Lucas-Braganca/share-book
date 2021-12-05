import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BooksService } from '../books/books.service';
import { Loan } from './loans.entity';

@Injectable()
export class LoansService {
  private logger = new Logger('Loans Service');

  constructor(
    @InjectRepository(Loan)
    private loanRepository: Repository<Loan>,

    private bookService: BooksService,
  ) {}

  //nao pode pegar um livro dele mesmo emprestado
  async add(bookId: string, userId: string) {
    try {
      const book = await this.bookService.getById(bookId);

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
      throw new InternalServerErrorException(error.message);
    }
  }
}
