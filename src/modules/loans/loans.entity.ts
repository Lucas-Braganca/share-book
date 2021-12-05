import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Book } from '../books/books.entity';
import { BaseModel } from '../common/base-model.entity';
import { LoanRequestStatus, LoanStatus } from '../common/types';

@Entity('loans')
export class Loan extends BaseModel {
  @Column({ name: 'owner_id' })
  owner_id: string;

  @Column({ name: 'borrowed_user_id' })
  BorrowedUserId: string;

  @Column({
    name: 'request_status',
    type: 'enum',
    enum: LoanRequestStatus,
    default: LoanRequestStatus.PENDENT,
  })
  requestStatus: LoanRequestStatus;

  @Column({ type: 'enum', enum: LoanStatus, default: LoanStatus.NONE })
  status: LoanStatus;

  @ManyToOne(
    () => Book,
    user => user.bookLoans,
  )
  @JoinColumn({ name: 'book_id' })
  book: Book;
}
