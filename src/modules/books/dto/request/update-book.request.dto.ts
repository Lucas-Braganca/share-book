import { IsOptional } from 'class-validator';

export class UpdateBookRequestDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  author?: string;

  @IsOptional()
  genre?: string;
}
