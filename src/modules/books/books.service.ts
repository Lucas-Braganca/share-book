import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './books.entity';
import { CreateBookRequestDto } from './dto/request/create-book-request.dto';
import { UpdateBookRequestDto } from './dto/request/update-book.request.dto';

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

  async get(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async getById(id: string): Promise<Book> {
    try {
      const book = await this.bookRepository.findOneOrFail({ id });
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
}
