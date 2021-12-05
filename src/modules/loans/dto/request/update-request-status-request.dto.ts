import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { LoanRequestStatus } from '../../../common/types';

export class UpdateRequestStatusRequestDto {
  @IsNotEmpty()
  @IsEnum(LoanRequestStatus)
  @ApiProperty({
    description: 'Status da solicitação do empréstimo (aceita ou rejeitada)',
    required: true,
    example: 'Accepted',
  })
  requestStatus: LoanRequestStatus;
}
