import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from '../common/base-model.entity';
import { Loan } from '../loans/loans.entity';
import { User } from '../users/users.entity';

@Entity('books')
export class Book extends BaseModel {
  @Column()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nome do livro',
    required: true,
    example: 'Nome Livro 01',
  })
  name: string;

  @Column()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nome do autor',
    required: true,
    example: 'Nome Autor 01',
  })
  author: string;

  @Column()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Gênero do livro',
    required: true,
    example: 'Tecnologia',
  })
  genre: string;

  @Column({ name: 'is_borrowed', default: false })
  @ApiProperty({
    description: 'Livro está emprestado',
    required: false,
    example: 'false',
    default: false,
  })
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
