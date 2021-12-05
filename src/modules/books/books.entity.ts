import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from '../common/base-model.entity';
import { Loan } from '../loans/loans.entity';
import { User } from '../users/users.entity';

@Entity('books')
export class Book extends BaseModel {
  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  author: string;

  @Column()
  @IsNotEmpty()
  genre: string;

  @Column({ name: 'is_borrowed', default: false })
  isBorrowed: boolean;

  @ManyToOne(
    () => User,
    user => user.userBooks,
  )
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(
    () => Loan,
    loan => loan.book,
  )
  bookLoans?: Loan[];
}
