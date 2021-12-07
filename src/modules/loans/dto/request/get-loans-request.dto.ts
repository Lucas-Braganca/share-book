import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { BaseFilter } from '../../../common/base-filter';
import { LoanRequestStatus, LoanStatus } from '../../../common/types';

export class GetLoansRequestDto extends OmitType(BaseFilter, ['search']) {
  @IsOptional()
  @ApiProperty({
    description: 'Status da solicitação (pendente, aceita ou rejeitada)',
    required: false,
    example: 'Pendent',
  })
  requestStatus: LoanRequestStatus;

  @IsOptional()
  @ApiProperty({
    description:
      'Status da do empréstimo (se está emprestado ou foi devolvido)',
    required: false,
    example: 'None',
  })
  status: LoanStatus;
}
