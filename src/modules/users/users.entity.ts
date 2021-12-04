import { IsEmail, IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { Book } from '../books/books.entity';
import { BaseModel } from '../common/base-model.entity';

@Entity('users')
export class User extends BaseModel {
  @IsNotEmpty()
  @Column()
  name: string;

  @IsNotEmpty()
  @Column()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  @Column()
  email: string;

  @IsNotEmpty()
  @Column()
  city: string;

  @IsNotEmpty()
  @Column()
  state: string;

  @OneToMany(
    () => Book,
    book => book.user,
  )
  userBooks?: Book[];
}
