import { ApiProperty } from '@nestjs/swagger';
import { Loan } from '../../loans.entity';

export class GetLoansResponseDto {
  @ApiProperty({ description: 'Lista de empréstimo retornada' })
  loans: Loan[];

  @ApiProperty({ description: 'Valor total de itens salvos no banco de dados' })
  count: number;
}
