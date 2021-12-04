import { IsEmail, IsNotEmpty } from 'class-validator';
import { Column, Entity } from 'typeorm';
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
}
