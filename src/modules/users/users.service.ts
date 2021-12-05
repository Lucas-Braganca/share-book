import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Brackets, Repository } from 'typeorm';
import { BaseFilter } from '../common/base-filter';
import { passwordSalt } from '../common/constants';
import { UpdatePassWordRequestDto } from './dto/request/update-password-request.dto';
import { UpdateUserRequestDto } from './dto/request/update-user-request.dto';
import { BorrowedBooksCount } from './dto/response/borrowed-books-count-response.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  private logger = new Logger('Users Service');
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async get(filters: BaseFilter) {
    const query = this.usersRepository.createQueryBuilder('users');

    if (filters.search) {
      query.where(
        new Brackets(qb =>
          qb
            .where(`users.name ILIKE '%${filters.search}%'`)
            .orWhere(`users.email ILIKE '%${filters.search}%'`),
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

    return { users: data, count };
  }

  async getById(id: string) {
    try {
      const user = await this.usersRepository.findOneOrFail({ id });
      return user;
    } catch (error) {
      this.logger.error(`User with id ${id} not found`);
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  async borrowedBooks(id: string): Promise<BorrowedBooksCount> {
    const user = await this.usersRepository.findOne({
      relations: ['userBooks'],
      where: { id },
    });
    if (!user) {
      this.logger.error(`User with id ${id} not found`);
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const count = user.userBooks.filter(b => b.isBorrowed === true).length;
    return {
      count,
    };
  }

  async update(
    request: UpdateUserRequestDto,
    id: string,
    paramUserId: string,
  ): Promise<User> {
    if (paramUserId !== id) {
      throw new UnauthorizedException('Different users');
    }

    const user = await this.usersRepository.findOne({ id });
    if (!user) {
      this.logger.error(`User with id ${id} not found`);
      throw new NotFoundException(`User with id ${id} not found`);
    }

    user.name = request.name ?? user.name;
    user.email = request.email ?? user.email;

    return this.usersRepository.save(user);
  }

  async updatePassword(
    request: UpdatePassWordRequestDto,
    paramUserId: string,
    id: string,
  ): Promise<User> {
    try {
      const user = await this.validateParamAndUser(id, paramUserId);
      const { currentPassword, newPassword } = request;
      if (!(await this.validatePassword(user.password, currentPassword))) {
        throw new UnauthorizedException('Invalid password');
      }
      user.password = await bcrypt.hash(newPassword, passwordSalt);
      return this.usersRepository.save(user);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException(error.message);
      }
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  private async validatePassword(hashPassword: string, password: string) {
    return bcrypt.compare(password, hashPassword);
  }

  private async validateParamAndUser(
    id: string,
    paramUserId: string,
  ): Promise<User> {
    if (paramUserId !== id) {
      throw new UnauthorizedException('Different users');
    }

    const user = await this.usersRepository.findOne({ id });
    if (!user) {
      this.logger.error(`User with id ${id} not found`);
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }
}
