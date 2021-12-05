import { OmitType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { BaseFilter } from '../../../common/base-filter';
import { LoanRequestStatus, LoanStatus } from '../../../common/types';

export class GetLoansRequestDto extends OmitType(BaseFilter, ['search']) {
  @IsOptional()
  requestStatus: LoanRequestStatus;

  @IsOptional()
  status: LoanStatus;
}
