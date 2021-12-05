import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { Book } from './books.entity';
import { CreateBookRequestDto } from './dto/request/create-book-request.dto';
import { GetAllRequestDto } from './dto/request/get-all-request.dto';
import { UpdateBookRequestDto } from './dto/request/update-book.request.dto';
import { GetAllResponseDto } from './dto/response/get-all-response.dto';

@Injectable()
export class BooksService {
  private logger = new Logger('Book Service');

  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async add(request: CreateBookRequestDto, userId: string): Promise<Book> {
    const newBook = this.bookRepository.create({
      ...request,
      user: { id: userId },
    });
    return this.bookRepository.save(newBook);
  }

  async get(
    filters: GetAllRequestDto,
    userId?: string,
  ): Promise<GetAllResponseDto> {
    const query = this.bookRepository.createQueryBuilder('books');

    if (userId) {
      query.where('books.user_id = :userId', { userId });
    }

    if (filters.onlyAvailable) {
      query.where(`books.is_borrowed = true`);
    }

    if (filters.search) {
      query.where(
        new Brackets(qb =>
          qb
            .where(`books.name ILIKE '%${filters.search}%'`)
            .orWhere(`books.author ILIKE '%${filters.search}%'`)
            .orWhere(`books.genre ILIKE '%${filters.search}%'`),
        ),
      );
    }

    const [data, count] = await Promise.all([
      query
        .clone()
        .limit(filters.take)
        .offset(filters.skip)
        .getMany(),
      query.clone().getCount(),
    ]);

    return { books: data, count };
  }

  async getMyBooks(userId: string, filter: GetAllRequestDto) {
    return this.get(filter, userId);
  }

  async getById(id: string): Promise<Book> {
    try {
      const book = await this.bookRepository.findOneOrFail({
        relations: ['user'],
        where: { id },
      });
      return book;
    } catch (error) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
  }

  async update(id: string, request: UpdateBookRequestDto): Promise<Book> {
    const book = await this.bookRepository.findOne({ id });
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    const { author, genre, name } = request;
    book.name = name ?? book.name;
    book.author = author ?? book.author;
    book.genre = genre ?? book.genre;

    return this.bookRepository.save(book);
  }

  async delete(id: string) {
    try {
      const bookToDelete = await this.bookRepository.findOne({ id });
      if (!bookToDelete) {
        throw new NotFoundException();
      }
      await this.bookRepository.delete({ id });
      return { deleted: true };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Book with id ${id} not found`);
      }
      this.logger.error(`Error on book delete. Id: ${id}`);
      throw new InternalServerErrorException(error.message);
    }
  }
}
