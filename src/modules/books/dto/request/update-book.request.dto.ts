import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateBookRequestDto {
  @IsOptional()
  @ApiProperty({
    description: 'Nome do livro',
    required: true,
    example: 'Nome Livro 01',
  })
  name?: string;

  @IsOptional()
  @ApiProperty({
    description: 'Nome do autor',
    required: true,
    example: 'Nome Autor 01',
  })
  author?: string;

  @IsOptional()
  @ApiProperty({
    description: 'Gênero do livro',
    required: true,
    example: 'Tecnologia',
  })
  genre?: string;
}
