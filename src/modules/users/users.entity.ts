import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { Book } from '../books/books.entity';
import { BaseModel } from '../common/base-model.entity';

@Entity('users')
export class User extends BaseModel {
  @IsNotEmpty()
  @Column()
  @ApiProperty({
    description: 'Nome do usuário',
    required: true,
    example: 'João Pereira',
  })
  name: string;

  @IsNotEmpty()
  @Column()
  @ApiProperty({
    description: 'Senha do usuário',
    required: true,
    example: '1234',
  })
  password: string;

  @IsNotEmpty()
  @IsEmail()
  @Column()
  @ApiProperty({
    description: 'E-mail do usuário',
    required: true,
    example: 'email@email.com',
  })
  email: string;

  @OneToMany(
    () => Book,
    book => book.user,
  )
  userBooks?: Book[];
}
