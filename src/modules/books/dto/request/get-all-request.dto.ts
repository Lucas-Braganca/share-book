import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { BaseFilter } from '../../../common/base-filter';
export class GetAllRequestDto extends BaseFilter {
  @IsOptional()
  @ApiProperty({
    description: 'Exibir apenas livros que não estão emprestados',
    required: false,
    default: false,
    example: 'false',
  })
  onlyAvailable = false;
}
