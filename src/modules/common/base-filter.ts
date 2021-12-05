import { IsOptional } from 'class-validator';

export class BaseFilter {
  @IsOptional()
  skip?: number = 0;

  @IsOptional()
  take?: number = 10;

  @IsOptional()
  search?: string;
}
