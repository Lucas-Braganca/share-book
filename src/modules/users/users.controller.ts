import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetUserId } from '../auth/authguard/decorators/get-user-id.decorator';
import { BaseFilter } from '../common/base-filter';
import { UpdatePassWordRequestDto } from './dto/request/update-password-request.dto';
import { UpdateUserRequestDto } from './dto/request/update-user-request.dto';
import { BorrowedBooksCount } from './dto/response/borrowed-books-count-response.dto';
import { GetAllUsersResponseDto } from './dto/response/get-all-users-response.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';
@Controller('users')
@UseGuards(AuthGuard())
@ApiTags('Users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get('/:id')
  @ApiOkResponse({
    description: 'Usuário com o id {id} foi encontrado com sucesso',
    type: User,
  })
  async getById(@Param('id') id: string): Promise<User> {
    return this.service.getById(id);
  }

  @Get()
  @ApiOkResponse({
    description: 'Usuário com o id {id} foi encontrado com sucesso',
    type: GetAllUsersResponseDto,
  })
  async get(@Query() filters: BaseFilter): Promise<GetAllUsersResponseDto> {
    return this.service.get(filters);
  }

  @Get('/:id/borrowed-books')
  @ApiOkResponse({
    description: 'Total de livros emprestados retornado com sucesso',
    type: BorrowedBooksCount,
  })
  async borrowedBooks(@Param('id') id: string): Promise<BorrowedBooksCount> {
    return this.service.borrowedBooks(id);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Atualização realizada com sucesso',
    type: User,
  })
  async update(
    @Param('id') paramUserId: string,
    @Body() request: UpdateUserRequestDto,
    @GetUserId() userId: string,
  ): Promise<User> {
    return this.service.update(request, userId, paramUserId);
  }

  @Patch('/:id/change-password')
  @ApiOkResponse({
    description: 'Senha do usuário alterada com sucesso',
    type: User,
  })
  async changePassword(
    @Param('id') paramUserId: string,
    @Body() request: UpdatePassWordRequestDto,
    @GetUserId() userId: string,
  ) {
    return this.service.updatePassword(request, paramUserId, userId);
  }
}
