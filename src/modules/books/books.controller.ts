import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUserId } from '../users/authguard/decorators/get-user-id.decorator';
import { BooksService } from './books.service';
import { CreateBookRequestDto } from './dto/request/create-book-request.dto';
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
  async get() {
    return this.service.get();
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
}
