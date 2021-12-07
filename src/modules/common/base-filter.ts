import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class BaseFilter {
  @IsOptional()
  @ApiProperty({
    description: 'Quantidade de itens que serão pulados na chamada',
    required: false,
    example: 0,
    default: 0,
  })
  skip?: number = 0;

  @IsOptional()
  @ApiProperty({
    description: 'Quantidade de itens que serão retornados na chamada',
    required: false,
    example: 100,
    default: 100,
  })
  take?: number = 100;

  @IsOptional()
  @ApiProperty({
    description: 'Termo utilizado para filtro dos itens',
    required: false,
    example: 'batata',
  })
  search?: string;
}
