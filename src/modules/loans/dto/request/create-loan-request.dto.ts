import { OmitType } from '@nestjs/swagger';
import { Loan } from '../../loans.entity';

export class CreateLoanRequestDto extends OmitType(Loan, [
  'id',
  'updatedAt',
  'createdAt',
]) {}
