import { IsEnum, IsNotEmpty } from 'class-validator';
import { LoanRequestStatus } from '../../../common/types';

export class UpdateRequestStatusRequestDto {
  @IsNotEmpty()
  @IsEnum(LoanRequestStatus)
  requestStatus: LoanRequestStatus;
}
