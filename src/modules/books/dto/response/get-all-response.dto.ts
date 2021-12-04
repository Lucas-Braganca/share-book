import { Book } from '../../books.entity';

export class GetAllResponseDto {
  books: Book[];
  count: number;
}
