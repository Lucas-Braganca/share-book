import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUserId } from '../auth/authguard/decorators/get-user-id.decorator';
import { BooksService } from './books.service';
import { CreateBookRequestDto } from './dto/request/create-book-request.dto';
import { GetAllRequestDto } from './dto/request/get-all-request.dto';
import { UpdateBookRequestDto } from './dto/request/update-book.request.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly service: BooksService) {}

  @Post()
  @UseGuards(AuthGuard())
  async add(
    @GetUserId() userId: string,
    @Body() request: CreateBookRequestDto,
  ) {
    return this.service.add(request, userId);
  }

  @Get()
  async get(@Query() filters: GetAllRequestDto) {
    return this.service.get(filters);
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    return this.service.getById(id);
  }

  @Put('/:id')
  @UseGuards(AuthGuard())
  async update(@Param('id') id: string, @Body() request: UpdateBookRequestDto) {
    return this.service.update(id, request);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  async delete(@Param('id') id: string) {
    return this.service.delete(id);
  }

  @Get('/user/my-books')
  @UseGuards(AuthGuard())
  async getMyBooks(
    @GetUserId() userId: string,
    @Query() filter: GetAllRequestDto,
  ) {
    console.log('asd');
    return this.service.getMyBooks(userId, filter);
  }
}
