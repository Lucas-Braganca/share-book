import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Book } from '../books/books.entity';
import { BaseModel } from '../common/base-model.entity';
import { LoanRequestStatus, LoanStatus } from '../common/types';

@Entity('loans')
export class Loan extends BaseModel {
  @Column({ name: 'owner_id' })
  @IsNotEmpty()
  @ApiProperty({
    description: 'Id do dono do livro',
    required: true,
    example: '9ffc959d-7d10-462a-8b9c-304d4dbdc522',
  })
  ownerId: string;

  @Column({ name: 'borrowed_user_id' })
  @IsNotEmpty()
  @ApiProperty({
    description: 'Id do usuário que solicitou empréstimo',
    required: true,
    example: '9ffc959d-7d10-462a-8b9c-304d4dbdc522',
  })
  BorrowedUserId: string;

  @Column({
    name: 'request_status',
    type: 'enum',
    enum: LoanRequestStatus,
    default: LoanRequestStatus.PENDENT,
  })
  @ApiProperty({
    description: 'Status da solicitação',
    required: false,
    default: 'Pendent',
  })
  requestStatus: LoanRequestStatus;

  @Column({ type: 'enum', enum: LoanStatus, default: LoanStatus.NONE })
  @ApiProperty({
    description: 'Status do empréstimo',
    required: false,
    default: 'None',
  })
  status: LoanStatus;

  @ManyToOne(
    () => Book,
    user => user.bookLoans,
    { cascade: true },
  )
  @JoinColumn({ name: 'book_id' })
  book: Book;
}
