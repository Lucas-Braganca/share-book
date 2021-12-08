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
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetUserId } from '../auth/authguard/decorators/get-user-id.decorator';
import { Book } from './books.entity';
import { BooksService } from './books.service';
import { CreateBookRequestDto } from './dto/request/create-book-request.dto';
import { GetAllRequestDto } from './dto/request/get-all-request.dto';
import { UpdateBookRequestDto } from './dto/request/update-book.request.dto';
import { GetAllResponseDto } from './dto/response/get-all-response.dto';

@Controller('books')
@ApiTags('Books')
export class BooksController {
  constructor(private readonly service: BooksService) {}

  @Post()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'O Livro foi adicionado com sucesso',
    type: Book,
  })
  async add(
    @GetUserId() userId: string,
    @Body() request: CreateBookRequestDto,
  ): Promise<Book> {
    return this.service.add(request, userId);
  }

  @Get()
  @ApiOkResponse({
    description: 'Os livros foram retornados com sucesso',
    type: GetAllResponseDto,
  })
  async get(@Query() filters: GetAllRequestDto): Promise<GetAllResponseDto> {
    return this.service.get(filters);
  }

  @Get('/:id')
  @ApiOkResponse({
    description: 'O livro com id especificado foi retornado com sucesso',
    type: Book,
  })
  async getById(@Param('id') id: string): Promise<Book> {
    return this.service.getById(id);
  }

  @Put('/:id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'O livro com id especificado foi atualizado com sucesso',
    type: Book,
  })
  async update(
    @Param('id') id: string,
    @Body() request: UpdateBookRequestDto,
  ): Promise<Book> {
    return this.service.update(id, request);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'O livro com id especificado foi deletado com sucesso',
  })
  async delete(@Param('id') id: string) {
    return this.service.delete(id);
  }

  @Get('/user/my-books')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Os livros do usuário atual foram retornados com sucesso',
    type: GetAllResponseDto,
  })
  async getMyBooks(
    @GetUserId() userId: string,
    @Query() filter: GetAllRequestDto,
  ): Promise<GetAllResponseDto> {
    console.log('asd');
    return this.service.getMyBooks(userId, filter);
  }
}
