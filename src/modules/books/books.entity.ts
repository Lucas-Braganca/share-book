import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from '../common/base-model.entity';
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

  @Column({ default: false })
  isBorrowed: boolean;

  @ManyToOne(
    () => User,
    user => user.userBooks,
  )
  @JoinColumn({ name: 'user_id' })
  user: User;
}
