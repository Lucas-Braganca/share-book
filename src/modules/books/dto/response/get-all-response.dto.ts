import { ApiProperty } from '@nestjs/swagger';
import { Book } from '../../books.entity';

export class GetAllResponseDto {
  @ApiProperty({ description: 'Array de livros retornados na consulta' })
  books: Book[];

  @ApiProperty({
    description: 'Número total de livros existentes no banco de dados',
  })
  count: number;
}
