import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BorrowedBooksCount } from './dto/response/borrowed-books-count-response.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  private logger = new Logger('Users Service');
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getById(id: string) {
    try {
      const user = await this.usersRepository.findOneOrFail({ id });
      return user;
    } catch (error) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  async borrowedBooks(id: string): Promise<BorrowedBooksCount> {
    const user = await this.usersRepository.findOne({
      relations: ['userBooks'],
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const count = user.userBooks.filter(b => b.isBorrowed === true).length;
    return {
      count,
    };
  }
}
