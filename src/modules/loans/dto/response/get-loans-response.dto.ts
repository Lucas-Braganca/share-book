import { Loan } from '../../loans.entity';

export class GetLoansResponseDto {
  loans: Loan[];
  count: number;
}
