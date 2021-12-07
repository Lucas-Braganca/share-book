import { OmitType } from '@nestjs/swagger';
import { Book } from '../../books.entity';

export class CreateBookRequestDto extends OmitType(Book, [
  'id',
  'updatedAt',
  'createdAt',
]) {}
